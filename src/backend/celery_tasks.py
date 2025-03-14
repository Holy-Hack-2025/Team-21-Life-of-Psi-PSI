from celery import Celery
import os

celery = Celery('holy_hack',
                broker=os.getenv('CELERY_BROKER_URL',),
                backend=os.getenv('CELERY_RESULT_BACKEND'))

celery.autodiscover_tasks(['backend.handle_file'])
