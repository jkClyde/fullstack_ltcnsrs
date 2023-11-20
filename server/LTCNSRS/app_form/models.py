from django.db import models
from datetime import datetime

housing_CHOICES = (
    ('Permanent', 'Permanent'),
    ('Transient', 'Transient'),

)

gender_choices = (
    ('Male', 'Male'),
    ('Female', 'Female'),
    (' M', 'Male'),
    ('M ', 'Male'),
    (' F', 'Female'),
    ('F ', 'Female'),
)
bpe_choices = (
    ('Yes', 'Yes'),
    ('No', 'No')
)
vac_choices = (
    ('Yes', 'Yes'),
    ('No', 'No')
)
deworming_choices = (
    ('Yes', 'Yes'),
    ('No', 'No')
)
relationship_choices = (
    ('Mother', 'Mother'),
    ('Father', 'Father'),
    ('Guardian', 'Guardian'),
    ('', 'not specified')
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
        max_length=200, default='Not specified')
    barangay = models.CharField(
        max_length=200, choices=barangay_choices, default='Not specified')
    archive = models.BooleanField(default=False) 
    
    def save(self, *args, **kwargs):
        # Check for duplicates based on fullName, birthdate, and barangay
        duplicates = PrimaryChild.objects.filter(
            fullName=self.fullName,
            birthdate=self.birthdate,
        ).exclude(id=self.id)

        if duplicates.exists():
            raise ValueError("Duplicate entry found.")
        if self.birthdate:
            today = datetime.now().date()
            age = (today.year - self.birthdate.year) * 12 + today.month - self.birthdate.month
            self.aim = age
            
        if self.aim > 60:
            self.archive = True
        else:
            self.archive = False

        super(PrimaryChild, self).save(*args, **kwargs)

class ChildHealthInfo(models.Model):
    childHealth_id = models.AutoField(primary_key=True)
    dow = models.DateField(null=True, blank=True)
    weight = models.FloatField(default=0)
    height = models.FloatField(default=0)
    muac = models.FloatField(default=0)
    vac = models.CharField(max_length=10, choices=vac_choices, default='No')
    deworming = models.CharField(max_length=10, choices=deworming_choices, default='No')
    bpe = models.CharField(max_length=10, choices=bpe_choices, default='No')
    disability = models.CharField(max_length=50, blank=True, default='')
    child = models.ForeignKey(PrimaryChild, on_delete=models.CASCADE)
    quarter = models.CharField(max_length=20, default='1st Quarter')
    year = models.IntegerField(null=True, blank=True)  # Add a year field
    getYear = models.IntegerField(null=True, blank=True)  
    weightForAge = models.CharField(max_length=50, blank=True, default='')
    weightForLength = models.CharField(max_length=50, blank=True, default='')
    lengthforAge = models.CharField(max_length=50, blank=True, default='')
    def save(self, *args, **kwargs):
        # Calculate the quarter based on the dow field
        if self.dow:
            if self.dow.month in [1, 2, 3]:
                self.quarter = '1st Quarter'
            elif self.dow.month in [4, 5, 6]:
                self.quarter = '2nd Quarter'
            elif self.dow.month in [7, 8, 9]:
                self.quarter = '3rd Quarter'
            elif self.dow.month in [10, 11, 12]:
                self.quarter = '4th Quarter'
            if self.dow.year:
                get_year = self.dow.year
                self.getYear = get_year

            # Calculate the year based on the birthdate of the child
            if self.child.birthdate:
                birth_year = self.child.birthdate.year
                self.year = birth_year

        super(ChildHealthInfo, self).save(*args, **kwargs)

class DuplicateChild(models.Model):
    id = models.AutoField(primary_key=True)
    full_name = models.CharField(max_length=255)
    first_barangay = models.CharField(max_length=255)
    second_barangay = models.CharField(max_length=255)

    