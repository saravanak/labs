---
title:  Graphql and Rest - Comparision Notes
date:   2024-05-30T20:53:53+05:30
tags: ['posts','graphql','REST']
---

## Intro

Personally, I have zero experience on the topic of GraphQL whereas I've developed and coded against REST APIs for Dogfooding usecases at work.  

This [rant here](https://bessey.dev/blog/2024/05/24/why-im-over-graphql/) is a nice summary of the various pain points of the GraphQL method. 

## TL;DR

- Authorisation
- Rate limiting
- Query parsing
- Data fetching and the N+1 problem,
- Authorisation and the N+1 problem

Looks like the defences against the above problems are not that efficient and justifies the pain of the author given his experience and adherence to GraphQL in the past. 


So the altenative are
 -   **OpenAPI 3.0+ compliant JSON REST API**. 
 - Specification first GraphQL; but it does not specify how we'd allieviate the above seen concerns


## HN says

Notes from related HackerNews [thread]()

- mRPC and REST are just more straightforward to monitor, log, cache, authorize and debug.


```$$("td[indent='0'] ~ td.default div.comment").map(t => t.textContent)```
Can we use lunar indexing to get to interesting stuff?
Seperate to questions, statements and analysis summaries; urls