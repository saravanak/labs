# AWS Lambda 

 ## Shared Responsiblity

  - Limits your access to the underlying operating systems, hypervisors, and hardware running your Lambda functions.
  - when API Gateway and Lambda interact, there is no concept of load balancing available since it is entirely managed by the services
  - You also have no direct control over which Availability Zones the services use when invoking functions at any point in time,
  - Any secrets or sensitive information should be stored in **AWS Systems Manager Parameter** Store or **AWS Secrets Manager** and loaded by the function

## Design

**Favour on-demand over batches**  In any scheduled task that processes a batch, there is the potential for the volume of transactions to grow beyond what can be processed within the 15-minute Lambda timeout.

**Orchestration** With AWS Step Functions, you use state machines to manage orchestration. This extracts the error handling, routing, and branching logic from your code, replacing it with state machines declared using JSON.  A workflow can also run for up to 1 year. **Vs EventBridge**: While Step Functions is designed for workflows within a bounded context or microservice, to coordinate state changes across multiple services, instead use Amazon EventBridge. This is a serverless event bus that routes events based upon rules, and simplifies orchestration between microservices.

**Idempotency** Functions should be designed to be idempotent

**Monoliths vs Fine grained functions**

In most cases, it is safer to separate the **resources that produce and consume events from Lambda**. However, if you need a Lambda function to write data back to the same resource that invoked the function, ensure that you: 1) Use a positive trigger, 2) Use reserved concurrency 3) Use CloudWatch monitoring and alarming:

**Avoid functions calling functions** Tight coupling, Cost, Error Handling. - use an SQS queue between Lambda functions (or) AWS Step Functions.

**Avoid synchronous waiting**

## Gotchas

- Can Lambda-based applications work in multiple Regions?
     Lambda functions can be deployed in multiple Regions as part of a deployment pipeline, and API Gateway can be configured to support this configuration. See this [example architecture](https://d1.awsstatic.com/architecture-diagrams/ArchitectureDiagrams/serverless-architecture-for-global-applications-ra.pdf) that shows how this can be achieved.

## Quotas 
 - Weakest link [[aws-quotas]]
 - For an initial burst of traffic, your cumulative concurrency in a Region can reach between 500 and 3000 instances per minute, depending upon the Region. After this initial burst, functions can scale by an additional 500 instances per minute. If requests arrive faster than a function can scale, or if a function reaches maximum capacity, additional requests will fail with a throttling error (status code 429).

 ### Concurrency

 !! Lambda functions in a single AWS account in one Region share the concurrency limit.
  You can set reserved concurrency for Lambda functions to ensure that they can be invoked even if the overall capacity has been exhausted. Reserved concurrency has two effects on a Lambda function:

| Mode              | Comments                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| On-demand scaling | Cold Start. 1000 Concurrent per minute and then 500 per minute.                                                    |
| Provisioned       | First served on Provisioned and then move to on-demand scaling from zero. N\no cold starts on Provisioned capacity |
| Reserved Capacity | Take from on-demand scaling and go no higher than reserved. give/take only that much.|
  

### Runtimes 

 - both Python and Node.js are both fast to initialize and offer reasonable overall performance. 
 - Java/C# is much slower to initialize but can be extremely fast once running. 
 - Go can be extremely performant for both start-up and execution. 
 
 If performance is critical to your application, then profiling and comparing runtime performance is an important first step before coding applications.

 ### Manage SDK Versions 

 The Lambda service also provides AWS SDKs for your chosen runtime. These enable you to interact with AWS services using familiar code constructs. SDK versions change frequently as AWS adds new features and services, and the Lambda service periodically updates the bundled SDKs. Consequently, if you are using the bundled SDK version, you will notice the version changes in your function even if your function code has not changed. (!!)

 To lock an SDK version and make it immutable, it’s recommended that you create a Lambda layer with a specific version of an SDK and include this in your deployment package.

 ### Connectivity 

 Most serverless services can be used without further VPC configuration, while most instance-based services require VPC configuration:

  [[aws-certs/appendix/lambda-internals]]

  ### Autoscaling 
   Lambda scales automatically. Have to ensure that anything that is downstream is also scaled / appropriately provisioned. Eg. Using RDS Proxy over direct RDS connections.

## Secrets 

When protecting data at rest, use AWS services for key management and encryption of stored data, secrets and environment variables. Both the AWS Systems Manager Parameter Store and AWS Secrets Manager provide a robust approach to storing and managing secrets used in Lambda functions.

Do not store plaintext secrets or API keys in Lambda environment variables. Instead, use the AWS Key Management Service (KMS) to encrypt environment variables. Also ensure you do not embed secrets directly in function code, or commit these secrets to code repositories.

(...https://docs.aws.amazon.com/lambda/latest/operatorguide/perf-optimize.html)