# Generated by Django 4.2.3 on 2023-11-20 05:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0004_alter_childhealthinfo_bpe_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='childhealthinfo',
            name='lengthforAge',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
    ]