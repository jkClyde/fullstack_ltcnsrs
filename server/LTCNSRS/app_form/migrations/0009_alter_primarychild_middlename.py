# Generated by Django 4.2.3 on 2023-12-11 16:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0008_alter_primarychild_middlename'),
    ]

    operations = [
        migrations.AlterField(
            model_name='primarychild',
            name='middlename',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
