# Generated by Django 4.2.3 on 2023-10-10 07:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0030_forms_banrangay_alter_forms_date_added'),
    ]

    operations = [
        migrations.RenameField(
            model_name='forms',
            old_name='banrangay',
            new_name='barangay',
        ),
    ]
