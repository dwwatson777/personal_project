from rest_framework.serializers import ModelSerializer
from sportsbook_app.models import Bet, UserAccount

class BetSerializer(ModelSerializer):
    class Meta:
        model = Bet
        fields = ["id", "home_team", "away_team", "type", "bet_choice", "odds", "sports_book", "amount_bet", "user"]
        
class UserAccountSerializer(ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ["total", "user"]