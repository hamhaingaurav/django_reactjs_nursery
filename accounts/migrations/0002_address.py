# Generated by Django 3.2.1 on 2021-06-02 16:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_auto_20210602_2211'),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('shipping_adress', models.TextField()),
                ('pin_code', models.CharField(max_length=50)),
                ('main_contact', phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None)),
                ('alternate_contact', phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None)),
                ('country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.country')),
                ('state', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.state')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
