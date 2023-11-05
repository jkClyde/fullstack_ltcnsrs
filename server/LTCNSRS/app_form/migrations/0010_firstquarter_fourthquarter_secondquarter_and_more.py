# Generated by Django 4.2.3 on 2023-11-04 09:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_form', '0009_quarter_year_remove_childhealthinfo_child_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='firstQuarter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dow', models.DateField(blank=True, null=True)),
                ('weight', models.FloatField(default=0)),
                ('height', models.FloatField(default=0)),
                ('muac', models.FloatField(default=0)),
                ('purga', models.DateField(blank=True, null=True)),
                ('vac', models.DateField(blank=True, null=True)),
                ('bpe', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], default='no', max_length=10)),
                ('disability', models.CharField(blank=True, default='', max_length=50)),
                ('child_id', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='app_form.primarychild')),
            ],
        ),
        migrations.CreateModel(
            name='fourthQuarter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dow', models.DateField(blank=True, null=True)),
                ('weight', models.FloatField(default=0)),
                ('height', models.FloatField(default=0)),
                ('muac', models.FloatField(default=0)),
                ('purga', models.DateField(blank=True, null=True)),
                ('vac', models.DateField(blank=True, null=True)),
                ('bpe', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], default='no', max_length=10)),
                ('disability', models.CharField(blank=True, default='', max_length=50)),
                ('child_id', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='app_form.primarychild')),
            ],
        ),
        migrations.CreateModel(
            name='secondQuarter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dow', models.DateField(blank=True, null=True)),
                ('weight', models.FloatField(default=0)),
                ('height', models.FloatField(default=0)),
                ('muac', models.FloatField(default=0)),
                ('purga', models.DateField(blank=True, null=True)),
                ('vac', models.DateField(blank=True, null=True)),
                ('bpe', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], default='no', max_length=10)),
                ('disability', models.CharField(blank=True, default='', max_length=50)),
                ('child_id', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='app_form.primarychild')),
            ],
        ),
        migrations.CreateModel(
            name='thirdQuarter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dow', models.DateField(blank=True, null=True)),
                ('weight', models.FloatField(default=0)),
                ('height', models.FloatField(default=0)),
                ('muac', models.FloatField(default=0)),
                ('purga', models.DateField(blank=True, null=True)),
                ('vac', models.DateField(blank=True, null=True)),
                ('bpe', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], default='no', max_length=10)),
                ('disability', models.CharField(blank=True, default='', max_length=50)),
                ('child_id', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='app_form.primarychild')),
            ],
        ),
        migrations.DeleteModel(
            name='ChildHealthInfo',
        ),
        migrations.DeleteModel(
            name='Quarter',
        ),
        migrations.DeleteModel(
            name='Year',
        ),
    ]