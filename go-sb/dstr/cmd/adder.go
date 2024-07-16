package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

func collectAdders(lane chan int, outAck chan<- bool) {
	for i := 0; i < 2; i++ {
		fmt.Println("sum:hello", <-lane)
	}
	outAck <- true
}

func ping(pings chan<- string, msg string) {
	pings <- msg
}

func pong(pings <-chan string, pongs chan<- string) {
	msg := <-pings
	pongs <- msg
}

// versionCmd represents the version command
var adderCommand = &cobra.Command{
	Use:   "adder",
	Short: "Channels demo",
	Long:  `Channels demo`,
	Run: func(cmd *cobra.Command, args []string) {
		adderLane := make(chan int, 2)

		adderLane <- 3
		adderLane <- 35

		stopper := make(chan bool)
		go collectAdders(adderLane, stopper)

		// close(adderLane)
		<-stopper

		pings := make(chan string, 1)
		pongs := make(chan string, 1)
		ping(pings, "passed message")
		pong(pings, pongs)
		fmt.Println(<-pongs)
	},
}

func init() {
	rootCmd.AddCommand(adderCommand)
}
