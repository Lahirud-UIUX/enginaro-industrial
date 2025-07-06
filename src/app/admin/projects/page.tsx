'use client';

import React, { useState, useEffect } from 'react';
import { DetailedProject, ProjectFormData } from '@/types/project';
import { Plus, Edit, Trash2, Eye, Save, X, Settings, Tag } from 'lucide-react';
import AdminAuth from '@/components/AdminAuth';
import ImageUpload from '@/components/ImageUpload';

const AdminProjectsPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState<DetailedProject[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<DetailedProject | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    category: '',
    description: '',
    year: new Date().getFullYear().toString(),
    client: '',
    industry: '',
    objective: '',
    engineeringInsight: '',
    scopeOfWork: '',
    challenges: '',
    deliverables: '',
    tags: '',
    status: 'draft'
  });
  const [mainImage, setMainImage] = useState<string>('');
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  
  // Category management state
  const [showCategoryManagement, setShowCategoryManagement] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState('');

  // Check authentication on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch projects - this will only run when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  const handleAuth = () => {
    setIsAuthenticated(true);
    localStorage.setItem('adminAuth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuth={handleAuth} />;
  }

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data.projects);
      setCategories(data.categories);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';
      
      // Include image data in the form submission
      const submitData = {
        ...formData,
        image: mainImage || '/images/who-we-are.png',
        images: additionalImages.length > 0 ? additionalImages : [mainImage || '/images/who-we-are.png']
      };
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        await fetchProjects();
        resetForm();
        alert(editingProject ? 'Project updated successfully!' : 'Project created successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchProjects();
        alert('Project deleted successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project');
    }
  };

  const handleEdit = (project: DetailedProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      year: project.year,
      client: project.client,
      industry: project.industry,
      objective: project.objective,
      engineeringInsight: project.engineeringInsight || '',
      scopeOfWork: project.scopeOfWork.join('\n'),
      challenges: project.challenges.join('\n'),
      deliverables: project.deliverables.join('\n'),
      tags: project.tags.join('\n'),
      status: project.status
    });
    setMainImage(project.image);
    setAdditionalImages(project.images || []);
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingProject(null);
    setFormData({
      title: '',
      category: '',
      description: '',
      year: new Date().getFullYear().toString(),
      client: '',
      industry: '',
      objective: '',
      engineeringInsight: '',
      scopeOfWork: '',
      challenges: '',
      deliverables: '',
      tags: '',
      status: 'draft'
    });
    setMainImage('');
    setAdditionalImages([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Category management functions
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = '/api/categories';
      const method = editingCategory ? 'PUT' : 'POST';
      const body = editingCategory 
        ? { oldName: editingCategory, newName: categoryName }
        : { name: categoryName };
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        await Promise.all([fetchCategories(), fetchProjects()]);
        resetCategoryForm();
        alert(editingCategory ? 'Category updated successfully!' : 'Category created successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Error saving category');
    }
  };

  const handleCategoryDelete = async (categoryName: string) => {
    if (!confirm(`Are you sure you want to delete the category "${categoryName}"?`)) return;
    
    try {
      const response = await fetch('/api/categories', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (response.ok) {
        await Promise.all([fetchCategories(), fetchProjects()]);
        alert('Category deleted successfully!');
      } else {
        const error = await response.json();
        if (error.projectsCount) {
          alert(`Cannot delete category: It is being used by ${error.projectsCount} project(s). Please reassign these projects to other categories first.`);
        } else {
          alert(`Error: ${error.error}`);
        }
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category');
    }
  };

  const handleCategoryEdit = (category: string) => {
    setEditingCategory(category);
    setCategoryName(category);
    setShowCategoryForm(true);
  };

  const resetCategoryForm = () => {
    setShowCategoryForm(false);
    setEditingCategory(null);
    setCategoryName('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: 'var(--loading-spinner)' }}></div>
          <p className="mt-4" style={{ color: 'var(--text-secondary)' }}>Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="rounded-lg shadow-sm p-6 mb-6" style={{ backgroundColor: 'var(--card-background)' }}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Projects CMS</h1>
              <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>Manage your project portfolio</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                Logout
              </button>
              <button
                onClick={() => setShowCategoryManagement(!showCategoryManagement)}
                className="px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                style={{ 
                  backgroundColor: showCategoryManagement ? 'var(--button-secondary)' : 'var(--card-background)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)'
                }}
                onMouseEnter={(e) => {
                  if (!showCategoryManagement) {
                    e.currentTarget.style.backgroundColor = 'var(--table-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showCategoryManagement) {
                    e.currentTarget.style.backgroundColor = 'var(--card-background)';
                  }
                }}
              >
                <Settings size={20} />
                Manage Categories
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                style={{ backgroundColor: 'var(--button-primary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--button-primary-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--button-primary)';
                }}
              >
                <Plus size={20} />
                Add Project
              </button>
            </div>
          </div>
        </div>

        {/* Category Management Section */}
        {showCategoryManagement && (
          <div className="rounded-lg shadow-sm p-6 mb-6" style={{ backgroundColor: 'var(--card-background)' }}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Tag size={24} style={{ color: 'var(--text-primary)' }} />
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Category Management
                </h2>
              </div>
              <button
                onClick={() => setShowCategoryForm(true)}
                className="text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                style={{ backgroundColor: 'var(--button-success)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--button-success-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--button-success)';
                }}
              >
                <Plus size={16} />
                Add Category
              </button>
            </div>

            {/* Categories List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {categories.map((category) => (
                <div 
                  key={category} 
                  className="p-4 rounded-lg flex justify-between items-center"
                  style={{ 
                    backgroundColor: 'var(--table-header-bg)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {category}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCategoryEdit(category)}
                      className="p-1 rounded transition-colors"
                      style={{ color: 'var(--button-warning)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--button-warning-hover)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--button-warning)';
                      }}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleCategoryDelete(category)}
                      className="p-1 rounded transition-colors"
                      style={{ color: 'var(--button-danger)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--button-danger-hover)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--button-danger)';
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {categories.length === 0 && (
              <div className="text-center py-8">
                <p style={{ color: 'var(--text-muted)' }}>No categories found. Create your first category!</p>
              </div>
            )}
          </div>
        )}

        {/* Category Form Modal */}
        {showCategoryForm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'var(--overlay-bg)' }}>
            <div className="rounded-lg p-6 w-full max-w-md" style={{ backgroundColor: 'var(--card-background)' }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <button
                  onClick={resetCategoryForm}
                  className="transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleCategorySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: 'var(--input-background)',
                      border: '1px solid var(--input-border)',
                      color: 'var(--text-primary)'
                    }}
                    placeholder="Enter category name"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={resetCategoryForm}
                    className="px-4 py-2 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    style={{ backgroundColor: editingCategory ? 'var(--button-warning)' : 'var(--button-success)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = editingCategory ? 'var(--button-warning-hover)' : 'var(--button-success-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = editingCategory ? 'var(--button-warning)' : 'var(--button-success)';
                    }}
                  >
                    <Save size={20} />
                    {editingCategory ? 'Update' : 'Create'} Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'var(--overlay-bg)' }}>
            <div className="rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--card-background)' }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button
                  onClick={resetForm}
                  className="transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                      style={{ 
                        backgroundColor: 'var(--input-background)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--text-primary)'
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                      style={{ 
                        backgroundColor: 'var(--input-background)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--text-primary)'
                      }}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Year
                    </label>
                    <input
                      type="text"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                      style={{ 
                        backgroundColor: 'var(--input-background)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--text-primary)'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                      style={{ 
                        backgroundColor: 'var(--input-background)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: 'var(--input-background)',
                      border: '1px solid var(--input-border)',
                      color: 'var(--text-primary)'
                    }}
                    required
                  />
                </div>

                {/* Client & Industry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Client
                    </label>
                    <input
                      type="text"
                      name="client"
                      value={formData.client}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                      style={{ 
                        backgroundColor: 'var(--input-background)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--text-primary)'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Industry
                    </label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                      style={{ 
                        backgroundColor: 'var(--input-background)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--text-primary)'
                      }}
                    />
                  </div>
                </div>

                {/* Objective */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    Objective
                  </label>
                  <textarea
                    name="objective"
                    value={formData.objective}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: 'var(--input-background)',
                      border: '1px solid var(--input-border)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                {/* Engineering Insight */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    Engineering Insight
                  </label>
                  <textarea
                    name="engineeringInsight"
                    value={formData.engineeringInsight}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: 'var(--input-background)',
                      border: '1px solid var(--input-border)',
                      color: 'var(--text-primary)'
                    }}
                    placeholder="Enter engineering insight or technical perspective"
                  />
                </div>

                {/* Arrays - one per line */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Scope of Work (one per line)
                    </label>
                    <textarea
                      name="scopeOfWork"
                      value={formData.scopeOfWork}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                      style={{ 
                        backgroundColor: 'var(--input-background)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--text-primary)'
                      }}
                      placeholder="Enter each item on a new line"
                    />
                  </div>



                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Challenges (one per line)
                    </label>
                    <textarea
                      name="challenges"
                      value={formData.challenges}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                      style={{ 
                        backgroundColor: 'var(--input-background)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--text-primary)'
                      }}
                      placeholder="Enter each challenge on a new line"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Deliverables (one per line)
                    </label>
                    <textarea
                      name="deliverables"
                      value={formData.deliverables}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                      style={{ 
                        backgroundColor: 'var(--input-background)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--text-primary)'
                      }}
                      placeholder="Enter each deliverable on a new line"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    Tags (one per line)
                  </label>
                  <textarea
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: 'var(--input-background)',
                      border: '1px solid var(--input-border)',
                      color: 'var(--text-primary)'
                    }}
                    placeholder="Enter each tag on a new line"
                  />
                </div>

                {/* Image Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <ImageUpload
                      label="Main Project Image"
                      currentImage={mainImage}
                      onImageUpload={setMainImage}
                      onRemove={() => setMainImage('')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Additional Images
                    </label>
                    <div className="space-y-4">
                      {additionalImages.map((image, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <img src={image} alt={`Additional ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                          <span className="flex-1 text-sm" style={{ color: 'var(--text-secondary)' }}>{image}</span>
                          <button
                            type="button"
                            onClick={() => setAdditionalImages(prev => prev.filter((_, i) => i !== index))}
                            className="transition-colors"
                            style={{ color: 'var(--text-danger)' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = 'var(--button-danger-hover)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = 'var(--text-danger)';
                            }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      <ImageUpload
                        label="Add Another Image"
                        onImageUpload={(url) => setAdditionalImages(prev => [...prev, url])}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    style={{ backgroundColor: 'var(--button-primary)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--button-primary-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--button-primary)';
                    }}
                  >
                    <Save size={20} />
                    {editingProject ? 'Update' : 'Create'} Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Projects List */}
        <div className="rounded-lg shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--card-background)' }}>
          <div className="p-6" style={{ borderBottom: '1px solid var(--border)' }}>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              All Projects ({projects.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: 'var(--table-header-bg)' }}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ backgroundColor: 'var(--card-background)', borderColor: 'var(--table-border)' }}>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          {project.title}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          {project.client || 'No client specified'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" style={{ backgroundColor: 'var(--status-info-bg)', color: 'var(--status-info-text)' }}>
                        {project.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`} style={{
                        backgroundColor: project.status === 'published' ? 'var(--status-success-bg)' : 'var(--status-warning-bg)',
                        color: project.status === 'published' ? 'var(--status-success-text)' : 'var(--status-warning-text)'
                      }}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: 'var(--text-muted)' }}>
                      {project.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => window.open(`/projects/${project.id}`, '_blank')}
                          className="transition-colors"
                          style={{ color: 'var(--button-primary)' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--button-primary-hover)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--button-primary)';
                          }}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(project)}
                          className="transition-colors"
                          style={{ color: 'var(--button-warning)' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--button-warning-hover)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--button-warning)';
                          }}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="transition-colors"
                          style={{ color: 'var(--button-danger)' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--button-danger-hover)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--button-danger)';
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <p style={{ color: 'var(--text-muted)' }}>No projects found. Create your first project!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProjectsPage; 