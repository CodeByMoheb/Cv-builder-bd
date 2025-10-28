import React, { useState, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import * as api from '../services/api';
import { UserCircleIcon } from '../components/ui/Icons';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useContext(AuthContext);
  
  // State for profile info form
  const [name, setName] = useState(user?.name || '');
  const [photo, setPhoto] = useState(user?.photo || '');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for password change form
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  if (!user) {
    return <div>Loading profile...</div>;
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setProfileMessage({ type: '', text: '' });
    try {
      const updatedUser = await api.updateUserProfile({ name, photo });
      updateUser(updatedUser); // Update context
      setProfileMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err: any) {
      setProfileMessage({ type: 'error', text: err.message || 'Failed to update profile.' });
    } finally {
      setIsSavingProfile(false);
    }
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    setIsChangingPassword(true);
    setPasswordMessage({ type: '', text: '' });
    try {
      await api.changePassword({ oldPassword, newPassword });
      setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordMessage({ type: 'error', text: err.message || 'Failed to change password.' });
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold text-dark">My Profile</h1>
        <p className="mt-1 text-muted">Manage your personal information and account settings.</p>
      </div>

      {/* Profile Information Form */}
      <div className="bg-white p-8 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold text-dark mb-6">Personal Information</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          {profileMessage.text && (
            <div className={`p-3 rounded-md text-sm ${profileMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {profileMessage.text}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" id="email" value={user.email} disabled className="input bg-gray-100 cursor-not-allowed" />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="input" placeholder="Your full name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
            <div className="flex items-center gap-4">
              {photo ? (
                 <img src={photo} alt="Profile Preview" className="w-20 h-20 rounded-full object-cover bg-gray-200" />
              ) : (
                <UserCircleIcon className="w-20 h-20 text-gray-300" />
              )}
              <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm">
                Upload Photo
              </button>
              <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
            </div>
          </div>
          <div className="text-right">
             <button type="submit" disabled={isSavingProfile} className="bg-primary text-white font-bold py-2 px-6 rounded-lg disabled:bg-primary/50">
              {isSavingProfile ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

       {/* Change Password Form */}
      <div className="bg-white p-8 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold text-dark mb-6">Change Password</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-6">
           {passwordMessage.text && (
            <div className={`p-3 rounded-md text-sm ${passwordMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {passwordMessage.text}
            </div>
          )}
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input type="password" id="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required className="input" />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="input" />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="input" />
          </div>
          <div className="text-right">
             <button type="submit" disabled={isChangingPassword} className="bg-primary text-white font-bold py-2 px-6 rounded-lg disabled:bg-primary/50">
              {isChangingPassword ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;