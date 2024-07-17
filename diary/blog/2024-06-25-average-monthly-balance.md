---
title:  Average Monthly Balance
date:   2024-06-25T22:27:13+05:30
tags: ['posts','cli']
---


## Create/Script your own tools

The crux of learning is doing. And to err is human; to repeat devilish. Hence
you learn to create tools for fun and your own profit. 

## After 20 years

Though I have been creating some off the hook commands from StackOverflow for
quick repetitions| this is my first attempt to log the process of a new tool
creation. 

## Calculate AMB: Average Monthly Balance

My savings bank at India| though it might sound surprising for some of you
folks| has a concept called Average Monthly Balance(AMB). The intent is to have
an average balance of money on your account within a month. Its calculated as 

```sh
 For each day 
    Get the oldest balance on or before 23:59:59 
    Sum this to the monthly total 
Divide the sum by the number of days 
```

The above calculated AMB should be more than the minimum specified by your bank
on your account; else it will attract penalty. 

## GNU Cash

I use GNU cash for maintaining my accounts. End of month| I pull the statement
from my bank account. Lets assume that the bank statement has the following
structure, delimited by comma.


|Date	|Narration	|Value	Dat|Debit	Amount	|Credit	Amount	|Chq/Ref	Number	|Closing	Balance|
|------|------|------|------|------|------|------|
|1	|2	|3	|4	|5	|6	|7	|
|<td style="color:green; background-color:yellow" colspan=6> # Note: The above row is not in the input csv; This is just to show the column numbers for easy reading </td>|
|01/06/24	|UPI-XXXX	|01/06/24	|	600.00	|	0.00	|00.00.0.0	|	4388.95	|

Most of the fields are self explanatory. What we are interested in is the `Date`
and the `Closing Balance`. The statement is assumed to be ordered by the date
(1st column) and this date is assumed to be the date for the AMB calculations.


So I used an Awk script like so:

<div class="line-numbers">

```sh
awk 'BEGIN{FS=","}\
{if (NR >= 3) {bal[$1]=$7;}} \
END{ sum=0; \
    for (i in  bal){\
       sum+= bal[i];\
    }\
    print sum/length(bal) } ' June.txt 
```

</div>

## Explanation

- Begin by setting FS (Field separator) to comma. (as it is a csv file)
- the `if` statement avoids processing the header line. We could use awk regex
   matchers like `^\d\d{...}` or the likes, but, ya, hell a lot of liberty for
   being dirty!
- inside the `if` statement we keep on overwriting the balance field(`Field
   #7`) on the date key(`Field #1`) on the associative array (aka `arrays` in
   awk)
- After we are done with the `if` statement, the array contains the EOD
   balances for each date (as the file is sorted by date)
- on the end block , we just do a sum and find the average using `length(bal)`

## Finishing up

 (which I am yet to)!. You can sprinkle the above by mixing an `alias` with bash
 argument substitutions (`$0`) and link it on the `bin` folder, and voila, you
 have a `check-amb june.txt` on your finger tips!

