import boto3
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('habits')

def lambda_handler(event, context):
    body = json.loads(event['body'])
    user_id = body['userId']
    habit_date = body['habitDate']

    table.delete_item(Key={
        'userId': user_id,
        'habitDate': habit_date
    })

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,DELETE'
        },
        'body': json.dumps({'message': 'Habit deleted'})
    }
