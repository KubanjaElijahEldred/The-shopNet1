from django.urls import path
from .views import CreateFeedbackView, FeedbackListView, FeedbackStatsView

urlpatterns = [
    path('submit/', CreateFeedbackView.as_view()),
    path('list/', FeedbackListView.as_view()),
    path('stats/', FeedbackStatsView.as_view()),
]
