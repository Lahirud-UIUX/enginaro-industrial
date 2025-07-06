import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { ProjectsData, DetailedProject, ProjectFormData } from '@/types/project';

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

// Helper function to generate unique ID
function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// Helper function to parse array strings
function parseArrayString(str: string): string[] {
  return str.split('\n').filter(item => item.trim() !== '').map(item => item.trim());
}

// GET - Get all projects
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    
    const data = await readProjectsData();
    
    // Filter by status if provided
    const filteredProjects = status 
      ? data.projects.filter(project => project.status === status)
      : data.projects;
    
    return NextResponse.json({
      projects: filteredProjects,
      categories: data.categories,
      lastUpdated: data.lastUpdated
    });
  } catch (error) {
    console.error('Error getting projects:', error);
    return NextResponse.json(
      { error: 'Failed to get projects' },
      { status: 500 }
    );
  }
}

// POST - Create new project
export async function POST(request: Request) {
  try {
    const formData: ProjectFormData = await request.json();
    
    // Validate required fields
    if (!formData.title || !formData.category || !formData.description) {
      return NextResponse.json(
        { error: 'Title, category, and description are required' },
        { status: 400 }
      );
    }
    
    const data = await readProjectsData();
    
    // Create new project
    const newProject: DetailedProject = {
      id: generateId(),
      title: formData.title,
      category: formData.category,
      description: formData.description,
      year: formData.year || new Date().getFullYear().toString(),
      image: (formData as any).image || '/images/who-we-are.png',
      status: formData.status || 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      images: (formData as any).images || ['/images/who-we-are.png'],
      client: formData.client || '',
      industry: formData.industry || '',
      objective: formData.objective || '',
      engineeringInsight: formData.engineeringInsight || '',
      scopeOfWork: parseArrayString(formData.scopeOfWork || ''),
      challenges: parseArrayString(formData.challenges || ''),
      deliverables: parseArrayString(formData.deliverables || ''),
      tags: parseArrayString(formData.tags || '')
    };
    
    // Add new project to data
    data.projects.push(newProject);
    data.lastUpdated = new Date().toISOString();
    
    // Add category if it's new
    if (!data.categories.includes(formData.category)) {
      data.categories.push(formData.category);
    }
    
    await writeProjectsData(data);
    
    return NextResponse.json(
      { message: 'Project created successfully', project: newProject },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
} 