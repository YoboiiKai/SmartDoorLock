import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AddFacultyModal from '@/Components/Admin/AddFacultyModal';
import UpdateFacultyModal from '@/Components/Admin/UpdateFacultyModal';
import { Plus, Search, Image as ImageIcon, Trash2, Edit, Eye, Star, Filter, Grid, List, Users } from 'lucide-react';

const Faculty = ({ auth }) => {
    const [faculty, setFaculty] = useState([
        { id: 1, facultyNumber: 'FAC-2023-001', fullname: 'Dr. John Smith', department: 'BSIT', rfidNumber: 'RFID-001-ABC123', status: 'Active' },
        { id: 2, facultyNumber: 'FAC-2023-002', fullname: 'Prof. Jane Doe', department: 'BSCPE', rfidNumber: 'RFID-002-DEF456', status: 'Active' },
        { id: 3, facultyNumber: 'FAC-2023-003', fullname: 'Dr. Robert Johnson', department: 'BSCRIM', rfidNumber: 'RFID-003-GHI789', status: 'Deactivate' },
        { id: 4, facultyNumber: 'FAC-2023-004', fullname: 'Prof. Sarah Wilson', department: 'BSTM', rfidNumber: 'RFID-004-JKL012', status: 'Active' },
        { id: 5, facultyNumber: 'FAC-2023-005', fullname: 'Dr. Michael Brown', department: 'BSHM', rfidNumber: 'RFID-005-MNO345', status: 'Deactivate' },
    ]);

    const [selectedStatus, setSelectedStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const getStatusConfig = (status) => {
        switch (status) {
            case 'Active':
                return {
                    bg: 'bg-emerald-500/10',
                    text: 'text-emerald-600',
                    border: 'border-emerald-200',
                    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                    dot: 'bg-emerald-500'
                };
            case 'Deactivate':
                return {
                    bg: 'bg-red-500/10',
                    text: 'text-red-600',
                    border: 'border-red-200',
                    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z',
                    dot: 'bg-red-500'
                };
            default:
                return {
                    bg: 'bg-gray-500/10',
                    text: 'text-gray-600',
                    border: 'border-gray-200',
                    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                    dot: 'bg-gray-500'
                };
        }
    };

    const filteredFaculty = faculty.filter(facultyMember => {
        const matchesStatus = selectedStatus === 'All' || facultyMember.status === selectedStatus;
        const matchesSearch = facultyMember.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            facultyMember.facultyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            facultyMember.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            facultyMember.rfidNumber.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const activeFaculty = faculty.filter(f => f.status === 'Active');
    const deactivateFaculty = faculty.filter(f => f.status === 'Deactivate');

    const handleAddFaculty = (formData) => {
        // Here you would typically send the data to your backend
        console.log('New faculty data:', formData);
        
        // For demo purposes, we'll add it to the local state
        const newFaculty = {
            id: Math.max(0, ...faculty.map(f => f.id)) + 1,
            facultyNumber: formData.facultyNumber,
            fullname: formData.fullname,
            department: formData.department,
            rfidNumber: formData.rfidNumber,
            status: 'Active'
        };
        
        setFaculty([...faculty, newFaculty]);
        setIsAddModalOpen(false);
    };

    const handleUpdateFaculty = (formData) => {
        // Here you would typically send the data to your backend
        console.log('Updated faculty data:', formData);
        
        setFaculty(faculty.map(facultyMember => 
            facultyMember.id === formData.id ? {
                ...facultyMember,
                facultyNumber: formData.facultyNumber,
                fullname: formData.fullname,
                department: formData.department,
                rfidNumber: formData.rfidNumber,
                status: formData.status
            } : facultyMember
        ));
        setIsUpdateModalOpen(false);
        setSelectedItem(null);
    };

    const openUpdateModal = (facultyMember) => {
        setSelectedItem(facultyMember);
        setIsUpdateModalOpen(true);
    };

    const deleteFaculty = (id) => {
        if (window.confirm('Are you sure you want to delete this faculty member?')) {
            setFaculty(faculty.filter(facultyMember => facultyMember.id !== id));
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Faculty Management" />
            
            {/* New Header Design */}
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl"></div>
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
                
                <div className="relative p-8 text-white">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="mb-6 lg:mb-0">
                            <div className="flex items-center mb-4">
                                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl mr-4">
                                    <Users className="w-8 h-8" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold mb-2">Faculty Dashboard</h1>
                                    <p className="text-slate-300 text-lg">Manage your academic staff</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={() => setIsAddModalOpen(true)}
                                className="group bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 px-8 py-3 rounded-xl font-semibold flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Faculty
                            </button>
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
                                placeholder="Search faculty..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
                            />
                            <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Deactivate">Deactivate</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Faculty Table Layout */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        <span>Faculty</span>
                                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Faculty Number</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">RFID Number</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredFaculty.length > 0 ? (
                                filteredFaculty.map((facultyMember, index) => {
                                    const statusConfig = getStatusConfig(facultyMember.status);
                                    return (
                                        <tr 
                                            key={facultyMember.id}
                                            className={`transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 group`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-4">
                                                        {facultyMember.facultyNumber.split('-')[2]}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-900">{facultyMember.fullname}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500 font-mono">{facultyMember.facultyNumber}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">{facultyMember.department}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 font-mono">{facultyMember.rfidNumber}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                                                    <span className={`w-2 h-2 mr-2 rounded-full ${statusConfig.dot}`}></span>
                                                    {facultyMember.status}
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
                                                    <button 
                                                        onClick={() => openUpdateModal(facultyMember)}
                                                        className="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-all duration-200"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button 
                                                        onClick={() => deleteFaculty(facultyMember.id)}
                                                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                    <button className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-medium rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-200 transform hover:scale-105">
                                                        Profile
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center">
                                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 mb-6">
                                            <Search className="w-10 h-10 text-blue-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No faculty found</h3>
                                        <p className="text-gray-600 mb-6">
                                            {searchTerm || selectedStatus !== 'All' 
                                                ? 'Try adjusting your search or filter criteria.'
                                                : 'No faculty members have been added yet.'}
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Enhanced Pagination */}
                {filteredFaculty.length > 0 && (
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Showing <span className="font-medium">{filteredFaculty.length}</span> of <span className="font-medium">{faculty.length}</span> faculty members
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Previous
                                </button>
                                <div className="flex items-center space-x-1">
                                    <button className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg transition-colors duration-200">1</button>
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

            {/* Add Faculty Modal */}
            <AddFacultyModal 
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddFaculty}
            />

            {/* Update Faculty Modal */}
            <UpdateFacultyModal 
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                onSubmit={handleUpdateFaculty}
                faculty={selectedItem}
            />
        </AdminLayout>
    );
};

export default Faculty;
