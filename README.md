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

## Sprint 1 - backend
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

## Sprint 2 - gateway api
add API gateway, creating a public URL. sending a post request to that URL
with JSON, api gateway catches it and sends it to lambda to processes and 
writes to dynamoDB, returns a response

URL: https://mjrsupys38.execute-api.us-east-1.amazonaws.com/dev

I tested the connection by sending mock JSON through the API gateway
console and got a status of 200

deployed to the dev stage

backend is now accessible

## Sprint 3 - frontend
added 3 files to the root folder
index.hmtl
styles.css
app.js

submit triggers app.js that converts the input into JSON
sends to API Gateway > lambda > dynamodb > responce back to hmtl

testing and came across glitch
CORS - needed to allow a local domain request to reach the API Gateway
security reasons, just needed to enabled on AWS console