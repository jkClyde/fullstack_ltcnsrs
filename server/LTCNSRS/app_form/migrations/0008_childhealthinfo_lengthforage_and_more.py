# Generated by Django 4.2.3 on 2023-11-20 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0007_remove_childhealthinfo_lengthforage_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='childhealthinfo',
            name='lengthForAge',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
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