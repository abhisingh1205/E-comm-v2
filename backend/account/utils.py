from django.core.mail import EmailMessage
from django.db.models.signals import post_save
import os

class Util:
    @staticmethod
    def send_email(data):
        email = EmailMessage(
            subject=data['email_subject'],
            body=data['body'],
            from_email= os.environ.get('EMAIL_FROM'),
            to=[data['to_email']]
        )

        email.send()