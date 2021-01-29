import random
from datetime import datetime
from django.core.management.base import BaseCommand
from django_seed import Seed
from sensor.models import Sensor
from log.models import Log, AverageLog


class Command(BaseCommand):

    help = "Seed -n <number>"

    def add_arguments(self, parser):
        parser.add_argument(
            "--number",
            type=int,
            help="How many db to seed?"
        )

    def handle(self, *args, **options):
        number = options.get("number")
        sensor_seeder = Seed.seeder()
        sensor_seeder.add_entity(
            Sensor,
            number,
            {
                "sensor_id": lambda x: sensor_seeder.faker.bothify(text='????######'),
                "name": lambda x: sensor_seeder.faker.street_address(),
                "description": lambda x: sensor_seeder.faker.street_address(),
                "address": lambda x: sensor_seeder.faker.street_address(),
                "max_capacity": lambda x: random.randint(1, 30),
                "latitude": lambda x: sensor_seeder.faker.latitude(),
                "longitude": lambda x: sensor_seeder.faker.longitude(),
            },
        )
        sensor_seeder.execute()

        sensor = Sensor.objects.all()
        log_seeder = Seed.seeder()
        log_seeder.add_entity(
            Log,
            number * 10,
            {
                "sensor_id": lambda x: random.choice(sensor),
                "masked": lambda x: random.randint(1, 30),
                "unmasked": lambda x: random.randint(1, 30),
            },
        )
        log_seeder.execute()

        average_log_seeder = Seed.seeder()
        average_log_seeder.add_entity(
            AverageLog,
            number * 15,
            {
                "created_time": lambda x: datetime.now(),
                "sensor_id": lambda x: random.choice(sensor),
                "average": lambda x: average_log_seeder.faker.pyint(min_value=1, max_value=30)
            },
        )
        average_log_seeder.execute()

        self.stdout.write(self.style.SUCCESS("Seed Complete"))