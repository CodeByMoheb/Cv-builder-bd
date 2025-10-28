
import { v4 as uuidv4 } from 'uuid';
import {
  AdminStats,
  BlogPost,
  Payment,
  ResumeData,
  SavedResume,
  Template,
  User,
} from '../types';
import { INITIAL_RESUME_DATA, TEMPLATE_CATEGORIES } from '../constants';

// --- MOCK DATABASE (using localStorage) ---

const DB_KEYS = {
  users: 'cv-builder-users',
  resumes: 'cv-builder-resumes',
  blogPosts: 'cv-builder-blog-posts',
  payments: 'cv-builder-payments',
  templates: 'cv-builder-templates-meta',
};

const MOCK_DELAY = 500;

const db = {
  get: <T>(key: string, defaultValue: T): T => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  },
  set: <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

const initDb = () => {
  if (!localStorage.getItem(DB_KEYS.users)) {
    db.set<User[]>(DB_KEYS.users, [
      { id: 'admin-user', email: 'admin@cv.com', password: 'adminpassword', role: 'admin', name: 'Admin User' },
      { id: 'test-user', email: 'user@cv.com', password: 'userpassword', role: 'user', name: 'Test User' },
    ]);
  }
  if (!localStorage.getItem(DB_KEYS.resumes)) {
    const userId = 'test-user';
    db.set<SavedResume[]>(DB_KEYS.resumes, [
      {
        id: uuidv4(),
        userId,
        name: 'My Software Engineer CV',
        resumeData: INITIAL_RESUME_DATA,
        templateId: 'modern',
        lastModified: Date.now(),
      },
    ]);
  }
  if (!localStorage.getItem(DB_KEYS.blogPosts)) {
    db.set<BlogPost[]>(DB_KEYS.blogPosts, [
        {
            id: '1',
            slug: 'mastering-the-ats-friendly-resume',
            title: 'Mastering the ATS-Friendly Resume in 2024',
            excerpt: 'Learn how to beat the bots and get your resume into human hands with these essential tips and tricks.',
            content: 'Full markdown content here...',
            imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            author: 'Jane Doe',
            authorAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a',
            category: 'Resume Tips',
            createdAt: new Date().toISOString(),
        },
        {
            id: '2',
            slug: 'top-10-in-demand-tech-skills',
            title: 'Top 10 In-Demand Tech Skills for the Modern Job Market',
            excerpt: 'Stay ahead of the curve. We break down the most sought-after tech skills employers are looking for right now.',
            content: 'Full markdown content here...',
            imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            author: 'John Smith',
            authorAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704b',
            category: 'Career Advice',
            createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        },
    ]);
  }
   if (!localStorage.getItem(DB_KEYS.payments)) {
    db.set<Payment[]>(DB_KEYS.payments, [
        {
            id: '1',
            userId: 'test-user',
            userEmail: 'user@cv.com',
            amount: 10,
            currency: 'BDT',
            status: 'succeeded',
            transactionId: 'TXN_' + uuidv4(),
            createdAt: new Date().toISOString()
        }
    ]);
  }
  if (!localStorage.getItem(DB_KEYS.templates)) {
     const templates = TEMPLATE_CATEGORIES.flatMap(c => c.templates.map(t => ({...t, component: undefined}))); // Remove component for storage
     db.set<Template[]>(DB_KEYS.templates, templates);
  }
};

initDb();

const simulate = <T>(data: T): Promise<T> =>
  new Promise(resolve => setTimeout(() => resolve(data), MOCK_DELAY));

// --- Auth ---
export const login = async (email: string, password: string): Promise<{ token: string; user: User }> => {
  const users = db.get<User[]>(DB_KEYS.users, []);
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error("Invalid credentials");
  const token = `mock-token-for-${user.id}`;
  const userWithoutPassword = { ...user };
  delete userWithoutPassword.password;
  return simulate({ token, user: userWithoutPassword });
};

export const register = async (email: string, password: string): Promise<{ token: string; user: User }> => {
  const users = db.get<User[]>(DB_KEYS.users, []);
  if (users.some(u => u.email === email)) throw new Error("User already exists");
  const newUser: User = { id: uuidv4(), email, password, role: 'user', name: email.split('@')[0] };
  users.push(newUser);
  db.set(DB_KEYS.users, users);
  return login(email, password);
};

export const getSelf = async (token: string): Promise<User> => {
  const userId = token.replace('mock-token-for-', '');
  const users = db.get<User[]>(DB_KEYS.users, []);
  const user = users.find(u => u.id === userId);
  if (!user) throw new Error("Invalid token");
  const userWithoutPassword = { ...user };
  delete userWithoutPassword.password;
  return simulate(userWithoutPassword);
};

// This would be a private helper in a real app
const getCurrentUserId = () => {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error("Not authenticated");
    return token.replace('mock-token-for-', '');
};


// --- User Profile ---
export const updateUserProfile = async (data: { name?: string; photo?: string }): Promise<User> => {
    const userId = getCurrentUserId();
    const users = db.get<User[]>(DB_KEYS.users, []);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) throw new Error("User not found");
    
    users[userIndex] = { ...users[userIndex], ...data };
    db.set(DB_KEYS.users, users);
    
    const userWithoutPassword = { ...users[userIndex] };
    delete userWithoutPassword.password;
    return simulate(userWithoutPassword);
};

export const changePassword = async (data: { oldPassword; newPassword }): Promise<void> => {
    const userId = getCurrentUserId();
    const users = db.get<User[]>(DB_KEYS.users, []);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) throw new Error("User not found");
    if (users[userIndex].password !== data.oldPassword) throw new Error("Incorrect current password");
    
    users[userIndex].password = data.newPassword;
    db.set(DB_KEYS.users, users);
    
    return simulate(undefined);
};

// --- Resumes ---
export const getResumes = async (): Promise<SavedResume[]> => {
  const userId = getCurrentUserId();
  const allResumes = db.get<SavedResume[]>(DB_KEYS.resumes, []);
  return simulate(allResumes.filter(r => r.userId === userId));
};

export const getResume = async (id: string): Promise<SavedResume | null> => {
  const userId = getCurrentUserId();
  const allResumes = db.get<SavedResume[]>(DB_KEYS.resumes, []);
  const resume = allResumes.find(r => r.id === id && r.userId === userId);
  return simulate(resume || null);
};

export const saveResume = async (data: Omit<SavedResume, 'id' | 'userId' | 'lastModified'>): Promise<SavedResume> => {
    const userId = getCurrentUserId();
    const allResumes = db.get<SavedResume[]>(DB_KEYS.resumes, []);
    const newResume: SavedResume = {
        ...data,
        id: uuidv4(),
        userId,
        lastModified: Date.now()
    };
    allResumes.push(newResume);
    db.set(DB_KEYS.resumes, allResumes);
    return simulate(newResume);
};

export const updateResume = async (id: string, data: Partial<Omit<SavedResume, 'id' | 'userId'>>): Promise<SavedResume> => {
    const userId = getCurrentUserId();
    const allResumes = db.get<SavedResume[]>(DB_KEYS.resumes, []);
    const resumeIndex = allResumes.findIndex(r => r.id === id && r.userId === userId);
    if (resumeIndex === -1) throw new Error("Resume not found");
    allResumes[resumeIndex] = { ...allResumes[resumeIndex], ...data, lastModified: Date.now() };
    db.set(DB_KEYS.resumes, allResumes);
    return simulate(allResumes[resumeIndex]);
};

export const deleteResume = async (id: string): Promise<void> => {
    const userId = getCurrentUserId();
    let allResumes = db.get<SavedResume[]>(DB_KEYS.resumes, []);
    allResumes = allResumes.filter(r => !(r.id === id && r.userId === userId));
    db.set(DB_KEYS.resumes, allResumes);
    return simulate(undefined);
};

export const duplicateResume = async (id: string): Promise<SavedResume> => {
    const original = await getResume(id);
    if (!original) throw new Error("Original resume not found");
    const newResumeData = {
        ...original,
        name: `Copy of ${original.name}`,
    };
    delete (newResumeData as any).id;
    return saveResume(newResumeData);
};


// --- Blog & Contact ---
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  return simulate(db.get<BlogPost[]>(DB_KEYS.blogPosts, []));
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost> => {
  const posts = db.get<BlogPost[]>(DB_KEYS.blogPosts, []);
  const post = posts.find(p => p.slug === slug);
  if (!post) throw new Error("Post not found");
  return simulate(post);
};

export const submitContactForm = async (data: { name: string, email: string, message: string }): Promise<void> => {
    console.log("Contact form submitted (mock):", data);
    return simulate(undefined);
};


// --- ADMIN ---

export const getDashboardStats = async (): Promise<AdminStats> => {
    const users = db.get<User[]>(DB_KEYS.users, []);
    const resumes = db.get<SavedResume[]>(DB_KEYS.resumes, []);
    const blogPosts = db.get<BlogPost[]>(DB_KEYS.blogPosts, []);
    const payments = db.get<Payment[]>(DB_KEYS.payments, []);

    return simulate({
        totalUsers: users.length,
        totalResumes: resumes.length,
        totalBlogPosts: blogPosts.length,
        totalPayments: payments.length,
        totalRevenue: payments.reduce((sum, p) => sum + p.amount, 0),
    });
};

export const adminGetAllUsers = async (): Promise<User[]> => {
    const users = db.get<User[]>(DB_KEYS.users, []);
    return simulate(users.map(u => {
        const userWithoutPassword = { ...u };
        delete userWithoutPassword.password;
        return userWithoutPassword;
    }));
};

export const adminUpdateUser = async (id: string, data: Partial<User>): Promise<User> => {
    const users = db.get<User[]>(DB_KEYS.users, []);
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) throw new Error("User not found");
    users[userIndex] = { ...users[userIndex], ...data };
    db.set(DB_KEYS.users, users);
    const userWithoutPassword = { ...users[userIndex] };
    delete userWithoutPassword.password;
    return simulate(userWithoutPassword);
};

export const adminDeleteUser = async (id: string): Promise<void> => {
    let users = db.get<User[]>(DB_KEYS.users, []);
    users = users.filter(u => u.id !== id);
    db.set(DB_KEYS.users, users);
    return simulate(undefined);
};

export const adminGetTemplates = async(): Promise<Template[]> => {
    return simulate(db.get<Template[]>(DB_KEYS.templates, []));
}

export const adminCreateTemplate = async(formData: FormData): Promise<Template> => {
    // This is a simplified mock. A real implementation would handle file uploads.
    const newTemplate: Template = {
        id: uuidv4(),
        name: formData.get('name') as string,
        type: formData.get('type') as 'react' | 'latex',
        hasPhoto: formData.get('hasPhoto') === 'true',
        category: formData.get('category') as string,
        previewImageUrl: 'https://via.placeholder.com/300x424.png?text=New+Template'
    };
    const templates = db.get<Template[]>(DB_KEYS.templates, []);
    templates.push(newTemplate);
    db.set(DB_KEYS.templates, templates);
    return simulate(newTemplate);
};

export const adminUpdateTemplate = async(id: string, formData: FormData): Promise<Template> => {
    const templates = db.get<Template[]>(DB_KEYS.templates, []);
    const index = templates.findIndex(t => t.id === id);
    if (index === -1) throw new Error("Template not found");
    templates[index] = {
        ...templates[index],
        name: formData.get('name') as string,
        type: formData.get('type') as 'react' | 'latex',
        hasPhoto: formData.get('hasPhoto') === 'true',
        category: formData.get('category') as string,
    };
    db.set(DB_KEYS.templates, templates);
    return simulate(templates[index]);
};

export const adminDeleteTemplate = async(id: string): Promise<void> => {
    let templates = db.get<Template[]>(DB_KEYS.templates, []);
    templates = templates.filter(t => t.id !== id);
    db.set(DB_KEYS.templates, templates);
    return simulate(undefined);
};


export const adminGetBlogPosts = async (): Promise<BlogPost[]> => {
    return simulate(db.get<BlogPost[]>(DB_KEYS.blogPosts, []));
};

export const adminCreateBlogPost = async (data: Partial<BlogPost>): Promise<BlogPost> => {
    const posts = db.get<BlogPost[]>(DB_KEYS.blogPosts, []);
    const newPost: BlogPost = {
        id: uuidv4(),
        slug: data.slug || 'new-post',
        title: data.title || 'New Post',
        excerpt: data.excerpt || '',
        content: data.content || '',
        imageUrl: data.imageUrl || 'https://via.placeholder.com/400x200',
        author: data.author || 'Admin',
        authorAvatar: data.authorAvatar || 'https://i.pravatar.cc/150',
        category: data.category || 'General',
        createdAt: new Date().toISOString(),
    };
    posts.push(newPost);
    db.set(DB_KEYS.blogPosts, posts);
    return simulate(newPost);
};

export const adminUpdateBlogPost = async (id: string, data: Partial<BlogPost>): Promise<BlogPost> => {
    const posts = db.get<BlogPost[]>(DB_KEYS.blogPosts, []);
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Post not found");
    posts[index] = { ...posts[index], ...data, updatedAt: new Date().toISOString() };
    db.set(DB_KEYS.blogPosts, posts);
    return simulate(posts[index]);
};

export const adminDeleteBlogPost = async (id: string): Promise<void> => {
    let posts = db.get<BlogPost[]>(DB_KEYS.blogPosts, []);
    posts = posts.filter(p => p.id !== id);
    db.set(DB_KEYS.blogPosts, posts);
    return simulate(undefined);
};

export const adminGetPayments = async (): Promise<Payment[]> => {
    return simulate(db.get<Payment[]>(DB_KEYS.payments, []));
};
