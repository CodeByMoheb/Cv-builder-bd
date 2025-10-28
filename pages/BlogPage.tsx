import React from 'react';

const blogPosts = [
  {
    category: 'Resume Tips',
    title: '5 Common Resume Mistakes and How to Avoid Them',
    excerpt: 'Your resume is your first impression. Make it count by avoiding these common pitfalls that could cost you an interview.',
    author: 'Jane Doe',
    date: 'Oct 26, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800',
    authorAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a',
  },
  {
    category: 'Career Advice',
    title: 'How to Tailor Your CV for an ATS System',
    excerpt: 'Learn the secrets to optimizing your resume for Applicant Tracking Systems to ensure it gets seen by human recruiters.',
    author: 'John Smith',
    date: 'Oct 22, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800',
    authorAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704b',
  },
  {
    category: 'Interviews',
    title: 'The STAR Method: Acing Your Behavioral Interviews',
    excerpt: 'Master the STAR method to structure your answers and effectively communicate your accomplishments during interviews.',
    author: 'Emily White',
    date: 'Oct 15, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=800',
    authorAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704c',
  },
    {
    category: 'Productivity',
    title: 'Leveraging AI in Your Job Search',
    excerpt: 'Discover how AI tools, like our resume builder, can give you a competitive edge in your hunt for the perfect job.',
    author: 'Admin',
    date: 'Oct 10, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-285f7267a84a?q=80&w=800',
    authorAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
   {
    category: 'Networking',
    title: 'Building Your Personal Brand on LinkedIn',
    excerpt: 'Your LinkedIn profile is more than just an online resume. Learn how to build a brand that attracts opportunities.',
    author: 'Michael Chen',
    date: 'Oct 5, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1611944212129-2995b73643a5?q=80&w=800',
    authorAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
  },
   {
    category: 'Resume Tips',
    title: 'The Power of Action Verbs in Your Resume',
    excerpt: 'Transform your experience section from a passive list of duties into a dynamic showcase of your achievements.',
    author: 'Jane Doe',
    date: 'Sep 28, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800',
    authorAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a',
  },
];

const BlogPage: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-dark">Our Blog</h1>
        <p className="mt-2 text-lg text-muted">Career advice, resume tips, and industry insights to help you land your dream job.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md border overflow-hidden group transform transition-transform duration-300 hover:-translate-y-2">
            <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <p className="text-sm text-primary font-semibold mb-2">{post.category}</p>
              <h2 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
              <p className="text-sm text-muted mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500 border-t pt-4">
                <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p>{post.date}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
