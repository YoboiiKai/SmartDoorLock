import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Users, DoorOpen, Clock, CheckCircle, AlertCircle, Activity } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendText, trendColor = 'green' }) => (
  <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        {trend && (
          <p className={`mt-2 flex items-center text-sm ${trendColor === 'green' ? 'text-green-600' : 'text-red-600'}`}>
            {trend}
            <span className="ml-1 text-gray-500">{trendText}</span>
          </p>
        )}
      </div>
      <div className="p-3 rounded-full bg-indigo-50">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
    </div>
  </div>
);

const ActivityItem = ({ time, title, description, icon: Icon, iconBg = 'bg-indigo-100', iconColor = 'text-indigo-600' }) => (
  <div className="flex items-start pb-4">
    <div className={`flex-shrink-0 p-2 rounded-full ${iconBg} ${iconColor} mr-3`}>
      <Icon className="w-4 h-4" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{description}</p>
      <p className="mt-1 text-xs text-gray-400">{time}</p>
    </div>
  </div>
);

export default function Dashboard() {
  const stats = [
    { title: 'Total Faculty', value: '142', icon: Users, trend: '+12%', trendText: 'from last month' },
    { title: 'Active Doors', value: '8', icon: DoorOpen, trend: '+2', trendText: 'recently' },
    { title: 'Today\'s Entries', value: '87', icon: CheckCircle, trend: '15%', trendText: 'increase' },
    { title: 'Alerts', value: '3', icon: AlertCircle, trend: '2 new', trendText: 'needs attention', trendColor: 'red' },
  ];

  const recentActivities = [
    {
      time: '2 min ago',
      title: 'New access granted',
      description: 'Dr. Smith accessed the Main Lab',
      icon: CheckCircle,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      time: '15 min ago',
      title: 'Door left open',
      description: 'Back door has been open for 5+ minutes',
      icon: AlertCircle,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      time: '1 hour ago',
      title: 'System check',
      description: 'Nightly backup completed successfully',
      icon: Activity,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
  ];

  return (
    <AdminLayout>
      <Head title="Dashboard" />

      
    </AdminLayout>
  );
}
