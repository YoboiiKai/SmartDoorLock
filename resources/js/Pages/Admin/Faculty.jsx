import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AddFacultyModal from '@/Components/Admin/AddFacultyModal';
import UpdateFacultyModal from '@/Components/Admin/UpdateFacultyModal';
import { Plus, Search, Image as ImageIcon, Trash2, Edit, Eye, Star, Filter, Grid, List, Users } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Faculty = ({ auth, faculties, filters }) => {
    const [selectedStatus, setSelectedStatus] = useState(filters?.status || 'All');
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const getStatusConfig = (status) => {
        switch (status) {
            case 'active':
            case 'Active':
                return {
                    bg: 'bg-emerald-500/10',
                    text: 'text-emerald-600',
                    border: 'border-emerald-200',
                    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                    dot: 'bg-emerald-500'
                };
            case 'inactive':
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

    // Handle search and filter changes
    const handleSearch = (e) => {
        const search = e.target.value;
        setSearchTerm(search);
        
        // Update URL with search parameters
        router.get(route('faculties.index'), {
            search: search,
            status: selectedStatus !== 'All' ? selectedStatus.toLowerCase() : undefined
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleStatusFilter = (status) => {
        setSelectedStatus(status);
        
        // Update URL with filter parameters
        router.get(route('faculties.index'), {
            search: searchTerm,
            status: status !== 'All' ? status.toLowerCase() : undefined
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    // Map backend data to frontend format for compatibility
    const mappedFaculties = faculties?.data?.map(faculty => ({
        id: faculty.id,
        facultyNumber: faculty.faculty_id,
        fullname: faculty.name,
        department: faculty.department,
        rfidNumber: faculty.rfid_number || 'N/A',
        status: faculty.status === 'active' ? 'Active' : 'Deactivate'
    })) || [];

    const filteredFaculty = mappedFaculties.filter(facultyMember => {
        const matchesStatus = selectedStatus === 'All' || 
            (selectedStatus === 'Active' && facultyMember.status === 'Active') ||
            (selectedStatus === 'Deactivate' && facultyMember.status === 'Deactivate') ||
            (selectedStatus === 'active' && facultyMember.status === 'Active') ||
            (selectedStatus === 'inactive' && facultyMember.status === 'Deactivate');
        const matchesSearch = facultyMember.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            facultyMember.facultyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            facultyMember.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            facultyMember.rfidNumber.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const handleAddFaculty = (formData) => {
        // Map frontend field names to backend field names
        const backendData = {
            faculty_id: formData.facultyNumber,
            name: formData.fullname,
            rfid_number: formData.rfidNumber,
            department: formData.department,
            status: 'active'
        };

        router.post(route('faculties.store'), backendData, {
            onSuccess: () => {
                setIsAddModalOpen(false);
                toast.success('Faculty member added successfully!');
                // Refresh the page data to show the new faculty immediately
                router.get(route('faculties.index'), {
                    search: searchTerm,
                    status: selectedStatus !== 'All' ? selectedStatus.toLowerCase() : undefined
                }, {
                    preserveState: false,
                    preserveScroll: true
                });
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
                toast.error('Failed to add faculty member. Please check your input.');
            }
        });
    };

    const handleUpdateFaculty = (formData) => {
        // Map frontend field names to backend field names
        const backendData = {
            faculty_id: formData.facultyNumber,
            name: formData.fullname,
            rfid_number: formData.rfidNumber,
            department: formData.department,
            status: formData.status?.toLowerCase() === 'active' || formData.status === 'Active' ? 'active' : 'inactive'
        };
        
        router.patch(route('faculties.update', selectedItem.id), backendData, {
            onSuccess: () => {
                setIsUpdateModalOpen(false);
                setSelectedItem(null);
                toast.success('Faculty member updated successfully!');
                // Refresh the page data to show the updated faculty immediately
                router.get(route('faculties.index'), {
                    search: searchTerm,
                    status: selectedStatus !== 'All' ? selectedStatus.toLowerCase() : undefined
                }, {
                    preserveState: false,
                    preserveScroll: true
                });
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
                toast.error('Failed to update faculty member. Please check your input.');
            }
        });
    };

    const openUpdateModal = (facultyMember) => {
        setSelectedItem(facultyMember);
        setIsUpdateModalOpen(true);
    };

    const deleteFaculty = (id) => {
        if (window.confirm('Are you sure you want to delete this faculty member?')) {
            router.delete(route('faculties.destroy', id), {
                onSuccess: () => {
                    toast.success('Faculty member deleted successfully!');
                    // Refresh the page data to remove the deleted faculty immediately
                    router.get(route('faculties.index'), {
                        search: searchTerm,
                        status: selectedStatus !== 'All' ? selectedStatus.toLowerCase() : undefined
                    }, {
                        preserveState: false,
                        preserveScroll: true
                    });
                },
                onError: () => {
                    toast.error('Failed to delete faculty member.');
                }
            });
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
                                onChange={handleSearch}
                                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
                            />
                            <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        
                        <select
                            value={selectedStatus}
                            onChange={(e) => handleStatusFilter(e.target.value)}
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
                {filteredFaculty.length > 0 && faculties && (
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Showing <span className="font-medium">{faculties.from || 0}</span> to <span className="font-medium">{faculties.to || 0}</span> of <span className="font-medium">{faculties.total || 0}</span> faculty members
                            </div>
                            <div className="flex items-center space-x-2">
                                {faculties.prev_page_url && (
                                    <button 
                                        onClick={() => router.get(faculties.prev_page_url)}
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Previous
                                    </button>
                                )}
                                <div className="flex items-center space-x-1">
                                    <button className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg transition-colors duration-200">
                                        {faculties.current_page || 1}
                                    </button>
                                </div>
                                {faculties.next_page_url && (
                                    <button 
                                        onClick={() => router.get(faculties.next_page_url)}
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        Next
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                )}
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

            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </AdminLayout>
    );
};

export default Faculty;
