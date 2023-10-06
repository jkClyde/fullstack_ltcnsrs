# Generated by Django 4.2.3 on 2023-10-05 10:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0004_forms_birthdate_forms_dow'),
    ]

    operations = [
        migrations.AlterField(
            model_name='forms',
            name='address',
            field=models.CharField(default='Not specified', max_length=255),
        ),
        migrations.AlterField(
            model_name='forms',
            name='disability',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='forms',
            name='father_ethnicity',
            field=models.CharField(choices=[('Aggay', 'Aggay'), ('Akeanon/Aklanon', 'Akeanon/Aklanon'), ('Apayao/Yapayao', 'Apayao/Yapayao'), ('Ayangan', 'Ayangan'), ('Balangao/Baliwon', 'Balangao/Baliwon'), ('Bikol/Bicol', 'Bikol/Bicol'), ('Bisaya/Binisaya', 'Bisaya/Binisaya'), ('Bontok/Binontok', 'Bontok/Binontok'), ('Cebuano', 'Cebuano'), ('Hamtikanon', 'Hamtikanon'), ('Hiligaynon,Ilonggo', 'Hiligaynon,Ilonggo'), ('Ibaloi/Inibaloi', 'Ibaloi/Inibaloi'), ('Ibanag', 'Ibanag'), ('Ibontoc', 'Ibontoc'), ('Ifugao', 'Ifugao'), ('Kalanguya/Ikalahan', 'Kalanguya/Ikalahan'), ('Ilocano', 'Ilocano'), ('Iranon', 'Iranon'), ('Itneg', 'Itneg'), ('Kalinga', 'Kalinga'), ('Kankanai/Kankanaey', 'Kankanai/Kankanaey'), ('Kapampangan', 'Kapampangan'), ('Karao', 'Karao'), ('Kinalinga', 'Kinalinga'), ('Kiniray-a', 'Kiniray-a'), ('Maranao', 'Maranao'), ('Masbateno/Masbatean', 'Masbateno/Masbatean'), ('Pangasinan/Panggalato', 'Pangasinan/Panggalato'), ('Surigaonon', 'Surigaonon'), ('Tagalog', 'Tagalog'), ('Tausug', 'Tausug'), ('Waray', 'Waray'), ('Other Local Ethnicity', 'Other Local Ethnicity'), ('Chinese', 'Chinese'), ('American/English', 'American/English'), ('Other Foreign Ethnicity', 'Other Foreign Ethnicity'), ('Not Reported', 'Not Reported')], default='Not specified', max_length=200),
        ),
        migrations.AlterField(
            model_name='forms',
            name='mother_ethnicity',
            field=models.CharField(choices=[('Aggay', 'Aggay'), ('Akeanon/Aklanon', 'Akeanon/Aklanon'), ('Apayao/Yapayao', 'Apayao/Yapayao'), ('Ayangan', 'Ayangan'), ('Balangao/Baliwon', 'Balangao/Baliwon'), ('Bikol/Bicol', 'Bikol/Bicol'), ('Bisaya/Binisaya', 'Bisaya/Binisaya'), ('Bontok/Binontok', 'Bontok/Binontok'), ('Cebuano', 'Cebuano'), ('Hamtikanon', 'Hamtikanon'), ('Hiligaynon,Ilonggo', 'Hiligaynon,Ilonggo'), ('Ibaloi/Inibaloi', 'Ibaloi/Inibaloi'), ('Ibanag', 'Ibanag'), ('Ibontoc', 'Ibontoc'), ('Ifugao', 'Ifugao'), ('Kalanguya/Ikalahan', 'Kalanguya/Ikalahan'), ('Ilocano', 'Ilocano'), ('Iranon', 'Iranon'), ('Itneg', 'Itneg'), ('Kalinga', 'Kalinga'), ('Kankanai/Kankanaey', 'Kankanai/Kankanaey'), ('Kapampangan', 'Kapampangan'), ('Karao', 'Karao'), ('Kinalinga', 'Kinalinga'), ('Kiniray-a', 'Kiniray-a'), ('Maranao', 'Maranao'), ('Masbateno/Masbatean', 'Masbateno/Masbatean'), ('Pangasinan/Panggalato', 'Pangasinan/Panggalato'), ('Surigaonon', 'Surigaonon'), ('Tagalog', 'Tagalog'), ('Tausug', 'Tausug'), ('Waray', 'Waray'), ('Other Local Ethnicity', 'Other Local Ethnicity'), ('Chinese', 'Chinese'), ('American/English', 'American/English'), ('Other Foreign Ethnicity', 'Other Foreign Ethnicity'), ('Not Reported', 'Not Reported')], default='Not specified', max_length=200),
        ),
        migrations.AlterField(
            model_name='forms',
            name='temporary',
            field=models.CharField(choices=[('permanent', 'Permanent'), ('temporary', 'Temporary')], default='', max_length=30),
        ),
    ]
