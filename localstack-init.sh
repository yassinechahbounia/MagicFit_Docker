#!/bin/bash
echo "Initializing local SQS queue..."
awslocal sqs create-queue --queue-name magicfit-queue
echo "Local SQS queue created!"
