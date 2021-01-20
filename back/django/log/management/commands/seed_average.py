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
        sensor = Sensor.objects.all()
        average_log_seeder = Seed.seeder()
        average_log_seeder.add_entity(
            AverageLog,
            number * 15,
            {
                "created_time": lambda x: datetime.now(),
                "sensor_id": lambda x: random.choice(sensor),
                "average_masked": lambda x: average_log_seeder.faker.pyint(min_value=1, max_value=30),
                "average_unmasked": lambda x: average_log_seeder.faker.pyint(min_value=1, max_value=30)
            },
        )
        average_log_seeder.execute()

        self.stdout.write(self.style.SUCCESS("Seed average log Complete"))