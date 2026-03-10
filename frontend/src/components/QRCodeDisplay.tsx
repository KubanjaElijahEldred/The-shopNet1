import React from 'react';

const QRCodeDisplay = () => {
  const qrCodes = [
    { name: 'Emergency Department', file: 'emergency_department_feedback.png' },
    { name: 'Pharmacy', file: 'pharmacy_feedback.png' },
    { name: 'Reception', file: 'reception_feedback.png' },
    { name: 'Laboratory', file: 'laboratory_feedback.png' },
    { name: 'Radiology', file: 'radiology_feedback.png' },
    { name: 'Ward', file: 'ward_feedback.png' },
    { name: 'Outpatient', file: 'outpatient_feedback.png' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Lane Gen Medical Center</h1>
        <p className="text-gray-600 mb-8">Patient Feedback System - QR Codes</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qrCodes.map((qr) => (
            <div key={qr.name} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{qr.name}</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <img 
                  src={`http://127.0.0.1:8001/qr_codes/${qr.file}`}
                  alt={`${qr.name} QR Code`}
                  className="w-48 h-48 mx-auto"
                  onError={(e) => {
                    console.error(`Failed to load QR code: ${qr.file}`);
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9IiNmM2Y0ZjYiIHJ4PSI0Ii8+PHRleHQgeD0iMTIiIHk9IjI0IiBmb250LXNpemU9IjEwIiBmaWxsPSIjOTk5OTk5Ij5FUlI8L3RleHQ+PC9zdmc+';
                  }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-4 text-center">
                Scan to provide feedback
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
