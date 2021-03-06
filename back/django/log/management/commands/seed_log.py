import random
from django.core.management.base import BaseCommand
from django_seed import Seed
from sensor.models import Sensor
from log.models import Log

global log_seeder
log_seeder = Seed.seeder()


class Command(BaseCommand):
    help = "Seed -n <number>"

    def add_arguments(self, parser):
        parser.add_argument(
            "--number",
            type=int,
            help="How many log to seed?"
        )

    def handle(self, *args, **options):
        number = options.get("number")
        sensor = Sensor.objects.all()
        time = ["0600", "0605", "0610", "0615", "0620", "0625", "0630", "0635", "0640", "0645", "0650", "0655",
                "0700","0705","0710","0715","0720","0725","0730","0735","0740","0745","0750","0755",
                "0800","0805","0810","0815","0820", "0825", "0830", "0835", "0840", "0845", "0850", "0855",
                "0900", "0905", "0910", "0915", "0920", "0925", "0930", "0935", "0940", "0945", "0950", "0955",
                "1000", "1005", "1010", "1015", "1020", "1025", "1030", "1035", "1040", "1045", "1050", "1055",
                "1100", "1105", "1110", "1115", "1120", "1125", "1130", "1135", "1140", "1145", "1150", "1155",
                "1200", "1205", "1210", "1215", "1220", "1225", "1230", "1235", "1240", "1245", "1250", "1255",
                "1300", "1305", "1310", "1315", "1320", "1325", "1330", "1335", "1340", "1345", "1350", "1355",
                "1400", "1405", "1410", "1415", "1420", "1425", "1430", "1435", "1440", "1445", "1450", "1455",
                "1500", "1505", "1510", "1515", "1520", "1525", "1530", "1535", "1540", "1545", "1550", "1555",
                "1600", "1605", "1610", "1615", "1620", "1625", "1630", "1635", "1640", "1645", "1650", "1655",
                "1700", "1705", "1710", "1715", "1720", "1725", "1730", "1735", "1740", "1745", "1750", "1755",
                "1800", "1805", "1810", "1815", "1820", "1825", "1830", "1835", "1840", "1845", "1850", "1855",
                "1900", "1905", "1910", "1915", "1920", "1925", "1930", "1935", "1940", "1945", "1950", "1955",
                "2000", "2005", "2010", "2015", "2020", "2025", "2030", "2035", "2040", "2045", "2050", "2055",
                "2100",
                ]
        log_seeder.add_entity(
            Log,
            number * 10,
            {
                "sensor_id": lambda x: random.choice(sensor),
                "masked": lambda x: random.randint(1, 30),
                "unmasked": lambda x: random.randint(1, 30),
                "time": lambda x: random.choice(time),
            },
        )
        log_seeder.execute()

        self.stdout.write(self.style.SUCCESS("Seed log Complete"))