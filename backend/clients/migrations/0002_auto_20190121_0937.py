# Generated by Django 2.1.5 on 2019-01-21 09:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='business',
            field=models.CharField(max_length=128),
        ),
        migrations.AlterField(
            model_name='client',
            name='name',
            field=models.CharField(max_length=128),
        ),
        migrations.AlterField(
            model_name='client',
            name='phone',
            field=models.CharField(max_length=15),
        ),
    ]
