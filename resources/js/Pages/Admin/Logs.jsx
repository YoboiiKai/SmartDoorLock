import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Search, Clock, User, DoorOpen, Shield, AlertTriangle, CheckCircle, XCircle, Activity } from 'lucide-react';

const Logs = ({ auth }) => {
    const [logs, setLogs] = useState([
        { id: 1, userId: 'FAC-2023-001', userName: 'Dr. John Smith', department: 'Computer Science', entryTime: '2024-01-15 08:30:00', exitTime: '2024-01-15 17:45:00', doorId: 'Main Entrance', status: 'Success', accessType: 'Card', location: 'Building A' },
        { id: 2, userId: 'FAC-2023-002', userName: 'Prof. Jane Doe', department: 'Mathematics', entryTime: '2024-01-15 09:15:00', exitTime: '2024-01-15 18:20:00', doorId: 'Lab Entrance', status: 'Success', accessType: 'Fingerprint', location: 'Building B' },
        { id: 3, userId: 'FAC-2023-003', userName: 'Dr. Robert Johnson', department: 'Physics', entryTime: '2024-01-15 07:45:00', exitTime: null, doorId: 'Research Wing', status: 'Active', accessType: 'Card', location: 'Building C' },
        { id: 4, userId: 'FAC-2023-004', userName: 'Prof. Sarah Wilson', department: 'Chemistry', entryTime: '2024-01-15 10:00:00', exitTime: '2024-01-15 16:30:00', doorId: 'Main Entrance', status: 'Denied', accessType: 'Card', location: 'Building A' },
        { id: 5, userId: 'FAC-2023-005', userName: 'Dr. Michael Brown', department: 'Biology', entryTime: '2024-01-15 08:00:00', exitTime: '2024-01-15 19:15:00', doorId: 'Lab Entrance', status: 'Success', accessType: 'Fingerprint', location: 'Building B' },
        { id: 6, userId: 'STU-2024-001', userName: 'Alex Johnson', department: 'Student', entryTime: '2024-01-15 11:30:00', exitTime: '2024-01-15 15:45:00', doorId: 'Library Entrance', status: 'Success', accessType: 'Card', location: 'Library' },
        { id: 7, userId: 'STU-2024-002', userName: 'Maria Garcia', department: 'Student', entryTime: '2024-01-15 12:15:00', exitTime: null, doorId: 'Main Entrance', status: 'Active', accessType: 'Card', location: 'Building A' },
        { id: 8, userId: 'VIS-2024-001', userName: 'David Chen', department: 'Visitor', entryTime: '2024-01-15 14:00:00', exitTime: '2024-01-15 16:00:00', doorId: 'Visitor Entrance', status: 'Success', accessType: 'Temporary', location: 'Building A' },
    ]);

    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedLocation, setSelectedLocation] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return 'N/A';
        return new Date(dateTimeString).toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatTimeOnly = (dateTimeString) => {
        if (!dateTimeString) return 'N/A';
        return new Date(dateTimeString).toLocaleTimeString('en-US', { 
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case 'Success':
                return {
                    bg: 'bg-emerald-500/10',
                    text: 'text-emerald-600',
                    border: 'border-emerald-200',
                    icon: CheckCircle,
                    dot: 'bg-emerald-500'
                };
            case 'Active':
                return {
                    bg: 'bg-blue-500/10',
                    text: 'text-blue-600',
                    border: 'border-blue-200',
                    icon: Activity,
                    dot: 'bg-blue-500'
                };
            case 'Denied':
                return {
                    bg: 'bg-red-500/10',
                    text: 'text-red-600',
                    border: 'border-red-200',
                    icon: XCircle,
                    dot: 'bg-red-500'
                };
            case 'Suspicious':
                return {
                    bg: 'bg-amber-500/10',
                    text: 'text-amber-600',
                    border: 'border-amber-200',
                    icon: AlertTriangle,
                    dot: 'bg-amber-500'
                };
            default:
                return {
                    bg: 'bg-gray-500/10',
                    text: 'text-gray-600',
                    border: 'border-gray-200',
                    icon: Clock,
                    dot: 'bg-gray-500'
                };
        }
    };

    const getAccessTypeConfig = (accessType) => {
        switch (accessType) {
            case 'Card':
                return { icon: Shield, color: 'text-blue-600' };
            case 'Fingerprint':
                return { icon: User, color: 'text-green-600' };
            case 'Temporary':
                return { icon: Clock, color: 'text-orange-600' };
            default:
                return { icon: Shield, color: 'text-gray-600' };
        }
    };

    const filteredLogs = logs.filter(log => {
        const matchesStatus = selectedStatus === 'All' || log.status === selectedStatus;
        const matchesLocation = selectedLocation === 'All' || log.location === selectedLocation;
        const matchesSearch = log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            log.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            log.doorId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDate = !dateFilter || log.entryTime.includes(dateFilter);
        return matchesStatus && matchesLocation && matchesSearch && matchesDate;
    });

    const successLogs = logs.filter(log => log.status === 'Success');
    const activeLogs = logs.filter(log => log.status === 'Active');
    const deniedLogs = logs.filter(log => log.status === 'Denied');
    const totalEntries = logs.length;

    const getUniqueLocations = () => {
        return ['All', ...new Set(logs.map(log => log.location))];
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Access Logs" />
            
            {/* Header Design */}
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 rounded-3xl"></div>
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
                
                <div className="relative p-8 text-white">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="mb-6 lg:mb-0">
                            <div className="flex items-center mb-4">
                                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl mr-4">
                                    <Activity className="w-8 h-8" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold mb-2">Access Logs</h1>
                                    <p className="text-slate-300 text-lg">Monitor door entry and exit activities</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">{totalEntries}</div>
                                    <div className="text-sm text-slate-300">Total Entries</div>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">{activeLogs.length}</div>
                                    <div className="text-sm text-slate-300">Currently Inside</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by name, ID, or door..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-80"
                            />
                            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        </div>
                        
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                            <option value="All">All Status</option>
                            <option value="Success">Success</option>
                            <option value="Active">Active</option>
                            <option value="Denied">Denied</option>
                            <option value="Suspicious">Suspicious</option>
                        </select>

                        <select
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                            {getUniqueLocations().map(location => (
                                <option key={location} value={location}>{location}</option>
                            ))}
                        </select>

                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Logs Table Layout */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-green-50 to-green-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        <span>User</span>
                                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Door/Location</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Entry Time</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Exit Time</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Access Type</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredLogs.length > 0 ? (
                                filteredLogs.map((log, index) => {
                                    const statusConfig = getStatusConfig(log.status);
                                    const accessTypeConfig = getAccessTypeConfig(log.accessType);
                                    const StatusIcon = statusConfig.icon;
                                    const AccessIcon = accessTypeConfig.icon;
                                    
                                    return (
                                        <tr 
                                            key={log.id}
                                            className={`transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 group`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-r from-green-600 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-4">
                                                        {log.userId.split('-')[2]}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-900">{log.userName}</div>
                                                        <div className="text-sm text-gray-500 font-mono">{log.userId}</div>
                                                        <div className="text-xs text-gray-400">{log.department}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <DoorOpen className="w-4 h-4 text-gray-400 mr-2" />
                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-900">{log.doorId}</div>
                                                        <div className="text-sm text-gray-500">{log.location}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 font-medium">{formatDateTime(log.entryTime)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 font-medium">
                                                    {log.exitTime ? formatDateTime(log.exitTime) : 'Still Inside'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <AccessIcon className={`w-4 h-4 mr-2 ${accessTypeConfig.color}`} />
                                                    <span className="text-sm text-gray-900">{log.accessType}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                                                    <StatusIcon className="w-3 h-3 mr-2" />
                                                    {log.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </button>
                                                    <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-all duration-200">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </button>
                                                    <button className="px-3 py-1.5 bg-gradient-to-r from-green-600 to-green-500 text-white text-xs font-medium rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-200 transform hover:scale-105">
                                                        Details
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center">
                                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-50 to-green-100 mb-6">
                                            <Search className="w-10 h-10 text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No logs found</h3>
                                        <p className="text-gray-600 mb-6">
                                            {searchTerm || selectedStatus !== 'All' || selectedLocation !== 'All' || dateFilter
                                                ? 'Try adjusting your search or filter criteria.'
                                                : 'No access logs have been recorded yet.'}
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Enhanced Pagination */}
                {filteredLogs.length > 0 && (
                    <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Showing <span className="font-medium">{filteredLogs.length}</span> of <span className="font-medium">{logs.length}</span> log entries
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Previous
                                </button>
                                <div className="flex items-center space-x-1">
                                    <button className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 rounded-lg transition-colors duration-200">1</button>
                                </div>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                                    Next
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Logs;
