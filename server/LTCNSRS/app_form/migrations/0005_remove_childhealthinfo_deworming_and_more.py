# Generated by Django 4.2.3 on 2023-12-11 12:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0004_childhealthinfo_otherdisability'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='childhealthinfo',
            name='deworming',
        ),
        migrations.RemoveField(
            model_name='childhealthinfo',
            name='vac',
        ),
    ]
