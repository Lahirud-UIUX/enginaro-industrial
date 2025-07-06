'use client';

import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  currentImage?: string;
  onRemove?: () => void;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUpload, 
  currentImage, 
  onRemove, 
  label = "Upload Image" 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onImageUpload(data.url);
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
        {label}
      </label>
      
      {currentImage ? (
        <div className="relative">
          <img 
            src={currentImage} 
            alt="Uploaded" 
            className="w-full h-48 object-cover rounded-lg"
            style={{ border: '1px solid var(--border)' }}
          />
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 text-white rounded-full p-1 transition-colors"
              style={{ backgroundColor: 'var(--button-danger)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--button-danger-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--button-danger)';
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isUploading ? 'pointer-events-none opacity-50' : ''
          }`}
          style={{
            borderColor: dragActive ? 'var(--button-primary)' : 'var(--border)',
            backgroundColor: dragActive ? 'var(--status-info-bg)' : 'transparent'
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
          onMouseEnter={(e) => {
            if (!dragActive) {
              e.currentTarget.style.borderColor = 'var(--text-muted)';
            }
          }}
          onMouseLeave={(e) => {
            if (!dragActive) {
              e.currentTarget.style.borderColor = 'var(--border)';
            }
          }}
        >
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
          
          <div className="flex flex-col items-center">
            <Upload size={48} className="mb-4" style={{ color: 'var(--text-muted)' }} />
            {isUploading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 mr-2" style={{ borderColor: 'var(--loading-spinner)' }}></div>
                <span style={{ color: 'var(--text-secondary)' }}>Uploading...</span>
              </div>
            ) : (
              <>
                <p className="mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Drag and drop an image here, or click to select
                </p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  PNG, JPG, GIF, WebP up to 5MB
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 