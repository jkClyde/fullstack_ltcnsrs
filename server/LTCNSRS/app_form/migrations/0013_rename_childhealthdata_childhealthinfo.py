# Generated by Django 4.2.3 on 2023-11-04 14:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0012_childhealthdata_remove_fourthquarter_child_id_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ChildHealthData',
            new_name='childhealthinfo',
        ),
    ]
