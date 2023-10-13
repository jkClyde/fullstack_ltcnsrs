# Generated by Django 4.2.3 on 2023-10-06 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0017_alter_forms_temporary'),
    ]

    operations = [
        migrations.AlterField(
            model_name='forms',
            name='temporary',
            field=models.CharField(choices=[('permanent', 'P'), ('temporary', 'T')], default='', max_length=30),
        ),
    ]
