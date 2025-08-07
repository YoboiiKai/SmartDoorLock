import React, { useState } from 'react';

const AddFacultyModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        facultyNumber: '',
        fullname: '',
        department: '',
        rfidNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        // Reset form
        setFormData({
            facultyNumber: '',
            fullname: '',
            department: '',
            rfidNumber: ''
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-4 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="p-2 bg-white/20 rounded-xl mr-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Add New Faculty</h2>
                                <p className="text-blue-100 text-sm">Register a new faculty member</p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="facultyNumber" className="block text-sm font-medium text-gray-700 mb-2">Faculty Number</label>
                                <input
                                    type="text"
                                    id="facultyNumber"
                                    name="facultyNumber"
                                    value={formData.facultyNumber}
                                    onChange={handleChange}
                                    placeholder="Enter faculty number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    id="fullname"
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                                <select
                                    id="department"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    required
                                >
                                    <option value="">Select Department</option>
                                    <option value="BSIT">BSIT</option>
                                    <option value="BSCPE">BSCPE</option>
                                    <option value="BSCRIM">BSCRIM</option>
                                    <option value="BSTM">BSTM</option>
                                    <option value="BSHM">BSHM</option>
                                    <option value="POLSCI">POLSCI</option>
                                    <option value="BSFI">BSFI</option>
                                    <option value="BS Entrep">BS Entrep</option>
                                    <option value="BS Educ">BS Educ</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="rfidNumber" className="block text-sm font-medium text-gray-700 mb-2">RFID Number</label>
                                <input
                                    type="text"
                                    id="rfidNumber"
                                    name="rfidNumber"
                                    value={formData.rfidNumber}
                                    onChange={handleChange}
                                    placeholder="Enter RFID number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 rounded-b-2xl border-t border-gray-200 flex justify-end">
                    <div className="flex space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 border border-transparent rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                        >
                            Add Faculty
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddFacultyModal;