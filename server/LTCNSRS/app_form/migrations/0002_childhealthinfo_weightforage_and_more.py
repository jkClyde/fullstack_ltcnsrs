# Generated by Django 4.2.6 on 2023-11-18 06:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='childhealthinfo',
            name='weightForAge',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
        migrations.AddField(
            model_name='childhealthinfo',
            name='weightForLength',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
    ]
