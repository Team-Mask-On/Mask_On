# Generated by Django 3.1.5 on 2021-01-20 13:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('log', '0002_auto_20210120_1135'),
    ]

    operations = [
        migrations.AlterField(
            model_name='log',
            name='average',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='log.averagelog'),
        ),
    ]