# Generated by Django 4.2.3 on 2023-11-04 15:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0013_rename_childhealthdata_childhealthinfo'),
    ]

    operations = [
        migrations.RenameField(
            model_name='childhealthinfo',
            old_name='child_id',
            new_name='child',
        ),
    ]
