---
title:  Throughput Is Low in my localhost
date:   2024-07-27T07:24:36+05:30
tags: ['posts','go','http']
---


I was trying some concurrency tests on localhost, and got the following with a simple `Hello World` returning http server.

```
$ bombardier -c 125 -n 10000000  http://localhost:7070/bar                                                                                                                          [6:40:55]
egrep: warning: egrep is obsolescent; using grep -E
Bombarding http://localhost:7070/bar with 10000000 request(s) using 125 connection(s)
 10000000 / 10000000 [====================================================================================================] 100.00% 171475/s 58s
Done!
Statistics        Avg      Stdev        Max
  Reqs/sec    171493.75   18406.79  211284.15
  Latency      724.62us   189.43us    60.40ms
  HTTP codes:
    1xx - 0, 2xx - 10000000, 3xx - 0, 4xx - 0, 5xx - 0
    others - 0
  Throughput:    31.91MB/s
```

If you refer to the [documentation of
Bombardier](https://github.com/codesenberg/bombardier) the reference numbers are
are about 10 times higher! (292.92MB/s). Surprised. Some diggging through:

```
sudo hdparm -Tt /dev/nvme0n1p7 
/dev/nvme0n1p7:
 Timing cached reads:   14754 MB in  2.00 seconds = 7391.97 MB/sec
 Timing buffered disk reads: 1402 MB in  3.00 seconds = 466.91 MB/sec

 # All good.  Lets try tcp : wit iPerf.
 
 iperf -s 
 iperf -c 127.0.0.1 -t 100  -i 5 

 ------------------------------------------------------------
Client connecting to 127.0.0.1, TCP port 5001
TCP window size: 16.0 KByte (default)
------------------------------------------------------------
[  1] local 127.0.0.1 port 46254 connected with 127.0.0.1 port 5001
[ ID] Interval       Transfer     Bandwidth
[  1] 0.0000-5.0000 sec  16.0 GBytes  27.5 Gbits/sec
[  1] 5.0000-10.0000 sec  15.3 GBytes  26.3 Gbits/sec
[  1] 10.0000-15.0000 sec  15.6 GBytes  26.9 Gbits/sec
[  1] 15.0000-20.0000 sec  15.5 GBytes  26.7 Gbits/sec
[  1] 20.0000-25.0000 sec  15.9 GBytes  27.4 Gbits/sec
^C[  1] 25.0000-28.3807 sec  10.6 GBytes  26.8 Gbits/sec

# Almost 3 GB per second, but sure if this reads the Hard drives. 
```

Both of the above tests seem to indicate that neither the network nor the HD is
limitting. So not sure at the moment why the bandwidth peaks at only 30MBps.