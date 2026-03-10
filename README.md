# QR Code Patient Feedback System

A modern hospital feedback system that allows patients to provide feedback through QR codes, with real-time analytics and admin dashboard.

## Features

- **Mobile-First Feedback Form**: Responsive design optimized for patient mobile devices
- **QR Code Integration**: Department-specific QR codes for easy access
- **Real-time Analytics**: Live dashboard with charts and statistics
- **Department Performance**: Track satisfaction by department
- **Poor Rating Alerts**: Automatic notifications for negative feedback
- **Modern UI**: Clean, professional interface with Tailwind CSS

## Technology Stack

### Backend
- **Django** with Django REST Framework
- **SQLite** database (easily upgradeable to PostgreSQL)
- **CORS** support for frontend integration

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Chart.js** for data visualization
- **React Router** for navigation

## Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Activate virtual environment:
```bash
source venv/bin/activate
```

3. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

4. Start Django server:
```bash
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start React development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

- `POST /api/feedback/submit/` - Submit new feedback
- `GET /api/feedback/list/` - Get all feedback entries
- `GET /api/feedback/stats/` - Get analytics and statistics

## QR Code Generation

Generate department-specific QR codes:

```bash
cd backend
source venv/bin/activate
python generate_qr.py
```

This creates QR codes in the `qr_codes/` directory for:
- Emergency Department
- Pharmacy
- Reception
- Laboratory
- Radiology
- Ward
- Outpatient

## Usage

### For Patients
1. Scan QR code in any department
2. Fill feedback form (name optional)
3. Select service rating
4. Add comments (optional)
5. Submit feedback

### For Hospital Staff
1. Navigate to `/admin` 
2. View real-time statistics
3. Monitor department performance
4. Review individual feedback entries
5. Export reports (future feature)

## Department Ratings

The system tracks four rating levels:
- **Excellent** (4/4) - Outstanding service
- **Good** (3/4) - Satisfactory service  
- **Average** (2/4) - Acceptable service
- **Poor** (1/4) - Needs improvement

## Dashboard Features

### Overview Statistics
- Total feedback count
- Rating distribution percentages
- Department-wise breakdown

### Visual Analytics
- Pie chart for rating distribution
- Bar chart for department feedback volume
- Recent feedback table with color-coded ratings

### Performance Metrics
- Average rating per department
- Trend analysis (planned)
- Comparison reports (planned)

## File Structure

```
QrSystem/
├── backend/
│   ├── core/
│   │   ├── settings.py
│   │   └── urls.py
│   ├── feedback_api/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── urls.py
│   ├── generate_qr.py
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FeedbackForm.tsx
│   │   │   └── AdminDashboard.tsx
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## Deployment

### Backend (Django)
- **Render**, **Railway**, or **DigitalOcean**
- Set `DEBUG=False` in production
- Configure production database
- Set up CORS for production domain

### Frontend (React)
- **Netlify**, **Vercel**, or **AWS S3**
- Update API endpoints to production URL
- Enable HTTPS for security

## Future Enhancements

- **Email Notifications**: Automatic alerts for poor ratings
- **WhatsApp Integration**: Send reports via WhatsApp
- **Monthly Reports**: Automated PDF generation
- **AI Sentiment Analysis**: Detect emotional tone in comments
- **Multi-language Support**: Support multiple languages
- **Offline Mode**: Work without internet connection
- **Patient Follow-up**: Track resolution of complaints

## Security Considerations

- No personal health information (PHI) stored
- Anonymous feedback option available
- CORS properly configured
- Input validation and sanitization
- Regular security updates

## Support

For issues and questions:
1. Check the logs in both backend and frontend
2. Verify API endpoints are accessible
3. Ensure CORS is properly configured
4. Test with different departments and ratings

## License

This project is open source and available under the MIT License.
