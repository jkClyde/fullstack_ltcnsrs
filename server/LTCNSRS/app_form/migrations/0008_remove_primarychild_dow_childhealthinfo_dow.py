# Generated by Django 4.2.3 on 2023-11-04 07:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0007_rename_firstname_primarychild_fullname_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='primarychild',
            name='dow',
        ),
        migrations.AddField(
            model_name='childhealthinfo',
            name='dow',
            field=models.DateField(blank=True, null=True),
        ),
    ]
