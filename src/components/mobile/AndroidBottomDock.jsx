import React from 'react';
import { useOS } from '../../context/OSContext';
import { MessageSquare, Image, Globe, Camera, Music, User } from 'lucide-react';

export const AndroidBottomDock = () => {
  const { activeApp, openApp } = useOS();

  const dockApps = [
    { id: 'contact', name: 'Contact', icon: MessageSquare, color: '#25D366' },
    { id: 'about', name: 'About Me', icon: User, color: '#0052F5' },
    { id: 'portfolio', name: 'Portfolio', icon: Globe, color: '#FF9C0F' },
    { id: 'gallery', name: 'Gallery', icon: Image, color: '#8B5CF6' },
    { id: 'music', name: 'Music Player', icon: Music, color: '#FF9C0F' },
    { id: 'camera', name: 'Camera', icon: Camera, color: '#EC4899' },
  ];

  return (
    <div className="android-bottom-dock-container">
      <div className="android-bottom-dock">
        {dockApps.map(app => {
          const Icon = app.icon;
          const isActive = activeApp === app.id;

          return (
            <button
              key={app.id}
              onClick={() => openApp(app.id)}
              className={`dock-item-mobile ${isActive ? 'active' : ''}`}
              style={{
                color: isActive ? 'var(--color-orange)' : 'var(--text-primary)',
              }}
              aria-label={app.name}
              title={app.name}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
