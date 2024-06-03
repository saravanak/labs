## Overall picture

[Service Quotas dashboard](https://console.aws.amazon.com/servicequotas/home)

## Event Driven 

 |Service|Metric|Limit|
 |---|--|--|
 |API Gateway|Request timeout| 29 seconds|
 |           |Throttle|10000 request per seconds|
 |              | Payload| 10Mb|
 |Lambda|Execution timeout| 15 mins|
 |           |Throttle|1000 request per seconds|
 |              | Payload| 6Mb|
 |SQS|Payload| 256 KB|

 ## Split and manage centrally 
    Divide into seperate accounts and manage via AWS Organizations. Keep seperate accounts for devs/staging/prod so testings and env are isolated, thus keeping quotas local to each envs.