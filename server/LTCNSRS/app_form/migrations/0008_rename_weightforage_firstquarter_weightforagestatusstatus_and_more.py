# Generated by Django 4.2.3 on 2023-10-25 05:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0007_rename_lengthforage_firstquarter_lengthforagestatus_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='firstquarter',
            old_name='weightForage',
            new_name='weightForAgeStatusStatus',
        ),
        migrations.RenameField(
            model_name='fourthquarter',
            old_name='weightForAge',
            new_name='weightForAgeStatus',
        ),
        migrations.RenameField(
            model_name='secondquarter',
            old_name='weightForage',
            new_name='weightForAgeStatus',
        ),
        migrations.RenameField(
            model_name='thirdquarter',
            old_name='weightForage',
            new_name='weightForAgeStatus',
        ),
    ]
