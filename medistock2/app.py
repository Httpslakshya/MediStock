import asyncio 
from notificationapi_python_server_sdk import notificationapi

async def send_notification():
    notificationapi.init(
        "n6918c5ceg10zsii6kqbpye6lc",  # clientId
        "d21k5ftc9ve8k6r7euclzz2uth7rors0nw5zysuym2iagkmztdl17q47bq" # clientSecret
    )

    await notificationapi.send({
        "notificationId": "medistock",
        "user": {
          "id": "lakshyadharkar@gmail.com",
          "email": "lakshyadharkar@gmail.com",
          "number": "+919669500111" # Replace with your phone number
        },
        "mergeTags": {        }
    })

asyncio.run(send_notification())