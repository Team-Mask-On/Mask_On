import random
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
            help="How many log to seed?"
        )

    def handle(self, *args, **options):
        number = options.get("number")
        sensor = Sensor.objects.all()
        average = AverageLog.objects.all()
        log_seeder = Seed.seeder()
        log_seeder.add_entity(
            Log,
            number * 10,
            {
                "sensor_id": lambda x: random.choice(sensor),
                "masked": lambda x: random.randint(1, 30),
                "unmasked": lambda x: random.randint(1, 30),
                "average_id": lambda x: random.randint(1, 10),
                "time": lambda x: str(log_seeder.faker.pyint(min_value=0000, max_value=2355, step=5))
            },
        )
        log_seeder.execute()

        self.stdout.write(self.style.SUCCESS("Seed log Complete"))