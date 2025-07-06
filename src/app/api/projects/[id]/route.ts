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

// Helper function to parse array strings
function parseArrayString(str: string): string[] {
  return str.split('\n').filter(item => item.trim() !== '').map(item => item.trim());
}

// GET - Get single project
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await readProjectsData();
    
    const project = data.projects.find(p => p.id === id);
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error getting project:', error);
    return NextResponse.json(
      { error: 'Failed to get project' },
      { status: 500 }
    );
  }
}

// PUT - Update project
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData: ProjectFormData = await request.json();
    
    const data = await readProjectsData();
    const projectIndex = data.projects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    // Update project
    const existingProject = data.projects[projectIndex];
    const updatedProject: DetailedProject = {
      ...existingProject,
      title: formData.title || existingProject.title,
      category: formData.category || existingProject.category,
      description: formData.description || existingProject.description,
      year: formData.year || existingProject.year,
      image: (formData as any).image || existingProject.image,
      status: formData.status || existingProject.status,
      updatedAt: new Date().toISOString(),
      images: (formData as any).images || existingProject.images,
      client: formData.client || existingProject.client,
      industry: formData.industry || existingProject.industry,
      objective: formData.objective || existingProject.objective,
      engineeringInsight: formData.engineeringInsight || existingProject.engineeringInsight,
      scopeOfWork: formData.scopeOfWork ? parseArrayString(formData.scopeOfWork) : existingProject.scopeOfWork,
      challenges: formData.challenges ? parseArrayString(formData.challenges) : existingProject.challenges,
      deliverables: formData.deliverables ? parseArrayString(formData.deliverables) : existingProject.deliverables,
      tags: formData.tags ? parseArrayString(formData.tags) : existingProject.tags
    };
    
    data.projects[projectIndex] = updatedProject;
    data.lastUpdated = new Date().toISOString();
    
    // Add category if it's new
    if (formData.category && !data.categories.includes(formData.category)) {
      data.categories.push(formData.category);
    }
    
    await writeProjectsData(data);
    
    return NextResponse.json(
      { message: 'Project updated successfully', project: updatedProject }
    );
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE - Delete project
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await readProjectsData();
    
    const projectIndex = data.projects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    // Remove project
    data.projects.splice(projectIndex, 1);
    data.lastUpdated = new Date().toISOString();
    
    await writeProjectsData(data);
    
    return NextResponse.json(
      { message: 'Project deleted successfully' }
    );
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
} 