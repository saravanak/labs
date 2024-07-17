---
title: Crawler Challenge in Go
date: 2024-07-17T08:46:33+05:30
tags: ["posts", "go"]
---

Better late than never. I've hopped on to [Tour
Of Go](https://go.dev/tour/concurrency/) now and then, but digress quiet too
often. Now I got the time and mind think to actually complete the exercises.

So this is about implementing the Crawler using concurrent primitives. See
[here](https://go.dev/tour/concurrency/10) for a problem description. There
were multiple stages to solve this one.

## The urlsSeen `UrlBox` struct

Given the hint to use a Mutex, this was an easy one. Also pretty
straightforward to implement.

## Orchestrating each of the goroutines

The `Crawl` function is executed as a goroutine. So it was evident that a
channel was needed that can wait on the called goroutine. But there were
recursive calls to `Crawl` from it. Initially I tried to synchronize these
recursive calls using a single 'global' channel - created from the main
function. But later I realized that each goroutine needs to have it's own
synchronizer channel. Once this thought came in, it was easy to implement. This
was The Moment.

## The `depth` detractor

The `depth` parameter for the stub implementation given on the challenge was
always an eye-sore. It distracted me. I was aiming to find the end condition of
the recursive calls both using the channel and respecting the depth variable.
But on later thought, I realized that we should do only either of the two. And
hence the solution.

## Importance of `I am done`

If you see the `main` function, you can see that there is an `I am done`
printed. I added it as a guard to check if we are not ending mail function.
Consider: the outer channel is marked as sent, but the inner channels are not
marked as sent -they are still processing, obviously assuming bad things happen
on a black box. This statement helped me to arrive at the current solution

## Go play with it!

The solution is available as a playable version, thanks to Go Playground! https://go.dev/play/p/6zw9W6n_EjM

```go

package main

import (
	"fmt"
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
func main() {
	doneChannel := make(chan bool)
	urlsCollector := UrlBox{urlsSeen: make(map[string]bool)}
	go Crawl("https://golang.org/", fetcher, &urlsCollector, doneChannel)
	<-doneChannel
	fmt.Println("I am done")
}

```

