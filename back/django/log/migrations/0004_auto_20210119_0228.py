# Generated by Django 3.1.5 on 2021-01-19 02:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('log', '0003_averagelog_sensor_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='averagelog',
            old_name='created',
            new_name='created_time',
        ),
    ]
