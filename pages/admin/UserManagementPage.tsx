import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import * as api from '../../services/api';
import { Modal } from '../../components/ui/Modal';
import { PencilIcon, TrashIcon } from '../../components/ui/Icons';

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    api.adminGetAllUsers()
      .then(setUsers)
      .catch(err => console.error("Failed to fetch users", err))
      .finally(() => setLoading(false));
  };

  const openEditModal = (user: User) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!currentUser) return;
    await api.adminUpdateUser(currentUser.id, { name: currentUser.name || '', role: currentUser.role });
    setIsModalOpen(false);
    fetchUsers(); // Refresh list
  };
  
  const handleDelete = async (user: User) => {
    if (window.confirm(`Are you sure you want to delete user ${user.email}? This is irreversible.`)) {
        await api.adminDeleteUser(user.id);
        fetchUsers(); // Refresh list
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark mb-6">User Management</h1>
      <div className="bg-white shadow-md rounded-lg border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => openEditModal(user)} className="text-primary hover:text-primary/80"><PencilIcon className="w-5 h-5"/></button>
                    <button onClick={() => handleDelete(user)} className="text-red-600 hover:text-red-800"><TrashIcon className="w-5 h-5"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      {currentUser && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Edit User: ${currentUser.email}`}>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" value={currentUser.name} onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})} className="input mt-1"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select value={currentUser.role} onChange={(e) => setCurrentUser({...currentUser, role: e.target.value as 'user' | 'admin'})} className="input mt-1">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="flex justify-end gap-2">
                    <button onClick={handleUpdate} className="bg-primary text-white font-bold py-2 px-4 rounded-lg">Save</button>
                </div>
            </div>
        </Modal>
      )}
    </div>
  );
};

export default UserManagementPage;
