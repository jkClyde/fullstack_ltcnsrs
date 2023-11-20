# Generated by Django 4.2.6 on 2023-11-18 05:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DuplicateChild',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('full_name', models.CharField(max_length=255)),
                ('first_barangay', models.CharField(max_length=255)),
                ('second_barangay', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='PrimaryChild',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('fullName', models.CharField(max_length=255)),
                ('address', models.CharField(default='Not specified', max_length=255)),
                ('pt', models.CharField(choices=[('Permanent', 'Permanent'), ('Transient', 'Transient')], default='', max_length=30)),
                ('gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female'), (' M', 'Male'), ('M ', 'Male'), (' F', 'Female'), ('F ', 'Female')], default='Not specified', max_length=10)),
                ('birthdate', models.DateField(blank=True, null=True)),
                ('aim', models.IntegerField(default=0)),
                ('parentName', models.CharField(default='Unknown', max_length=255)),
                ('occupation', models.CharField(default='Unknown', max_length=255)),
                ('relationship', models.CharField(choices=[('Mother', 'Mother'), ('Father', 'Father'), ('Guardian', 'Guardian'), ('', 'not specified')], default='Not specified', max_length=200)),
                ('ethnicity', models.CharField(default='Not specified', max_length=200)),
                ('barangay', models.CharField(choices=[('Alapang', 'Alapang'), ('Alno', 'Alno'), ('Ambiong', 'Ambiong'), ('Balili', 'Balili'), ('Bahong', 'Bahong'), ('Beckel', 'Beckel'), ('Betag', 'Betag'), ('Bineng', 'Bineng'), ('Cruz', 'Cruz'), ('Lubas', 'Lubas'), ('Pico', 'Pico'), ('Poblacion', 'Poblacion'), ('Puguis', 'Puguis'), ('Shilan', 'Shilan'), ('Tawang', 'Tawang'), ('Wangal', 'Wangal')], default='Not specified', max_length=200)),
                ('archive', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='ChildHealthInfo',
            fields=[
                ('childHealth_id', models.AutoField(primary_key=True, serialize=False)),
                ('dow', models.DateField(blank=True, null=True)),
                ('weight', models.FloatField(default=0)),
                ('height', models.FloatField(default=0)),
                ('muac', models.FloatField(default=0)),
                ('deworming1', models.DateField(blank=True, null=True)),
                ('deworming2', models.DateField(blank=True, null=True)),
                ('fic', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], default='no', max_length=10)),
                ('bpe', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], default='no', max_length=10)),
                ('disability', models.CharField(blank=True, default='', max_length=50)),
                ('quarter', models.CharField(default='1st Quarter', max_length=20)),
                ('year', models.IntegerField(blank=True, null=True)),
                ('getYear', models.IntegerField(blank=True, null=True)),
                ('child', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_form.primarychild')),
            ],
        ),
    ]
