from django.db import models
from datetime import datetime

housing_CHOICES = (
    ('Permanent', 'Permanent'),
    ('Transient', 'Transient'),
)
lengthofstay_choices = (
    ('Year/s','Year/s'),
    ('Month/s','Month/s'),
    ('Week/s','Week/s'),
)
gender_choices = (
    ('Male', 'Male'),
    ('Female', 'Female'),
)
bpe_choices = (
    ('Yes', 'Yes'),
    ('No', 'No')
)
vac_choices = (
    ('Ongoing', 'Ongoing'),
    ('None', 'None'),
    ('FIC','FIC'),
    ('CIC','CIC'),
    ('INC','INC'),
    ('None','None'),
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
ethnicity_choices = (
    ('OTHERS', 'Others'),
    ('AGGAY', 'AGGAY'),
    ('AKEANON/AKLANON', 'Akeanon/Aklanon'),
    ('APAYAO/YAPAYAO', 'Apayao/Yapayao'),
    ('AYANGAN', 'Ayangan'),
    ('BALANGAO/BALIWON', 'Balangao/Baliwon'),
    ('BIKOL/BICOL', 'Bikol/Bicol'),
    ('BISAYA/BINISAYA', 'Bisaya/Binisaya'),
    ('BONTOK/BINONTOK', 'Bontok/Binontok'),
    ('CEBUANO', 'Cebuano'),
    ('HAMTIKANON', 'Hamtikanon'),
    ('HILIGAYNON,ILONGGO', 'Hiligaynon,Ilonggo'),
    ('IBALOI/INIBALOI', 'Ibaloi/Inibaloi'),
    ('IBANAG', 'Ibanag'),
    ('IBONTOC', 'Ibontoc'),
    ('IFUGAO', 'Ifugao'),
    ('KALANGUYA/IKALAHAN', 'Kalanguya/Ikalahan'),
    ('ILOCANO', 'Ilocano'),
    ('IRANON', 'Iranon'),
    ('ITNEG', 'Itneg'),
    ('KALINGA', 'Kalinga'),
    ('KANKANAI/KANKANAEY', 'Kankanai/Kankanaey'),
    ('KAPAMPANGAN', 'Kapampangan'),
    ('KARAO', 'Karao'),
    ('KINALINGA', 'Kinalinga'),
    ('KINIRAY-A', 'Kiniray-a'),
    ('MARANAO', 'Maranao'),
    ('MASBATENO/MASBATEAN', 'Masbateno/Masbatean'),
    ('PANGASINAN/PANGGALATO', 'Pangasinan/Panggalato'),
    ('SURIGAONON', 'Surigaonon'),
    ('TAGALOG', 'Tagalog'),
    ('TAUSUG', 'Tausug'),
    ('WARAY', 'Waray'),
)


disability_choices = (
    ('Cleft Palate', 'Cleft Palate'),
    ('Cerebral Palsy', 'Cerebral Palsy'),
    ('Congenital Heart Disease', 'Congenital Heart Disease'),
    ('Hydrocepalus', 'Hydrocepalus'),
    ('Down Syndrome', 'Down Syndrome'),
    ('Global Development Delay', 'Global Development Delay'),
    ('Others', 'Others'),
)

class PrimaryChild(models.Model):
    id = models.AutoField(primary_key=True)
    fullName = models.CharField(max_length=255)
    surname = models.CharField(max_length=100, default='Not specified')
    firstname = models.CharField(max_length=100, default='Not specified')
    middlename = models.CharField(max_length=100, default='Not specified')
    suffix = models.CharField(max_length=10, blank=True, null=True)
    houseNumberAndStreet = models.CharField(max_length=255, default='Not specified')
    sitio = models.CharField(max_length=255, default='Not specified')
    pt = models.CharField(max_length=30, choices=housing_CHOICES, default='')
    lengthOfStay = models.CharField(max_length=255, default='Not specified')
    lengthOfStayType = models.CharField(
        max_length=100, choices=lengthofstay_choices, default='Not specified')
    gender = models.CharField(
        max_length=100, choices=gender_choices, default='Not specified')
    birthdate = models.DateField(null=True, blank=True)
    aim = models.IntegerField(default=0)
    barangay = models.CharField(
        max_length=200, choices=barangay_choices, default='Not specified')
    birthWeight = models.FloatField(default=0)
    birthOrder = models.CharField(max_length=255, default='Not specified')

    #guardian info - father
    fatherSurname = models.CharField(max_length=255, default='Unknown')
    fatherFirstName =models.CharField(max_length=255, default='Unknown')
    fatherMiddleName = models.CharField(max_length=255, default='Unknown')
    fatherSuffix = models.CharField(max_length=10, blank=True, null=True)
    fatherAge = models.CharField(max_length=255, default='Unknown')
    fatherEthnicity = models.CharField(
        max_length=100, choices=ethnicity_choices, default='Not specified')
    fatherOccupation = models.CharField(max_length=255, default='Unknown')
    fatherReligion = models.CharField(max_length=255, default='Unknown')
    fatherContact = models.CharField(max_length=255, default='Unknown')

    #guardian info - mother --------------------------------------------
    motherSurname = models.CharField(max_length=255, default='Unknown')
    motherFirstName =models.CharField(max_length=255, default='Unknown')
    motherMiddleName = models.CharField(max_length=255, default='Unknown')
    motherAge = models.CharField(max_length=255, default='Unknown')
    motherEthnicity = models.CharField(
        max_length=100, choices=ethnicity_choices, default='Not specified')
    motherOccupation = models.CharField(max_length=255, default='Unknown')
    motherReligion = models.CharField(max_length=255, default='Unknown')
    motherContact = models.CharField(max_length=255, default='Unknown')

    #guardian info - caregiver
    caregiverSurname = models.CharField(max_length=255, default='Unknown')
    caregiverFirstName =models.CharField(max_length=255, default='Unknown')
    caregiverMiddleName = models.CharField(max_length=255, default='Unknown')
    caregiverSuffix = models.CharField(max_length=10, blank=True, null=True)
    caregiverRelationship = models.CharField(max_length=255, default='Unknown')
    caregiverAge = models.CharField(max_length=255, default='Unknown')
    caregiverOccupation = models.CharField(max_length=255, default='Unknown')
    caregiverReligion = models.CharField(max_length=255, default='Unknown')
    caregiverContact = models.CharField(max_length=255, default='Unknown')

    archive = models.BooleanField(default=False) 
    
    class Meta:
        unique_together = [['surname', 'firstname', 'middlename', 'birthdate']]

    def save(self, *args, **kwargs):
        self.fullName = ' '.join(filter(None, [self.firstname, self.middlename, self.surname, self.suffix]))
        super().save(*args, **kwargs)

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

    def __str__(self):
        return self.fullName 
    
class ChildHealthInfo(models.Model):
    childHealth_id = models.AutoField(primary_key=True)
    dow = models.DateField(null=True, blank=True)
    weight = models.FloatField(default=0)
    height = models.FloatField(default=0)
    muac = models.FloatField(default=0)
    vac = models.CharField(max_length=10, choices=vac_choices, default='No')
    deworming = models.CharField(max_length=10, choices=deworming_choices, default='No')
    bpe = models.CharField(max_length=10, choices=bpe_choices, default='No')
    disability = models.CharField(
        max_length=100, choices=disability_choices, default='Not specified')
    child = models.ForeignKey(PrimaryChild, on_delete=models.CASCADE)
    quarter = models.CharField(max_length=20, default='1st Quarter')
    year = models.IntegerField(null=True, blank=True)  # Add a year field
    getYear = models.IntegerField(null=True, blank=True)  
    weightForAge = models.CharField(max_length=50, blank=True, default='')
    weightForLength = models.CharField(max_length=50, blank=True, default='')
    lengthForAge = models.CharField(max_length=50, blank=True, default='')

    #vitamin
    vaccinationRemarks = models.CharField(max_length=100, blank=True, default='')
    vitAOneHTIU = models.DateField(null=True, blank=True)

    #other vita by age
    vitATwoHTIUOneYear = models.DateField(null=True, blank=True)
    vitATwoHTIUOneSixYear = models.DateField(null=True, blank=True)

    vitATwoHTIUTwoYear = models.DateField(null=True, blank=True)
    vitATwoHTIUTwoSixYear = models.DateField(null=True, blank=True)

    vitATwoHTIUThreeYear = models.DateField(null=True, blank=True)
    vitATwoHTIUThreeSixYear = models.DateField(null=True, blank=True)

    vitATwoHTIUFourYear = models.DateField(null=True, blank=True)
    vitATwoHTIUFourSixYear = models.DateField(null=True, blank=True)

    vitATwoHTIUFiveYear = models.DateField(null=True, blank=True)

    #deworming 
    dewormingOneYear = models.DateField(null=True, blank=True)
    dewormingOneSixYear = models.DateField(null=True, blank=True)

    dewormingTwoYear = models.DateField(null=True, blank=True)
    dewormingTwoSixYear = models.DateField(null=True, blank=True)
    
    dewormingThreeYear = models.DateField(null=True, blank=True)
    dewormingThreeSixYear = models.DateField(null=True, blank=True)

    dewormingFourYear = models.DateField(null=True, blank=True)
    dewormingFourSixYear = models.DateField(null=True, blank=True)

    dewormingFiveYear= models.DateField(null=True, blank=True)

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
    isDuplicate = models.BooleanField(default=False)
    