import boto3
import json
import uuid
from datetime import date

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('habits')

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
        'body': json.dumps({'message': 'Habit created', 'habitDate': habit_date})
    }