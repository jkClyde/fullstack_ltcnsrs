# Generated by Django 4.2.6 on 2023-11-20 05:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='primarychild',
            name='archive',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='primarychild',
            name='customEthnicity',
            field=models.CharField(default='Not specified', max_length=200),
        ),
    ]
