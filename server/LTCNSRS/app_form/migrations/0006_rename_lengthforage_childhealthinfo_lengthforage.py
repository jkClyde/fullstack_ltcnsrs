# Generated by Django 4.2.3 on 2023-11-20 09:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0005_childhealthinfo_lengthforage'),
    ]

    operations = [
        migrations.RenameField(
            model_name='childhealthinfo',
            old_name='lengthforAge',
            new_name='lengthForAge',
        ),
    ]
