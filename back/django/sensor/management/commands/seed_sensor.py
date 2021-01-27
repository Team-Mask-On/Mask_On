import random
from django.core.management.base import BaseCommand
from django_seed import Seed
from faker import Faker
from sensor.models import Sensor



class Command(BaseCommand):

    help = "Seed -n <number>"

    def add_arguments(self, parser):
        parser.add_argument(
            "--number",
            type=int,
            help="How many sensors to seed?"
        )

    def handle(self, *args, **options):
        fake = Faker(['ko_KR'])
        number = options.get("number")
        sensor_seeder = Seed.seeder()
        sensor_seeder.add_entity(
            Sensor,
            number,
            {
                "sensor_id": lambda x: sensor_seeder.faker.bothify(text='????######'),
                "name": lambda x: fake.address(),
                "description": lambda x: fake.street_address(),
                "address": lambda x: fake.address_detail(),
                "max_capacity": lambda x: random.randint(1, 30),
                "latitude": lambda x: sensor_seeder.faker.latitude(),
                "longitude": lambda x: sensor_seeder.faker.longitude(),
            },
        )
        sensor_seeder.execute()

        self.stdout.write(self.style.SUCCESS("Seed Sensor Complete"))