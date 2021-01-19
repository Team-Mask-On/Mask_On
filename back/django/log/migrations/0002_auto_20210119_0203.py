# Generated by Django 3.1.5 on 2021-01-19 02:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('log', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AverageLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.TimeField(auto_now_add=True)),
                ('masked', models.IntegerField()),
                ('unmasked', models.IntegerField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.RemoveField(
            model_name='log',
            name='log_id',
        ),
    ]
