from django.db import models

class Feedback(models.Model):
    SERVICE_CHOICES = [
        ('excellent', 'Excellent'),
        ('good', 'Good'),
        ('average', 'Average'),
        ('poor', 'Poor'),
    ]

    DEPARTMENT_CHOICES = [
        ('emergency', 'Emergency'),
        ('pharmacy', 'Pharmacy'),
        ('reception', 'Reception'),
        ('laboratory', 'Laboratory'),
        ('radiology', 'Radiology'),
        ('ward', 'Ward'),
        ('outpatient', 'Outpatient'),
    ]

    department = models.CharField(max_length=100, choices=DEPARTMENT_CHOICES)
    rating = models.CharField(max_length=20, choices=SERVICE_CHOICES)
    comment = models.TextField(blank=True)
    patient_name = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.get_department_display()} - {self.get_rating_display()}"
