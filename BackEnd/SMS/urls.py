from django.urls import path
from .views import home, make_call, voice_response,\
                transcribe, save_person_details,\
                get_person_details, send_email

urlpatterns = [
    path("", home, name="home"),
    path("call/", make_call, name="make_call"),
    path("voice-response/", voice_response, name="voice_response"),
    path("transcribe/", transcribe, name="transcribe"),
    path("save_person_details/", save_person_details, name="save_person_details"),
    path("get_person_details/", get_person_details, name="get_person_details"),
    path("send_email/", send_email, name="send_email")
]
