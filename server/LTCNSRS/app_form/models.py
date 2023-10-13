from django.db import models

housing_CHOICES = (
    ('Permanent','Permanent'),
    ('Temporary', 'Temporary'),

)

gender_choices = (
    ('Male', 'Male'),
    ('Female', 'Female'),
)
bpe_choices = (
    ('Yes', 'Yes'),
    ('No', 'No')
)
relationship_choices = (
    ('Mother', 'Mother'),
    ('Father', 'Father'),
    ('Guardian', 'Guardian')
)
ethnicity_choices = (
    ('Aggay', 'Aggay'),
    ('Akeanon/Aklanon', 'Akeanon/Aklanon'),
    ('Apayao/Yapayao', 'Apayao/Yapayao'),
    ('Ayangan', 'Ayangan'),
    ('Balangao/Baliwon','Balangao/Baliwon'),
    ('Bikol/Bicol','Bikol/Bicol'),
    ('Bisaya/Binisaya','Bisaya/Binisaya'),
    ('Bontok/Binontok','Bontok/Binontok'),
    ('Cebuano','Cebuano'),
    ('Hamtikanon','Hamtikanon'),
    ('Hiligaynon,Ilonggo','Hiligaynon,Ilonggo'),
    ('Ibaloi/Inibaloi','Ibaloi/Inibaloi'),
    ('Ibanag','Ibanag'),
    ('Ibontoc','Ibontoc'),
    ('Ifugao','Ifugao'),
    ('Kalanguya/Ikalahan','Kalanguya/Ikalahan'),
    ('Ilocano','Ilocano'),
    ('Iranon','Iranon'),
    ('Itneg','Itneg'),
    ('Kalinga','Kalinga'),
    ('Kankanai/Kankanaey','Kankanai/Kankanaey'),
    ('Kapampangan','Kapampangan'),
    ('Karao','Karao'),
    ('Kinalinga','Kinalinga'),
    ('Kiniray-a','Kiniray-a'),
    ('Maranao','Maranao'),
    ('Masbateno/Masbatean','Masbateno/Masbatean'),
    ('Pangasinan/Panggalato','Pangasinan/Panggalato'),
    ('Surigaonon','Surigaonon'),
    ('Tagalog','Tagalog'),
    ('Tausug','Tausug'),
    ('Waray','Waray'),
    ('Other Local Ethnicity','Other Local Ethnicity'),
    ('Chinese','Chinese'),
    ('American/English', 'American/English'),
    ('Other Foreign Ethnicity','Other Foreign Ethnicity'),
    ('Not Reported', 'Not Reported'),
)
barangay_choices = (
    ("Alapang","Alapang"),
    ("Alno","Alno"),
    ("Ambiong","Ambiong"),
    ("Balili","Balili"),
    ("Bahong","Bahong"),
    ("Beckel","Beckel"),
    ("Betag","Betag"),
    ("Bineng","Bineng"),
    ("Cruz","Cruz"),
    ("Lubas","Lubas"),
    ("Pico","Pico"),
    ("Poblacion","Poblacion"),
    ("Puguis","Puguis"),
    ("Shilan","Shilan"),
    ("Tawang","Tawang"),
    ("Wangal","Wangal"),
)
class Forms(models.Model):
    id = models.AutoField(primary_key=True)  # Add an 'id' field as the primary key
    firstName = models.CharField(max_length=255)
    middleName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    address = models.CharField(max_length=255, default='Not specified')
    pt = models.CharField(max_length=30, choices=housing_CHOICES, default='')
    gender = models.CharField(max_length=10, choices=gender_choices, default='Not specified')
    birthdate = models.DateField(null=True, blank=True)
    bpe = models.CharField(max_length=10, choices=bpe_choices, default='no')
    disability = models.CharField(max_length=50, blank=True, default='')
    parentName = models.CharField(max_length=255, default='Unknown')
    occupation = models.CharField(max_length=255, default='Unknown')
    relationship = models.CharField(max_length=200, choices=relationship_choices, default='Not specified')
    ethnicity = models.CharField(max_length=200, choices=ethnicity_choices, default='Not specified')
    dow = models.DateField(null=True, blank=True)
    weight = models.FloatField(max_length=255,default= 0)
    height = models.FloatField(max_length=255,default= 0)
    muac = models.FloatField(max_length=255, default=0)
    purga = models.DateField(null=True, blank=True)
    vac = models.DateField(null=True, blank=True)
    barangay = models.CharField(max_length=200, choices=barangay_choices, default='Not specified')

