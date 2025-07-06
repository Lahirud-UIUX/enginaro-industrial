import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { ProjectsData } from '@/types/project';

const DATA_FILE = path.join(process.cwd(), 'src/data/projects.json');

// Helper function to read projects data
async function readProjectsData(): Promise<ProjectsData> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading projects data:', error);
    throw new Error('Failed to read projects data');
  }
}

// Helper function to write projects data
async function writeProjectsData(data: ProjectsData): Promise<void> {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing projects data:', error);
    throw new Error('Failed to write projects data');
  }
}

// GET - Get all categories
export async function GET() {
  try {
    const data = await readProjectsData();
    return NextResponse.json({
      categories: data.categories
    });
  } catch (error) {
    console.error('Error getting categories:', error);
    return NextResponse.json(
      { error: 'Failed to get categories' },
      { status: 500 }
    );
  }
}

// POST - Create new category
export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    
    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Category name is required and must be a non-empty string' },
        { status: 400 }
      );
    }
    
    const trimmedName = name.trim();
    const data = await readProjectsData();
    
    // Check if category already exists (case-insensitive)
    const existingCategory = data.categories.find(
      cat => cat.toLowerCase() === trimmedName.toLowerCase()
    );
    
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category already exists' },
        { status: 409 }
      );
    }
    
    // Add new category
    data.categories.push(trimmedName);
    data.categories.sort(); // Keep categories sorted
    data.lastUpdated = new Date().toISOString();
    
    await writeProjectsData(data);
    
    return NextResponse.json(
      { message: 'Category created successfully', category: trimmedName },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

// PUT - Update category
export async function PUT(request: Request) {
  try {
    const { oldName, newName } = await request.json();
    
    // Validate required fields
    if (!oldName || !newName || typeof oldName !== 'string' || typeof newName !== 'string') {
      return NextResponse.json(
        { error: 'Both old and new category names are required' },
        { status: 400 }
      );
    }
    
    const trimmedOldName = oldName.trim();
    const trimmedNewName = newName.trim();
    
    if (trimmedNewName.length === 0) {
      return NextResponse.json(
        { error: 'New category name cannot be empty' },
        { status: 400 }
      );
    }
    
    const data = await readProjectsData();
    
    // Find the category to update
    const categoryIndex = data.categories.findIndex(cat => cat === trimmedOldName);
    if (categoryIndex === -1) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    // Check if new name already exists (case-insensitive, excluding current)
    const existingCategory = data.categories.find(
      (cat, index) => index !== categoryIndex && cat.toLowerCase() === trimmedNewName.toLowerCase()
    );
    
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with new name already exists' },
        { status: 409 }
      );
    }
    
    // Update category name
    data.categories[categoryIndex] = trimmedNewName;
    data.categories.sort(); // Keep categories sorted
    
    // Update all projects that use this category
    data.projects.forEach(project => {
      if (project.category === trimmedOldName) {
        project.category = trimmedNewName;
        project.updatedAt = new Date().toISOString();
      }
    });
    
    data.lastUpdated = new Date().toISOString();
    
    await writeProjectsData(data);
    
    return NextResponse.json(
      { message: 'Category updated successfully', category: trimmedNewName }
    );
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE - Delete category
export async function DELETE(request: Request) {
  try {
    const { name } = await request.json();
    
    // Validate required fields
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }
    
    const trimmedName = name.trim();
    const data = await readProjectsData();
    
    // Find the category to delete
    const categoryIndex = data.categories.findIndex(cat => cat === trimmedName);
    if (categoryIndex === -1) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    // Check if any projects use this category
    const projectsUsingCategory = data.projects.filter(project => project.category === trimmedName);
    if (projectsUsingCategory.length > 0) {
      return NextResponse.json(
        { 
          error: 'Cannot delete category because it is being used by projects',
          projectsCount: projectsUsingCategory.length,
          projects: projectsUsingCategory.map(p => ({ id: p.id, title: p.title }))
        },
        { status: 409 }
      );
    }
    
    // Remove category
    data.categories.splice(categoryIndex, 1);
    data.lastUpdated = new Date().toISOString();
    
    await writeProjectsData(data);
    
    return NextResponse.json(
      { message: 'Category deleted successfully' }
    );
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
} 