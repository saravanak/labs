package cmd

import (
	"fmt"
	"io"
	"log"
	"slices"

	"os"

	_ "github.com/lib/pq"
	"github.com/spf13/cobra"
)

type ReadBlock struct {
	offset int64
	num    int64
}

func readWords(f *os.File, a <-chan ReadBlock, result chan<- int64) {

	// bBuffer := bytes.NewBuffer(b)

	readData := <-a
	b := make([]byte, readData.num)

	reader := io.NewSectionReader(f, readData.offset, readData.num)

	reader.Read(b)
	words := int64(0)
	prevStart := false
	seperators := []byte{' ', '\t', '\n', '\r'}
	for i := range len(b) - 1 {
		if slices.Contains(seperators, b[i]) {
			if prevStart {
				prevStart = false
				words += 1
			}
		} else {
			if !prevStart {
				prevStart = true
			}
		}
	}
	result <- words
}

func ceilDiv(A int, B int) int {
	return (A + (B - 1)) / B
}

var wordCountCommand = &cobra.Command{Use: "wc",
	Short: "clone of standard wc",
	Long:  `Counts ONLY words for now`,
	Run: func(cmd *cobra.Command, args []string) {

		size := 0
		if len(args) != 1 {
			fmt.Println("please provide one argument denoting a file")
			os.Exit(-1)
		}
		if fileInfo, e := os.Stat(args[0]); e != nil {
			panic(e)
		} else {
			size = int(fileInfo.Size())
		}
		fmt.Printf("Hellow %v\n", args[0])

		argPasser := make(chan ReadBlock)
		wordsCountCollector := make(chan int64)

		f, err := os.OpenFile(args[0], os.O_RDONLY, 0)
		if err != nil {
			log.Fatal(err)
		}

		pageSize := 100000

		totalWorkers := ceilDiv(size, pageSize)

		for i := range totalWorkers {
			go readWords(f, argPasser, wordsCountCollector)
			blockArgs := ReadBlock{num: int64(pageSize), offset: int64(i * pageSize)}
			argPasser <- blockArgs
		}

		words := int64(0)
		for range totalWorkers {
			words += <-wordsCountCollector
		}

		print(words)

		if err := f.Close(); err != nil {
			log.Fatal(err)
		}
	}}

func init() {
	rootCmd.AddCommand(wordCountCommand)
}
