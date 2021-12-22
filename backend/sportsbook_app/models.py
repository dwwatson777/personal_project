from django.db import models
from django.contrib.auth.models import User
    

class Bet(models.Model):
    home_team = models.CharField(max_length=255, null=True)
    away_team = models.CharField(max_length=255, null=True)
    type_choice = (
        ('h2h', 'h2h'),
        ('spreads', 'spreads'),
        ('totals', 'totals'),
    )
    type = models.CharField(max_length=255, blank=True, null=True, choices=type_choice)
    bet_choice = models.CharField(max_length=255, null=True)
    odds = models.CharField(max_length=255, null=True)
    sports_book_choice = (
        ("William Hill (US)", "William Hill (US)"),
        ("FOX Bet", "FOX Bet"),
        ("FanDuel", "FanDuel"),
    )
    sports_book = models.CharField(max_length=255, blank=True, null=True, choices=sports_book_choice)
    amount_bet = models.CharField(max_length=255)
    user = models.ForeignKey(User, related_name="bets", on_delete=models.CASCADE)

    def __str__(self):
        return f' Game: {self.away_team} vs. {self.home_team} | Type of Bet: {self.type} | Amount Bet: {self.amount_bet}'
    
class UserAccount(models.Model):
    total = models.CharField(max_length=255)
    user = models.OneToOneField(User, related_name="account", on_delete=models.CASCADE, primary_key=True)
    
    def __str__(self):
        return f'ID: {self.user} | Account Total: {self.total}'