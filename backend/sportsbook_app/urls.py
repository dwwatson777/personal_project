from django.urls import path
from rest_framework.routers import DefaultRouter
from sportsbook_app.views import BetViewSet, UserAccountViewSet

r = DefaultRouter()
r.register(r"bets", BetViewSet, basename="bets")
r.register(r"useraccount", UserAccountViewSet, basename="useraccount")
urlpatterns = r.urls

