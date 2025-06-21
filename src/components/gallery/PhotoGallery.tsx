import React from 'react';
import { PhotoItem } from '../../types';

interface PhotoGalleryProps {
  photos: PhotoItem[];
  onDelete?: (index: number) => void;
  isAdmin?: boolean;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ 
  photos, 
  onDelete, 
  isAdmin = false 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {photos.map((photo, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="h-48 overflow-hidden">
            <img 
              src={photo.imageUrl} 
              alt={photo.title} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-2 text-gray-800">{photo.title}</h3>
            
            {isAdmin && onDelete && (
              <button 
                onClick={() => onDelete(index)} 
                className="px-4 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ))}

      {photos.length === 0 && (
        <div className="col-span-3 text-center py-10 text-gray-500">
          No photos available yet.
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;