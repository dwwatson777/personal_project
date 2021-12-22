from django.shortcuts import render
from sportsbook_app.serializers import BetSerializer, UserAccountSerializer
from sportsbook_app.models import Bet, UserAccount
from rest_framework.viewsets import ModelViewSet

class BetViewSet(ModelViewSet):
    # queryset = Bet.objects.all()
    serializer_class = BetSerializer
    
    def get_queryset(self):
        user = self.request.user
        return Bet.objects.filter(user=user)
    
class UserAccountViewSet(ModelViewSet):
    # queryset = UserAccount.objects.all()
    serializer_class = UserAccountSerializer
    
    def get_queryset(self):
        user = self.request.user
        return UserAccount.objects.filter(user=user)
    
