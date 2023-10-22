# Generated by Django 4.2.3 on 2023-10-21 03:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0002_forms_aim_alter_forms_gender'),
    ]

    operations = [
        migrations.CreateModel(
            name='Child',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('quarter', models.CharField(choices=[('Q1', 'First Quarter'), ('Q2', 'Second Quarter'), ('Q3', 'Third Quarter'), ('Q4', 'Fourth Quarter')], max_length=10)),
                ('firstName', models.CharField(max_length=255)),
                ('middleName', models.CharField(max_length=255)),
                ('lastName', models.CharField(max_length=255)),
                ('address', models.CharField(default='Not specified', max_length=255)),
                ('pt', models.CharField(choices=[('Permanent', 'Permanent'), ('Temporary', 'Temporary')], default='', max_length=30)),
                ('gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], default='Not specified', max_length=10)),
                ('birthdate', models.DateField(blank=True, null=True)),
                ('aim', models.IntegerField(default=0)),
                ('bpe', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], default='no', max_length=10)),
                ('disability', models.CharField(blank=True, default='', max_length=50)),
                ('parentName', models.CharField(default='Unknown', max_length=255)),
                ('occupation', models.CharField(default='Unknown', max_length=255)),
                ('relationship', models.CharField(choices=[('Mother', 'Mother'), ('Father', 'Father'), ('Guardian', 'Guardian')], default='Not specified', max_length=200)),
                ('ethnicity', models.CharField(choices=[('Aggay', 'Aggay'), ('Akeanon/Aklanon', 'Akeanon/Aklanon'), ('Apayao/Yapayao', 'Apayao/Yapayao'), ('Ayangan', 'Ayangan'), ('Balangao/Baliwon', 'Balangao/Baliwon'), ('Bikol/Bicol', 'Bikol/Bicol'), ('Bisaya/Binisaya', 'Bisaya/Binisaya'), ('Bontok/Binontok', 'Bontok/Binontok'), ('Cebuano', 'Cebuano'), ('Hamtikanon', 'Hamtikanon'), ('Hiligaynon,Ilonggo', 'Hiligaynon,Ilonggo'), ('Ibaloi/Inibaloi', 'Ibaloi/Inibaloi'), ('Ibanag', 'Ibanag'), ('Ibontoc', 'Ibontoc'), ('Ifugao', 'Ifugao'), ('Kalanguya/Ikalahan', 'Kalanguya/Ikalahan'), ('Ilocano', 'Ilocano'), ('Iranon', 'Iranon'), ('Itneg', 'Itneg'), ('Kalinga', 'Kalinga'), ('Kankanai/Kankanaey', 'Kankanai/Kankanaey'), ('Kapampangan', 'Kapampangan'), ('Karao', 'Karao'), ('Kinalinga', 'Kinalinga'), ('Kiniray-a', 'Kiniray-a'), ('Maranao', 'Maranao'), ('Masbateno/Masbatean', 'Masbateno/Masbatean'), ('Pangasinan/Panggalato', 'Pangasinan/Panggalato'), ('Surigaonon', 'Surigaonon'), ('Tagalog', 'Tagalog'), ('Tausug', 'Tausug'), ('Waray', 'Waray'), ('Other Local Ethnicity', 'Other Local Ethnicity'), ('Chinese', 'Chinese'), ('American/English', 'American/English'), ('Other Foreign Ethnicity', 'Other Foreign Ethnicity'), ('Not Reported', 'Not Reported')], default='Not specified', max_length=200)),
                ('dow', models.DateField(blank=True, null=True)),
                ('weight', models.FloatField(default=0)),
                ('height', models.FloatField(default=0)),
                ('muac', models.FloatField(default=0)),
                ('purga', models.DateField(blank=True, null=True)),
                ('vac', models.DateField(blank=True, null=True)),
                ('barangay', models.CharField(choices=[('Alapang', 'Alapang'), ('Alno', 'Alno'), ('Ambiong', 'Ambiong'), ('Balili', 'Balili'), ('Bahong', 'Bahong'), ('Beckel', 'Beckel'), ('Betag', 'Betag'), ('Bineng', 'Bineng'), ('Cruz', 'Cruz'), ('Lubas', 'Lubas'), ('Pico', 'Pico'), ('Poblacion', 'Poblacion'), ('Puguis', 'Puguis'), ('Shilan', 'Shilan'), ('Tawang', 'Tawang'), ('Wangal', 'Wangal')], default='Not specified', max_length=200)),
            ],
        ),
        migrations.DeleteModel(
            name='Forms',
        ),
    ]
