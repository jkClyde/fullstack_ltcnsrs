# Generated by Django 4.2.3 on 2023-11-02 10:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0006_child_quarterdata_delete_firstquarter_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='child',
            old_name='first_name',
            new_name='firstName',
        ),
        migrations.RenameField(
            model_name='child',
            old_name='last_name',
            new_name='lastName',
        ),
        migrations.RenameField(
            model_name='child',
            old_name='middle_name',
            new_name='middleName',
        ),
        migrations.RenameField(
            model_name='child',
            old_name='parent_name',
            new_name='parentName',
        ),
    ]
