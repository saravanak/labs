package cmd

import (
	"database/sql"
	"fmt"
	"html"
	"net/http"
	"sync"

	_ "github.com/mattn/go-sqlite3"
	"github.com/spf13/cobra"
)

type CounterMutex struct {
	count   int
	mapGate sync.Mutex
}

var mtgCommand = &cobra.Command{Use: "mtg", Short: "server behind who moved my mouse",
	Long: ``, Run: func(cmd *cobra.Command, args []string) {

		dsn := "./test.db"
		db, e := sql.Open("sqlite3", dsn)

		if e != nil {
			panic(e)
		}

		if _, e := db.Exec("create table if not exists t1(counter number);"); e != nil {
			panic(e)
		}
		Counter := CounterMutex{count: 0}
		// http.Handle("/foo", fooHandler)
		http.HandleFunc("/bar", func(w http.ResponseWriter, r *http.Request) {

			fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))

			var localCount = 0
			Counter.mapGate.Lock()
			Counter.count += 1
			localCount = Counter.count
			Counter.mapGate.Unlock()

			db.Exec("insert into t1 values($1)", localCount)

		})
		fmt.Print("starting..")
		http.ListenAndServe(":7070", nil)

		fmt.Print("Serving..")

	}}

func init() {
	rootCmd.AddCommand(mtgCommand)
}
