# Generated by Django 4.2.3 on 2023-12-09 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0004_alter_primarychild_unique_together'),
    ]

    operations = [
        migrations.AlterField(
            model_name='primarychild',
            name='fullName',
            field=models.CharField(default='Not specified', max_length=255),
        ),
    ]
