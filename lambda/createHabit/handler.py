import boto3
import json
import uuid
from datetime import date

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('habits')

# Lambda function to create a new habit
# uuid generates a unique habit id and date is used to create a unique habitDate for each habit. 
# The habitDate is a combination of habitId and the current date, ensuring that 
# each habit entry is unique and can be easily queried based on the userId and habitDate.

def lambda_handler(event, context):
    habit_id = str(uuid.uuid4())
    user_id = event['userId']
    habit_name = event['habitName']
    frequency = event['frequency']
    habit_date = f"{habit_id}#{date.today()}"

    table.put_item(Item={
        'userId': user_id,
        'habitDate': habit_date,
        'habitName': habit_name,
        'frequency': frequency,
        'status': 'active'
    })

    return {
    'statusCode': 200,
    'headers': {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST'
    },
    'body': json.dumps({'message': 'Habit created', 'habitDate': habit_date})
}