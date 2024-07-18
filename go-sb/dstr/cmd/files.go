package cmd

import (
	"bufio"
	"os"
)

func ReadFileAsArray(name string) []string {
	readFile, err := os.Open(name)
	check(err)
	fileScanner := bufio.NewScanner(readFile)
	fileScanner.Split(bufio.ScanLines)
	var fileLines []string

	for fileScanner.Scan() {
		fileLines = append(fileLines, fileScanner.Text())
	}

	readFile.Close()

	return fileLines

}

func check(e error) {
	if e != nil {
		panic(e)
	}
}
