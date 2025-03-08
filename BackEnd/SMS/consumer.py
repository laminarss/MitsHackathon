import json
from channels.generic.websocket import AsyncWebsocketConsumer

class LiveTranscriptionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = "transcription_room"
        self.room_group_name = f"transcription_{self.room_name}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        transcription_text = data["transcription"]

        # Send the transcription to all connected clients
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "transcription_message",
                "message": transcription_text,
            },
        )

    async def transcription_message(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps({"transcription": message}))
