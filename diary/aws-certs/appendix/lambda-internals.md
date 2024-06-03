**AWS services accessible by default**
  - Amazon API Gateway
  - Amazon CloudFront
  - Amazon CloudWatch
  - Amazon Comprehend
  - Amazon DynamoDB
  - Amazon EventBridge
  - Amazon Kinesis
  - Amazon Lex
  - Amazon Pinpoint
  - Amazon Polly
  - Amazon Rekognition
  - Amazon S3
  - Amazon SNS
  - Amazon SQS
  - AWS Step Functions
  - Amazon Textract
  - Amazon Transcribe
  - Amazon Translate

 **AWS services requiring VPC configuration**
  - Amazon ECS
  - Amazon EFS
  - Amazon ElastiCache
  - Amazon OpenSearch Service
  - Amazon MSK
  - Amazon MQ
  - Amazon RDS
  - Amazon Redshift

  ### Calling Lambdas from Services
  
  **Synchronous invocation**	

- AWS CLI
- Elastic Load Balancing (Application Load Balancer)
- Amazon Cognito
- Amazon Lex
- Amazon Alexa
- Amazon API Gateway
- Amazon CloudFront via Lambda@Edge
- Amazon Kinesis Data Firehose
- Amazon S3 Batch

**Asynchronous invocation**	
- Amazon S3
- Amazon SNS
- Amazon Simple Email Service
- AWS CloudFormation
- Amazon CloudWatch Logs
- Amazon CloudWatch Events
- AWS CodeCommit
- AWS Config
- AWS IoT
- AWS IoT Events
- AWS CodePipeline

**Polling invocation**
- Amazon DynamoDB
- Amazon Kinesis
- Amazon Managed Streaming for Apache Kafka (Amazon MSK)
- Amazon SQS

| AWS service             | Invocation type          | Retry behavior                                                                   |
| ----------------------- | ------------------------ | -------------------------------------------------------------------------------- |
| Amazon API Gateway      | Synchronous              | None – returns error to the client                                               |
| Amazon S3               | Asynchronous             | Retries with exponential backoff                                                 |
| Amazon SNS              | Asynchronous             | Retries with exponential backoff                                                 |
| Amazon DynamoDB Streams | Synchronous from poller  | Retries until data expiration (24 hours)                                         |
| Amazon Kinesis          | Synchronous from poller  | Retries until data expiration (24 hours to 7 days)                               |
| AWS CLI                 | Synchronous/Asynchronous | Configured by CLI call                                                           |
| AWS SDK                 | Synchronous/Asynchronous | Application-specific                                                             |
| Amazon SQS              | Synchronous from poller  | Retries until Message Retention Period expires or is sent to a dead-letter queue |