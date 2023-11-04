from django.db import models
from datetime import datetime

housing_CHOICES = (
    ('Permanent', 'Permanent'),
    ('Transient', 'Transient'),

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
    ('Balangao/Baliwon', 'Balangao/Baliwon'),
    ('Bikol/Bicol', 'Bikol/Bicol'),
    ('Bisaya/Binisaya', 'Bisaya/Binisaya'),
    ('Bontok/Binontok', 'Bontok/Binontok'),
    ('Cebuano', 'Cebuano'),
    ('Hamtikanon', 'Hamtikanon'),
    ('Hiligaynon,Ilonggo', 'Hiligaynon,Ilonggo'),
    ('Ibaloi/Inibaloi', 'Ibaloi/Inibaloi'),
    ('Ibanag', 'Ibanag'),
    ('Ibontoc', 'Ibontoc'),
    ('Ifugao', 'Ifugao'),
    ('Kalanguya/Ikalahan', 'Kalanguya/Ikalahan'),
    ('Ilocano', 'Ilocano'),
    ('Iranon', 'Iranon'),
    ('Itneg', 'Itneg'),
    ('Kalinga', 'Kalinga'),
    ('Kankanai/Kankanaey', 'Kankanai/Kankanaey'),
    ('Kapampangan', 'Kapampangan'),
    ('Karao', 'Karao'),
    ('Kinalinga', 'Kinalinga'),
    ('Kiniray-a', 'Kiniray-a'),
    ('Maranao', 'Maranao'),
    ('Masbateno/Masbatean', 'Masbateno/Masbatean'),
    ('Pangasinan/Panggalato', 'Pangasinan/Panggalato'),
    ('Surigaonon', 'Surigaonon'),
    ('Tagalog', 'Tagalog'),
    ('Tausug', 'Tausug'),
    ('Waray', 'Waray'),
    ('Other Local Ethnicity', 'Other Local Ethnicity'),
    ('Chinese', 'Chinese'),
    ('American/English', 'American/English'),
    ('Other Foreign Ethnicity', 'Other Foreign Ethnicity'),
    ('Not Reported', 'Not Reported'),
)
barangay_choices = (
    ("Alapang", "Alapang"),
    ("Alno", "Alno"),
    ("Ambiong", "Ambiong"),
    ("Balili", "Balili"),
    ("Bahong", "Bahong"),
    ("Beckel", "Beckel"),
    ("Betag", "Betag"),
    ("Bineng", "Bineng"),
    ("Cruz", "Cruz"),
    ("Lubas", "Lubas"),
    ("Pico", "Pico"),
    ("Poblacion", "Poblacion"),
    ("Puguis", "Puguis"),
    ("Shilan", "Shilan"),
    ("Tawang", "Tawang"),
    ("Wangal", "Wangal"),
)

class PrimaryChild(models.Model):
    id = models.AutoField(primary_key=True)
    fullName = models.CharField(max_length=255)
    address = models.CharField(max_length=255, default='Not specified')
    pt = models.CharField(max_length=30, choices=housing_CHOICES, default='')
    gender = models.CharField(
        max_length=10, choices=gender_choices, default='Not specified')
    birthdate = models.DateField(null=True, blank=True)
    aim = models.IntegerField(default=0)
    parentName = models.CharField(max_length=255, default='Unknown')
    occupation = models.CharField(max_length=255, default='Unknown')
    relationship = models.CharField(
        max_length=200, choices=relationship_choices, default='Not specified')
    ethnicity = models.CharField(
        max_length=200, choices=ethnicity_choices, default='Not specified')
   
    barangay = models.CharField(
        max_length=200, choices=barangay_choices, default='Not specified')
    
class ChildHealthInfo(models.Model):
    childHealth_id = models.AutoField(primary_key=True)
    dow = models.DateField(null=True, blank=True)
    weight = models.FloatField(default=0)
    height = models.FloatField(default=0)
    muac = models.FloatField(default=0)
    purga = models.DateField(null=True, blank=True)
    vac = models.DateField(null=True, blank=True)
    bpe = models.CharField(max_length=10, choices=bpe_choices, default='no')
    disability = models.CharField(max_length=50, blank=True, default='')
    child = models.ForeignKey(PrimaryChild, on_delete=models.CASCADE)
    quarter = models.CharField(max_length=20, default='firstquarter')
    year = models.IntegerField(null=True, blank=True)  # Add a year field

    def save(self, *args, **kwargs):
        # Calculate the quarter based on the dow field
        if self.dow:
            if self.dow.month in [1, 2, 3]:
                self.quarter = 'firstquarter'
            elif self.dow.month in [4, 5, 6]:
                self.quarter = 'secondquarter'
            elif self.dow.month in [7, 8, 9]:
                self.quarter = 'thirdquarter'
            elif self.dow.month in [10, 11, 12]:
                self.quarter = 'fourthquarter'
            
            # Calculate the year based on the birthdate of the child
            if self.child.birthdate:
                birth_year = self.child.birthdate.year
                self.year = birth_year

        super(ChildHealthInfo, self).save(*args, **kwargs)