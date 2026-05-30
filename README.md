# Zero-To-Hero: Cloud Engineer App

A serverless habit tracking application built on AWS during a self-directed 
cloud engineering career transition.

## Stack
- AWS Lambda
- Amazon API Gateway
- Amazon DynamoDB
- Amazon EventBridge
- Amazon SES
- Amazon S3
- Amazon CloudFront

## Purpose
Tracks daily habits — SAA study, studying Python, GitHub commits, 
LinkedIn activity, project build time, and exercise.

## Author
Julio Interiano — juliointeriano.cloud

## Sprint 1
I created two tables in DynamoDB, habits and logs, with two composite key.
Turns out it's cost effective to half the scan of the database will help cost reduction. 
I can look at time as a range query for the app

Lambda functions can't normally interact with DynamoDB unless given permissions.
I created a iam role for lambda to be given full access
In development, it's fine to use full access but will later specify <- 

I then created the function that will take the json payload and convert it 
for dynamodb to store. 
I attach to the lambda function the iam role.

Unit tests reveal that it's successful

Github commit
