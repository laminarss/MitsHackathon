from django.db import models

class Credentials(models.Model):
    api_url = models.CharField(max_length=200)
    api_key = models.CharField(max_length=50)

class PersonalDetails(models.Model):
    first_name = models.CharField(max_length=30,null=True,blank=True)
    last_name = models.CharField(max_length=30,null=True,blank=True)
    organization = models.CharField(max_length=20,null=True,blank=True)
    personal_emails = models.EmailField(null=True,blank=True)
    linkedin_url = models.CharField(max_length=80,null=True,blank=True)
    twitter_url = models.CharField(max_length=80,null=True,blank=True)
    github_url = models.CharField(max_length=80,null=True,blank=True)
    facebook_url = models.CharField(max_length=80,null=True,blank=True)