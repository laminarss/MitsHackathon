# Generated by Django 5.1.7 on 2025-03-08 11:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PersonalDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=30, null=True)),
                ('last_name', models.CharField(blank=True, max_length=30, null=True)),
                ('organization', models.CharField(blank=True, max_length=20, null=True)),
                ('personal_emails', models.EmailField(blank=True, max_length=254, null=True)),
                ('linkedin_url', models.CharField(blank=True, max_length=80, null=True)),
                ('twitter_url', models.CharField(blank=True, max_length=80, null=True)),
                ('github_url', models.CharField(blank=True, max_length=80, null=True)),
                ('facebook_url', models.CharField(blank=True, max_length=80, null=True)),
            ],
        ),
    ]
