from django.contrib import admin

from .models import PersonalDetails,Credentials

admin.site.register(PersonalDetails)
admin.site.register(Credentials)
