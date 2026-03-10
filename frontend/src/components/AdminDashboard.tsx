import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Feedback {
  id: number;
  department: string;
  rating: string;
  comment: string;
  patient_name: string;
  created_at: string;
}

interface Stats {
  total: number;
  excellent: number;
  good: number;
  average: number;
  poor: number;
}

interface DepartmentStat {
  department: string;
  count: number;
  avg_rating: number;
}

const AdminDashboard: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [departmentStats, setDepartmentStats] = useState<DepartmentStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [feedbacksResponse, statsResponse] = await Promise.all([
        axios.get('http://127.0.0.1:8001/api/feedback/list/'),
        axios.get('http://127.0.0.1:8001/api/feedback/stats/'),
      ]);

      setFeedbacks(feedbacksResponse.data);
      setStats(statsResponse.data.overall_stats);
      setDepartmentStats(statsResponse.data.department_breakdown);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'average': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const pieChartData = stats ? {
    labels: ['Excellent', 'Good', 'Average', 'Poor'],
    datasets: [
      {
        data: [stats.excellent, stats.good, stats.average, stats.poor],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(250, 204, 21, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(250, 204, 21)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  } : null;

  const barChartData = {
    labels: departmentStats.map(stat => stat.department),
    datasets: [
      {
        label: 'Number of Feedbacks',
        data: departmentStats.map(stat => stat.count),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Hospital Feedback Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor patient satisfaction and department performance</p>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm font-medium text-gray-600">Total Feedback</div>
              <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm font-medium text-gray-600">Excellent</div>
              <div className="text-2xl font-bold text-green-600">{stats.excellent}</div>
              <div className="text-sm text-gray-500">
                {stats.total > 0 ? Math.round((stats.excellent / stats.total) * 100) : 0}%
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm font-medium text-gray-600">Good</div>
              <div className="text-2xl font-bold text-blue-600">{stats.good}</div>
              <div className="text-sm text-gray-500">
                {stats.total > 0 ? Math.round((stats.good / stats.total) * 100) : 0}%
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm font-medium text-gray-600">Average</div>
              <div className="text-2xl font-bold text-yellow-600">{stats.average}</div>
              <div className="text-sm text-gray-500">
                {stats.total > 0 ? Math.round((stats.average / stats.total) * 100) : 0}%
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm font-medium text-gray-600">Poor</div>
              <div className="text-2xl font-bold text-red-600">{stats.poor}</div>
              <div className="text-sm text-gray-500">
                {stats.total > 0 ? Math.round((stats.poor / stats.total) * 100) : 0}%
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Rating Distribution</h2>
            {pieChartData && <Pie data={pieChartData} />}
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Department Feedback Count</h2>
            <Bar data={barChartData} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recent Feedback</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comments
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {feedbacks.slice(0, 10).map((feedback) => (
                  <tr key={feedback.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(feedback.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {feedback.patient_name || 'Anonymous'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {feedback.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRatingColor(feedback.rating)}`}>
                        {feedback.rating}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {feedback.comment || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
