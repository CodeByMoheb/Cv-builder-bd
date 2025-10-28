// services/api.ts

import { v4 as uuidv4 } from 'uuid';
import { User, SavedResume, ResumeData } from '../types';

// --- In-memory database with localStorage persistence ---

let db: {
  users: User[];
  resumes: SavedResume[];
} = {
  users: [],
  resumes: [],
};

const saveDb = () => {
  try {
    localStorage.setItem('cvbuilder_db', JSON.stringify(db));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
};

const initDb = () => {
  try {
    const storedDb = localStorage.getItem('cvbuilder_db');
    if (storedDb) {
      db = JSON.parse(storedDb);
    } else {
      // Seed with a default admin user if no DB exists
      const adminUser: User = {
        id: uuidv4(),
        email: 'admin@cvbd.com',
        name: 'Admin User',
        password: 'password123', // In a real app, this would be hashed
        role: 'admin',
      };
      db.users.push(adminUser);
      saveDb();
    }
  } catch (e) {
    console.error("Failed to initialize DB from localStorage", e);
    // If parsing fails, start fresh
    db = { users: [], resumes: [] };
    const adminUser: User = {
        id: uuidv4(),
        email: 'admin@cvbd.com',
        name: 'Admin User',
        password: 'password123',
        role: 'admin',
    };
    db.users.push(adminUser);
    saveDb();
  }
};

initDb();

// --- Mock JWT utilities ---
// In a real app, use a proper JWT library

const createToken = (user: User): string => btoa(JSON.stringify({ userId: user.id, role: user.role, iat: Date.now() }));
const decodeToken = (token: string): { userId: string; role: 'user' | 'admin' } | null => {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
};
const getCurrentUser = (): User | undefined => {
    const token = localStorage.getItem('authToken');
    if (!token) return undefined;
    const decoded = decodeToken(token);
    if (!decoded) return undefined;
    return db.users.find(u => u.id === decoded.userId);
}


// --- API Functions ---

export const login = (email: string, password: string): Promise<{ token: string; user: User }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = db.users.find(u => u.email === email && u.password === password);
      if (user) {
        const token = createToken(user);
        resolve({ token, user });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 500);
  });
};

export const register = (email: string, password: string): Promise<{ token: string; user: User }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (db.users.some(u => u.email === email)) {
        reject(new Error("User with this email already exists"));
        return;
      }
      const newUser: User = { id: uuidv4(), email, password, role: 'user', name: email.split('@')[0] };
      db.users.push(newUser);
      saveDb();
      const token = createToken(newUser);
      resolve({ token, user: newUser });
    }, 500);
  });
};

export const getSelf = (token: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        const decoded = decodeToken(token);
        if (!decoded) return reject(new Error("Invalid token"));
        const user = db.users.find(u => u.id === decoded.userId);
        if (user) {
            resolve(user);
        } else {
            reject(new Error("User not found"));
        }
    });
};

export const updateUserProfile = (data: { name?: string; photo?: string }): Promise<User> => {
    return new Promise((resolve, reject) => {
        const currentUser = getCurrentUser();
        if (!currentUser) return reject(new Error("Not authenticated"));
        
        const userIndex = db.users.findIndex(u => u.id === currentUser.id);
        if (userIndex === -1) return reject(new Error("User not found"));
        
        const updatedUser = { ...db.users[userIndex], ...data };
        db.users[userIndex] = updatedUser;
        saveDb();
        resolve(updatedUser);
    });
};

// FIX: Corrected the malformed function signature which contained a feature description.
export const changePassword = (data: { oldPassword: string; newPassword: string }): Promise<void> => {
    return new Promise((resolve, reject) => {
        const currentUser = getCurrentUser();
        if (!currentUser) return reject(new Error("Not authenticated"));

        const userIndex = db.users.findIndex(u => u.id === currentUser.id);
        if (userIndex === -1) return reject(new Error("User not found"));

        if (db.users[userIndex].password !== data.oldPassword) {
            return reject(new Error("Incorrect old password"));
        }
        
        db.users[userIndex].password = data.newPassword;
        saveDb();
        resolve();
    });
};

// FIX: Implemented missing API functions for resume CRUD operations and user management.
export const createResume = (data: { name: string; resumeData: ResumeData; templateId: string }): Promise<SavedResume> => {
    return new Promise((resolve, reject) => {
        const currentUser = getCurrentUser();
        if (!currentUser) return reject(new Error("Not authenticated"));
        
        const newResume: SavedResume = {
            id: uuidv4(),
            userId: currentUser.id,
            name: data.name,
            resumeData: data.resumeData,
            templateId: data.templateId,
            lastModified: Date.now(),
        };
        db.resumes.push(newResume);
        saveDb();
        resolve(newResume);
    });
};

export const getResumes = (): Promise<SavedResume[]> => {
    return new Promise((resolve, reject) => {
        const currentUser = getCurrentUser();
        if (!currentUser) return reject(new Error("Not authenticated"));
        
        const userResumes = db.resumes.filter(r => r.userId === currentUser.id);
        resolve(userResumes);
    });
};

export const getResumeById = (id: string): Promise<SavedResume | null> => {
    return new Promise((resolve, reject) => {
        const currentUser = getCurrentUser();
        if (!currentUser) return reject(new Error("Not authenticated"));

        const resume = db.resumes.find(r => r.id === id);
        if (!resume) return resolve(null);
        
        if (resume.userId !== currentUser.id && currentUser.role !== 'admin') {
            return reject(new Error("Access denied"));
        }
        resolve(resume);
    });
};

export const updateResume = (id: string, data: { name: string; resumeData: ResumeData }): Promise<SavedResume> => {
    return new Promise((resolve, reject) => {
        const currentUser = getCurrentUser();
        if (!currentUser) return reject(new Error("Not authenticated"));

        const resumeIndex = db.resumes.findIndex(r => r.id === id);
        if (resumeIndex === -1) return reject(new Error("Resume not found"));

        if (db.resumes[resumeIndex].userId !== currentUser.id && currentUser.role !== 'admin') {
            return reject(new Error("Access denied"));
        }

        const updatedResume = {
            ...db.resumes[resumeIndex],
            name: data.name,
            resumeData: data.resumeData,
            lastModified: Date.now(),
        };
        db.resumes[resumeIndex] = updatedResume;
        saveDb();
        resolve(updatedResume);
    });
};

export const deleteResume = (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const currentUser = getCurrentUser();
        if (!currentUser) return reject(new Error("Not authenticated"));
        
        const resumeIndex = db.resumes.findIndex(r => r.id === id);
        if (resumeIndex === -1) return resolve(); // Silently fail if not found
        
        if (db.resumes[resumeIndex].userId !== currentUser.id && currentUser.role !== 'admin') {
            return reject(new Error("Access denied"));
        }

        db.resumes = db.resumes.filter(r => r.id !== id);
        saveDb();
        resolve();
    });
};

export const duplicateResume = (id: string): Promise<SavedResume> => {
    return new Promise((resolve, reject) => {
        const currentUser = getCurrentUser();
        if (!currentUser) return reject(new Error("Not authenticated"));
        
        const originalResume = db.resumes.find(r => r.id === id);
        if (!originalResume) return reject(new Error("Resume not found"));

        if (originalResume.userId !== currentUser.id && currentUser.role !== 'admin') {
            return reject(new Error("Access denied"));
        }

        const newResume: SavedResume = {
            ...JSON.parse(JSON.stringify(originalResume)), // Deep copy
            id: uuidv4(),
            name: `${originalResume.name} (Copy)`,
            lastModified: Date.now(),
        };
        db.resumes.push(newResume);
        saveDb();
        resolve(newResume);
    });
};

export const getAllUsers = (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
        const currentUser = getCurrentUser();
        if (!currentUser || currentUser.role !== 'admin') {
            return reject(new Error("Admin access required"));
        }
        resolve(db.users);
    });
};
