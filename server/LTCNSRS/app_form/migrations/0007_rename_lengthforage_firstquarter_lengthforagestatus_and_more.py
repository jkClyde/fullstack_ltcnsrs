# Generated by Django 4.2.3 on 2023-10-25 05:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0006_firstquarter_lengthforage_firstquarter_weightforage_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='firstquarter',
            old_name='lengthForage',
            new_name='lengthForAgeStatus',
        ),
        migrations.RenameField(
            model_name='fourthquarter',
            old_name='lengthForAge',
            new_name='lengthForAgeStatus',
        ),
        migrations.RenameField(
            model_name='secondquarter',
            old_name='lengthForage',
            new_name='lengthForAgeStatus',
        ),
        migrations.RenameField(
            model_name='thirdquarter',
            old_name='lengthForage',
            new_name='lengthForAgeStatus',
        ),
    ]
