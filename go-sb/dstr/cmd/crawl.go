package cmd

import (
	"fmt"

	"github.com/spf13/cobra"

	"sync"
)

type Fetcher interface {
	// Fetch returns the body of URL and
	// a slice of URLs found on that page.
	Fetch(url string) (body string, urls []string, err error)
}

type UrlBox struct {
	urlsSeen map[string]bool
	mapGate  sync.Mutex
}

func All[T any](ts []T, pred func(T) bool) bool {
	for _, t := range ts {
		if !pred(t) {
			return false
		}
	}
	return true
}

func Filter[T any](ts []T, pred func(T) bool) []T {
	s := make([]T, len(ts))
	for _, t := range ts {
		if pred(t) {
			s = append(s, t)
		}
	}
	return s
}

// Crawl uses fetcher to recursively crawl
// pages starting with url, to a maximum of depth.
func Crawl(url string, fetcher Fetcher, urlCollector *UrlBox, doneChannel chan bool) {
	// TODO: Fetch URLs in parallel.
	// TODO: Don't fetch the same URL twice.
	// This implementation doesn't do either:

	currentUrlSeen := false
	urlCollector.mapGate.Lock()
	currentUrlSeen = urlCollector.urlsSeen[url]
	if !currentUrlSeen {
		urlCollector.urlsSeen[url] = true
	}
	urlCollector.mapGate.Unlock()

	if currentUrlSeen {
		doneChannel <- true
		return
	}

	body, urls, err := fetcher.Fetch(url)
	if err != nil {
		fmt.Println(err)
		doneChannel <- true
		return
	}
	fmt.Printf("found: %s %q\n", url, body)

	var unvisitedUrls []string
	urlCollector.mapGate.Lock()

	unvisitedUrls = Filter(urls, func(url string) bool { return !urlCollector.urlsSeen[url] })

	urlCollector.mapGate.Unlock()

	if len(unvisitedUrls) == 0 {
		doneChannel <- true
		return
	}

	childrenDoneChannel := make(chan bool)

	for _, u := range unvisitedUrls {
		go Crawl(u, fetcher, urlCollector, childrenDoneChannel)
	}

	for range len(unvisitedUrls) {
		<-childrenDoneChannel
	}
	doneChannel <- true

}

// fetcher is a populated fakeFetcher.
var fetcher = fakeFetcher{
	"https://golang.org/": &fakeResult{
		"The Go Programming Language",
		[]string{
			"https://golang.org/pkg/",
			"https://golang.org/cmd/",
		},
	},
	"https://golang.org/pkg/": &fakeResult{
		"Packages",
		[]string{
			"https://golang.org/",
			"https://golang.org/cmd/",
			"https://golang.org/pkg/fmt/",
			"https://golang.org/pkg/os/",
		},
	},
	"https://golang.org/pkg/fmt/": &fakeResult{
		"Package fmt",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
	"https://golang.org/pkg/os/": &fakeResult{
		"Package os",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
}

// fakeFetcher is Fetcher that returns canned results.
type fakeFetcher map[string]*fakeResult

type fakeResult struct {
	body string
	urls []string
}

func (f fakeFetcher) Fetch(url string) (string, []string, error) {
	if res, ok := f[url]; ok {
		return res.body, res.urls, nil
	}
	return "", nil, fmt.Errorf("not found: %s", url)
}

// versionCmd represents the version command
var crawler = &cobra.Command{
	Use:   "crawler",
	Short: "Tour of Go Crawler",
	Long:  `Ref https://go.dev/tour/concurrency/10`,

	Run: func(cmd *cobra.Command, args []string) {
		doneChannel := make(chan bool)
		urlsCollector := UrlBox{urlsSeen: make(map[string]bool)}
		go Crawl("https://golang.org/", fetcher, &urlsCollector, doneChannel)
		<-doneChannel
		fmt.Println("I am done")
	},
}

func init() {
	rootCmd.AddCommand(crawler)
}
