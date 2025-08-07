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

      <div className="px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening with your Smart Door Lock system.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Recent Activities</h2>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  View all
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {recentActivities.map((activity, index) => (
                  <ActivityItem key={index} {...activity} />
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h2 className="mb-4 text-lg font-medium text-gray-900">Quick Actions</h2>
              <div className="space-y-3">
                <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-left text-gray-700 transition-colors bg-gray-50 rounded-md hover:bg-gray-100">
                  <DoorOpen className="w-5 h-5 mr-3 text-indigo-600" />
                  Manage Doors
                </button>
                <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-left text-gray-700 transition-colors bg-gray-50 rounded-md hover:bg-gray-100">
                  <Users className="w-5 h-5 mr-3 text-indigo-600" />
                  Add New Faculty
                </button>
                <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-left text-gray-700 transition-colors bg-gray-50 rounded-md hover:bg-gray-100">
                  <Clock className="w-5 h-5 mr-3 text-indigo-600" />
                  View Access Logs
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="p-6 mt-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h2 className="mb-4 text-lg font-medium text-gray-900">System Status</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">System Health</span>
                    <span className="text-sm font-medium text-green-600">Operational</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Storage</span>
                    <span className="text-sm font-medium text-gray-700">65% used</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 bg-indigo-500 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
