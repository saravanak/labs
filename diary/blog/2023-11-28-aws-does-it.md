---
title: "AWS - Does it?"
date: 2023-11-28
draft: false
tags: ["posts", "aws", "cloud"]
---

Trading out capex is the USP of AWS and other cloud offerings. But it introduces
operating expenses, capacity reservations. We are forced to think about cost
efficiency while deciding on the solution. Automated controls require more
measure and hence more costs. Is this a worthy trade-off ? Are we thinking about
what to solve or how to solve ? Is the c loud offering value points same across
customer sizes ?

<em>
Caution: A Rather Pessimistic Rant about Cloud Offerings, with AWS as an example. Being a devil's advocate here.
</em>

AWS says **DON'T** worry about provisioning and capacity while deciding on the
solution - you can always scale later. But soon, the costs soon add up - for
scaling, you need to provision to the minute CloudWatch events and logs.

But the documentation is peppered with quotas, sharing, reserved provisioning of
concurrency etc. So I am puzzled about how do we equate these Infrastructure
decisions when say, going for a new region ?

I guess we will be over provisioning all along.

Also AWS seems to be a data-sink with all the CloudWatch|Trail|XRay requirement,
we'd end up paying more for observability and 'working-in' the platform than for
the features themselves. Also this is OPEX, so on a longer run, does this mean
this will eat over the CAPEX?

If you want more fun, you'd have enough to worry about vendor lock-in. See for
example the cost comparison at NeoCities [^1]

[^1]: <https://neocities.org/supporter>
