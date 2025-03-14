from celery import Celery
import os

celery = Celery(
    'holy_hack',
    broker=os.getenv('CELERY_BROKER_URL'),
    backend=os.getenv('CELERY_RESULT_BACKEND')
)

# Since the build context is already in the backend folder,
# import the local module directly.
import handle_file  # Make sure handle_file.py exists in the same directory

celery.autodiscover_tasks(['handle_file'])
