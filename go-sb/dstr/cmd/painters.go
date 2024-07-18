package cmd

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"regexp"
	"sync"
	"time"

	_ "github.com/lib/pq"
	"github.com/spf13/cobra"
)

type DBMutex struct {
	db      *sql.DB
	mapGate sync.Mutex
}

type WorkerArgs struct {
	from    int
	to      int
	paintId int
}

func PaintWorker(AvailableIndicator <-chan WorkerArgs, name string, canvasContainer *DBMutex, DoneIndicator chan<- bool, RowsIndicator chan<- int) {

	workerArgs := <-AvailableIndicator

	fmt.Printf("From: %v; to: %v\n", workerArgs.from, workerArgs.to)
	for i := workerArgs.from; i < workerArgs.to; i++ {

		canvasContainer.mapGate.Lock()

		db := canvasContainer.db

		x, y := int(i/100), i%100
		color := 0

		row := db.QueryRow(
			"select color from paint_templates where paint_id = $1 and x= $2 and y = $3", workerArgs.paintId, x, y)

		row.Scan(&color)

		result, err := db.Exec(
			"INSERT INTO paint_matrix (paint_id, x, y,color, created_at) VALUES ($1, $2, $3, $4, $5)",
			workerArgs.paintId,
			x,
			y,
			color,
			time.Now(),
		)

		if err != nil {
			fmt.Printf("Result %v: \n Err: %v =n", result, err)
			panic("Got an errro")
		}
		canvasContainer.mapGate.Unlock()

		RowsIndicator <- 1
	}

	DoneIndicator <- true

}

func SeedPaintingDB(skipCreation bool) *sql.DB {
	dsn := "postgresql://postgres@172.17.0.1:5451/loft-store?sslmode=disable"
	db, e := sql.Open("postgres", dsn)

	if e != nil {
		panic(e)
	}

	if skipCreation {
		return db
	}

	var ctx context.Context
	ctx, cancel := context.WithTimeout(context.TODO(), 1*time.Second)
	defer cancel()
	if err := db.PingContext(ctx); err != nil {
		log.Fatal(err)
		panic("")
	}

	row := db.QueryRow(`insert into painting (name) values ('flower') on conflict(name)
	do update set name=painting.name returning id;`)

	var paintingId int
	row.Scan(&paintingId)
	fmt.Printf("Inserted: %v", paintingId)

	lines := ReadFileAsArray("./pattern.txt")

	parser, _ := regexp.Compile(`(\d+) (\d+) (\d+)`)

	for _, line := range lines {
		matches := parser.FindAllStringSubmatch(line, -1)

		template_result, err := db.Exec(`insert into paint_templates (paint_id, x, y, color)
	values ($1,$2,$3,$4) on conflict do nothing`, paintingId, matches[0][1], matches[0][2], matches[0][3])

		if err != nil {
			fmt.Printf("Result %v: \n Err: %v =n", template_result, err)
			panic("Got an errro")

		}
	}

	return db
}

type PaintCommand struct {
	color int
	x     int
	y     int
}

var paintersCommand = &cobra.Command{Use: "painter-jobs", Short: "A group of workers paint a large array collection", Long: `Painter job; More to fill here TODO`, Run: func(cmd *cobra.Command, args []string) {

	db := SeedPaintingDB(true)

	imageSize := int(10e3)
	workersCount := 10

	PaintingCanvas := DBMutex{db: db}

	perWorkerLoad := imageSize / workersCount

	WorkersDone := make(chan bool, 10)
	RowsIndicator := make(chan int)
	for i := range workersCount {
		workerArgs := WorkerArgs{from: i * perWorkerLoad, to: ((i + 1) * perWorkerLoad) - 1, paintId: 2}
		AmAvailable := make(chan WorkerArgs)
		go PaintWorker(AmAvailable, fmt.Sprintf("%d", i), &PaintingCanvas, WorkersDone, RowsIndicator)
		AmAvailable <- workerArgs
	}

	rowsProcssed := 0
	var rows int
	workersDoneCount := 0
	for {
		select {
		case rows = <-RowsIndicator:
			rowsProcssed += rows

			if rowsProcssed%10 == 0 {
				fmt.Printf("\nProcessed %d rows\n", rowsProcssed)
			}
		case <-WorkersDone:
			workersDoneCount += 1
			fmt.Printf("\nWorkerDoneCount:%v workersCount:%v\n", workersDoneCount, workersCount)
		}
		if workersDoneCount == workersCount {
			break
		}
	}

	fmt.Printf("Bye!! All Done. %v", true)
}}

func init() {
	rootCmd.AddCommand(paintersCommand)
}
