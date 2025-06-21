import React from 'react';

interface BackgroundImageProps {
  imageUrl?: string;
  opacity?: number;
  children: React.ReactNode;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ 
  imageUrl = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", 
  opacity = 0.05,
  children 
}) => {
  return (
    <div className="relative min-h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${imageUrl})`,
          opacity: opacity,
          zIndex: -1
        }}
      />
      {children}
    </div>
  );
};

export default BackgroundImage;