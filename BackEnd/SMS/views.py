from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse, HttpResponse
from twilio.rest import Client
from django.views.decorators.csrf import csrf_exempt
from .models import PersonalDetails,Credentials
from twilio.twiml.voice_response import VoiceResponse
from django.core.mail import send_mail,EmailMessage
import requests
import json

def home(request):
    return render(request, "calls/index.html")  # Load frontend page

def make_call(request):
    to_phone = request.GET.get("to")  # Get number from input
    if not to_phone:
        return JsonResponse({"error": "Phone number required"}, status=400)

    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

    call = client.calls.create(
        to=to_phone,
        from_=settings.TWILIO_PHONE_NUMBER,
        url="https://your-ngrok-url.ngrok.io/calls/voice-response/"  # Public endpoint
    )

    return JsonResponse({"message": "Call initiated", "call_sid": call.sid})

def voice_response(request):
    response = VoiceResponse()
    response.say("Hello! Please say something after the beep.", voice="alice")
    response.record(transcribe=True, transcribe_callback="/calls/transcribe/")

    return HttpResponse(str(response), content_type="application/xml")

def transcribe(request):
    transcript = request.POST.get("TranscriptionText", "")
    return JsonResponse({"transcription": transcript})  # Send text back to frontend

def save_person_details(request):
    request_data = []
    if request.method == "POST" and request.FILES.get("file"):
        uploaded_file = request.FILES["file"]
        for line in uploaded_file:
            decoded_line = line.decode("utf-8").strip()
            values = decoded_line.split(";")
            request_data.append(values)
        request_data = list(set(request_data))
        credit = Credentials.objects.filter(pk=1).values('api_url','api_key')[0]
        personal_data_instance = []
        for url in request_data:
            url = credit['api_url']+url
            headers = {
                "accept": "application/json",
                "Cache-Control": "no-cache",
                "Content-Type": "application/json",
                "x-api-key": credit['api_key']
            }
            response = requests.post(url, headers=headers)
            response = json.loads(response.text)
            if response:
                personal_data = response.get('person')
                personal_emails = personal_data.get('personal_emails')
                if personal_emails:
                    first_name = personal_data.get('first_name')
                    last_name = personal_data.get('last_name')
                    organization = personal_data.get('organization').get('name') if personal_data.get('organization') else None
                    linkedin_url = personal_data.get('linkedin_url')
                    twitter_url = personal_data.get('twitter_url')
                    github_url = personal_data.get('github_url')
                    facebook_url = personal_data.get('facebook_url')
                    personal_data_instance.append(PersonalDetails(
                        first_name=first_name,last_name=last_name,
                        organization=organization,personal_emails=personal_emails,
                        linkedin_url=linkedin_url,twitter_url=twitter_url,
                        github_url=github_url,facebook_url=facebook_url
                    ))
        if personal_data_instance:
            PersonalDetails.objects.bulk_create(personal_data_instance)

def get_person_details(request):
    if request.method == 'GET':
        final_data = PersonalDetails.objects.all().values(
            'first_name','last_name','organization',
            'linkedin_url','personal_emails'
        )
        return JsonResponse(final_data,status=200)
    return JsonResponse({'message':'unsupported http method'},status=400)

@csrf_exempt  # Disable CSRF protection for testing (not recommended in production)
def send_email(request):
    if request.method == 'POST':
        try:
            # Get email from form data
            request_email = request.POST.get('receiver_email')
            uploaded_file = request.POST.get('file')
            print(type(uploaded_file))
            # print(uploaded_file[0])
            if not request_email or not uploaded_file:
                return JsonResponse({'error': 'Missing email or file'}, status=400)

            # Create email with attachment
            email = EmailMessage(
                subject='Hackathon Test Sales Solution',
                body='This file contains data which you require',
                from_email=settings.EMAIL_HOST_USER,
                to=[request_email],
            )
            email.attach('attachment.txt',uploaded_file,'text/plain')
            email.send()

            return JsonResponse({'result': 'Email has been sent successfully!'}, status=200)
        except Exception as e:
            return JsonResponse({'error': f'Error sending email: {str(e)}'}, status=500)

    return JsonResponse({'message': 'Unsupported HTTP method'}, status=400)   