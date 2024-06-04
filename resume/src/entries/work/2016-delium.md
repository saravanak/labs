---
title: Co-founder
organization: Delium
organizationUrl: https://www.delium.ai/
location: Coimbatore, India 
start: 2015-11-30
end: 2016-03-14
isRemote: true
---

- [R, Time Series Forecasting] Arrive at the optimal holding quantity for any given item, taking into consideration the local store dynamics, festive and seasonal trends, time of the month and stock health of the product.

- [R, Clustering] Used association rules and clustering techniques to develop Basket Analysis and customer persona identification. 
Built a conversational backend with basic NLP using Python Rivescript and NLP Regex parser. Intents and entities will be resolved by the NLP parser. 
- [React] Built a conversational UI with React, React Router, Redux and Material UI with intuitive UI controls, custom table components with client side filtering and download as CSV options.

- [Spring/Java] Built the server for the frontend which serves the crunched data that will be refreshed daily.

- [Droplets, Provisioning, Ansible] Automated provisioning and destroying of droplets in Digital ocean to take care of worker jobs for our platform. The droplets would be triggered automatically, process the jobs for the day and then die out themselves. Droplets were provisioned using Ansible scripts. The droplets are intelligent enough to live along when there is an error in the processing to help debug and aid manual intervention. 

- [Directed Acyclic Graph] Wrote an automatic DAG resolver in Python similar to the resolver used in AirFlow. Given a list of jobs like Job(<Input:A,B>, <Output:C>), the utility would printout the 1) sequence in which the jobs will have to be run, and 2) the groups of the jobs that are independent of each other – so that they can be run in parallel across the cores.

- [CI/CD] The entire setup was integrated with CI/CD using GoCD.
In all works described above, TDD was used. 