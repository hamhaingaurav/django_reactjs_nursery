# Generated by Django 3.1.4 on 2021-05-05 09:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20210505_1451'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='updated_on',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='order',
            name='updated_on',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='plants',
            field=models.ManyToManyField(blank=True, to='core.Plant'),
        ),
    ]