# Generated by Django 4.2.3 on 2023-12-09 04:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0002_alter_primarychild_caregiverage_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='primarychild',
            name='caregiverAge',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='caregiverContact',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='caregiverEthnicity',
            field=models.CharField(blank=True, choices=[('OTHERS', 'Others'), ('AGGAY', 'AGGAY'), ('AKEANON/AKLANON', 'Akeanon/Aklanon'), ('APAYAO/YAPAYAO', 'Apayao/Yapayao'), ('AYANGAN', 'Ayangan'), ('BALANGAO/BALIWON', 'Balangao/Baliwon'), ('BIKOL/BICOL', 'Bikol/Bicol'), ('BISAYA/BINISAYA', 'Bisaya/Binisaya'), ('BONTOK/BINONTOK', 'Bontok/Binontok'), ('CEBUANO', 'Cebuano'), ('HAMTIKANON', 'Hamtikanon'), ('HILIGAYNON,ILONGGO', 'Hiligaynon,Ilonggo'), ('IBALOI/INIBALOI', 'Ibaloi/Inibaloi'), ('IBANAG', 'Ibanag'), ('IBONTOC', 'Ibontoc'), ('IFUGAO', 'Ifugao'), ('KALANGUYA/IKALAHAN', 'Kalanguya/Ikalahan'), ('ILOCANO', 'Ilocano'), ('IRANON', 'Iranon'), ('ITNEG', 'Itneg'), ('KALINGA', 'Kalinga'), ('KANKANAI/KANKANAEY', 'Kankanai/Kankanaey'), ('KAPAMPANGAN', 'Kapampangan'), ('KARAO', 'Karao'), ('KINALINGA', 'Kinalinga'), ('KINIRAY-A', 'Kiniray-a'), ('MARANAO', 'Maranao'), ('MASBATENO/MASBATEAN', 'Masbateno/Masbatean'), ('PANGASINAN/PANGGALATO', 'Pangasinan/Panggalato'), ('SURIGAONON', 'Surigaonon'), ('TAGALOG', 'Tagalog'), ('TAUSUG', 'Tausug'), ('WARAY', 'Waray')], default='Not specified', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='caregiverFirstName',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='caregiverMiddleName',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='caregiverOccupation',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='caregiverRelationship',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='caregiverReligion',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='caregiverSurname',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='fatherAge',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='fatherContact',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='fatherEthnicity',
            field=models.CharField(blank=True, choices=[('OTHERS', 'Others'), ('AGGAY', 'AGGAY'), ('AKEANON/AKLANON', 'Akeanon/Aklanon'), ('APAYAO/YAPAYAO', 'Apayao/Yapayao'), ('AYANGAN', 'Ayangan'), ('BALANGAO/BALIWON', 'Balangao/Baliwon'), ('BIKOL/BICOL', 'Bikol/Bicol'), ('BISAYA/BINISAYA', 'Bisaya/Binisaya'), ('BONTOK/BINONTOK', 'Bontok/Binontok'), ('CEBUANO', 'Cebuano'), ('HAMTIKANON', 'Hamtikanon'), ('HILIGAYNON,ILONGGO', 'Hiligaynon,Ilonggo'), ('IBALOI/INIBALOI', 'Ibaloi/Inibaloi'), ('IBANAG', 'Ibanag'), ('IBONTOC', 'Ibontoc'), ('IFUGAO', 'Ifugao'), ('KALANGUYA/IKALAHAN', 'Kalanguya/Ikalahan'), ('ILOCANO', 'Ilocano'), ('IRANON', 'Iranon'), ('ITNEG', 'Itneg'), ('KALINGA', 'Kalinga'), ('KANKANAI/KANKANAEY', 'Kankanai/Kankanaey'), ('KAPAMPANGAN', 'Kapampangan'), ('KARAO', 'Karao'), ('KINALINGA', 'Kinalinga'), ('KINIRAY-A', 'Kiniray-a'), ('MARANAO', 'Maranao'), ('MASBATENO/MASBATEAN', 'Masbateno/Masbatean'), ('PANGASINAN/PANGGALATO', 'Pangasinan/Panggalato'), ('SURIGAONON', 'Surigaonon'), ('TAGALOG', 'Tagalog'), ('TAUSUG', 'Tausug'), ('WARAY', 'Waray')], default='Not specified', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='fatherFirstName',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='fatherMiddleName',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='fatherOccupation',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='fatherReligion',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='fatherSurname',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='motherAge',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='motherContact',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='motherEthnicity',
            field=models.CharField(blank=True, choices=[('OTHERS', 'Others'), ('AGGAY', 'AGGAY'), ('AKEANON/AKLANON', 'Akeanon/Aklanon'), ('APAYAO/YAPAYAO', 'Apayao/Yapayao'), ('AYANGAN', 'Ayangan'), ('BALANGAO/BALIWON', 'Balangao/Baliwon'), ('BIKOL/BICOL', 'Bikol/Bicol'), ('BISAYA/BINISAYA', 'Bisaya/Binisaya'), ('BONTOK/BINONTOK', 'Bontok/Binontok'), ('CEBUANO', 'Cebuano'), ('HAMTIKANON', 'Hamtikanon'), ('HILIGAYNON,ILONGGO', 'Hiligaynon,Ilonggo'), ('IBALOI/INIBALOI', 'Ibaloi/Inibaloi'), ('IBANAG', 'Ibanag'), ('IBONTOC', 'Ibontoc'), ('IFUGAO', 'Ifugao'), ('KALANGUYA/IKALAHAN', 'Kalanguya/Ikalahan'), ('ILOCANO', 'Ilocano'), ('IRANON', 'Iranon'), ('ITNEG', 'Itneg'), ('KALINGA', 'Kalinga'), ('KANKANAI/KANKANAEY', 'Kankanai/Kankanaey'), ('KAPAMPANGAN', 'Kapampangan'), ('KARAO', 'Karao'), ('KINALINGA', 'Kinalinga'), ('KINIRAY-A', 'Kiniray-a'), ('MARANAO', 'Maranao'), ('MASBATENO/MASBATEAN', 'Masbateno/Masbatean'), ('PANGASINAN/PANGGALATO', 'Pangasinan/Panggalato'), ('SURIGAONON', 'Surigaonon'), ('TAGALOG', 'Tagalog'), ('TAUSUG', 'Tausug'), ('WARAY', 'Waray')], default='Not specified', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='motherFirstName',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='motherMiddleName',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='motherOccupation',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='motherReligion',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='primarychild',
            name='motherSurname',
            field=models.CharField(blank=True, default='Unknown', max_length=255, null=True),
        ),
    ]
