from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count, Q, Case, When, IntegerField
from .models import Feedback
from .serializers import FeedbackSerializer

class CreateFeedbackView(generics.CreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

class FeedbackListView(generics.ListAPIView):
    queryset = Feedback.objects.all().order_by('-created_at')
    serializer_class = FeedbackSerializer

class FeedbackStatsView(APIView):
    def get(self, request):
        stats = Feedback.objects.aggregate(
            total=Count('id'),
            excellent=Count('id', filter=Q(rating='excellent')),
            good=Count('id', filter=Q(rating='good')),
            average=Count('id', filter=Q(rating='average')),
            poor=Count('id', filter=Q(rating='poor')),
        )
        
        department_stats = Feedback.objects.values('department').annotate(
            count=Count('id'),
            avg_rating=Case(
                When(rating='excellent', then=4),
                When(rating='good', then=3),
                When(rating='average', then=2),
                When(rating='poor', then=1),
                default=2,
                output_field=IntegerField(),
            )
        ).order_by('-count')
        
        return Response({
            'overall_stats': stats,
            'department_breakdown': list(department_stats)
        })
