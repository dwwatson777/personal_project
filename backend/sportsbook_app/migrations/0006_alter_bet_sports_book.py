# Generated by Django 3.2.9 on 2021-12-16 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sportsbook_app', '0005_alter_bet_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bet',
            name='sports_book',
            field=models.CharField(blank=True, choices=[('williamhill_us', 'William Hill (US)'), ('foxbet', 'FOX Bet'), ('fanduel', 'FanDuel')], max_length=255, null=True),
        ),
    ]