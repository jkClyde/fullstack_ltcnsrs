# Generated by Django 4.2.3 on 2023-11-04 07:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0006_childhealthinfo_primarychild_delete_firstquarter_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='primarychild',
            old_name='firstName',
            new_name='fullName',
        ),
        migrations.RemoveField(
            model_name='primarychild',
            name='lastName',
        ),
        migrations.RemoveField(
            model_name='primarychild',
            name='middleName',
        ),
    ]