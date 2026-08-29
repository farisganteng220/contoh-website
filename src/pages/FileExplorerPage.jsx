import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { WindowFrame } from '../components/common/WindowFrame';
import { Lightbox } from '../components/common/Lightbox';
import { useOS } from '../context/OSContext';
import {
  FolderTree,
  Folder,
  File,
  LayoutGrid,
  List,
  Search,
  ChevronRight,
  Download,
  Eye,
  Sparkles,
  HardDrive,
  Clock,
  CheckCircle2,
  Filter,
  Layers,
} from 'lucide-react';

export const FileExplorerPage = () => {
  const { isMobile } = useOS();
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [viewMode, setViewMode] = useState('list'); // Default list mode for clean mobile experience
  const [searchTerm, setSearchTerm] = useState('');
  const [activePreviewFile, setActivePreviewFile] = useState(null);

  const folders = ['All', 'Graphic Design', 'Photo Editing', 'Video Projects', 'Branding', 'Archive'];

  const filteredFiles = siteConfig.portfolioFiles.filter(file => {
    const matchesFolder = selectedFolder === 'All' || file.folder === selectedFolder;
    const matchesSearch =
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFolder && matchesSearch;
  });

  // ==========================================
  // MOBILE VIEW: Android Files by Google Style (List View Default)
  // ==========================================
  if (isMobile) {
    return (
      <WindowFrame title="Files by Google (Android 16)" icon={FolderTree} badgeText="Files OS">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Mobile Search Bar */}
          <div className="search-bar" style={{ maxWidth: '100%', padding: '10px 16px' }}>
            <Search size={18} className="text-orange" />
            <input
              type="text"
              placeholder="Cari file portfolio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Android Storage Card */}
          <div
            className="glass-card"
            style={{
              padding: '16px 18px',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--bg-surface)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HardDrive size={18} className="text-orange" />
                <span style={{ fontSize: '0.92rem', fontWeight: 800 }}>Penyimpanan Internal</span>
              </div>
              <span className="badge badge-orange" style={{ fontSize: '0.68rem' }}>
                142 GB / 512 GB
              </span>
            </div>

            {/* Storage Progress Bar */}
            <div
              style={{
                width: '100%',
                height: '8px',
                background: 'var(--border-medium)',
                borderRadius: '4px',
                overflow: 'hidden',
                marginTop: '6px',
              }}
            >
              <div
                style={{
                  width: '28%',
                  height: '100%',
                  background: 'var(--color-orange)',
                  borderRadius: '4px',
                }}
              />
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
              Tersedia 370 GB • File Portfolio Kreatif & Assets Master
            </span>
          </div>

          {/* Folder Category Horizontal Chips */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Kategori Folder
              </span>
              <span style={{ fontSize: '0.74rem', color: 'var(--color-orange)', fontWeight: 700 }}>
                {filteredFiles.length} File Ditemukan
              </span>
            </div>

            <div className="filter-pills" style={{ paddingBottom: '4px' }}>
              {folders.map(folder => {
                const isSelected = selectedFolder === folder;
                return (
                  <button
                    key={folder}
                    onClick={() => setSelectedFolder(folder)}
                    className={`filter-pill ${isSelected ? 'active' : ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      fontSize: '0.8rem',
                    }}
                  >
                    <Folder size={14} />
                    <span>{folder}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile All Files List Section (Default Clean List Mode) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Semua File ({filteredFiles.length})
              </span>
              <span className="badge badge-glass" style={{ fontSize: '0.68rem' }}>
                Mode List
              </span>
            </div>

            {/* Android Files by Google List Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredFiles.map(file => (
                <div
                  key={file.id}
                  onClick={() => setActivePreviewFile(file)}
                  className="glass-card btn-press"
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      flexShrink: 0,
                      position: 'relative',
                      background: 'var(--bg-surface)',
                    }}
                  >
                    <img
                      src={file.preview}
                      alt={file.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4
                      style={{
                        fontSize: '0.88rem',
                        margin: '0 0 4px 0',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {file.name}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      <span className="badge badge-orange" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                        {file.folder}
                      </span>
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>{file.modified}</span>
                    </div>
                  </div>

                  <button
                    className="btn btn-glass btn-sm"
                    style={{ padding: '6px 10px', fontSize: '0.74rem', borderRadius: 'var(--radius-pill)', color: 'var(--color-orange)' }}
                  >
                    <Eye size={14} />
                    <span>Lihat</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lightbox Preview */}
        {activePreviewFile && (
          <Lightbox
            isOpen={Boolean(activePreviewFile)}
            image={activePreviewFile.preview}
            title={activePreviewFile.name}
            caption={`${activePreviewFile.folder} • ${activePreviewFile.type} (${activePreviewFile.size})`}
            onClose={() => setActivePreviewFile(null)}
          />
        )}
      </WindowFrame>
    );
  }

  // ==========================================
  // DESKTOP & TABLET VIEW: ChromeOS / FydeOS Dual Pane
  // ==========================================
  return (
    <WindowFrame title="Portfolio Files / OS File Explorer" icon={FolderTree} badgeText="Storage: 512 GB SSD">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Top Explorer Controls Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-orange)' }}>
              <HardDrive size={16} />
              Vantara_OS_Root
            </span>
            <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Portfolio_Files</span>
            {selectedFolder !== 'All' && (
              <>
                <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                <span className="badge badge-orange">{selectedFolder}</span>
              </>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Search Input */}
            <div className="search-bar" style={{ padding: '6px 14px', maxWidth: '240px' }}>
              <Search size={16} className="text-orange" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Grid / List View Toggle for Desktop */}
            <div style={{ display: 'flex', background: 'var(--bg-surface)', padding: '3px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-medium)' }}>
              <button
                onClick={() => setViewMode('grid')}
                className={`btn-press ${viewMode === 'grid' ? 'badge-orange' : ''}`}
                style={{ padding: '6px 10px', borderRadius: 'var(--radius-pill)', cursor: 'pointer' }}
                title="Grid View"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`btn-press ${viewMode === 'list' ? 'badge-orange' : ''}`}
                style={{ padding: '6px 10px', borderRadius: 'var(--radius-pill)', cursor: 'pointer' }}
                title="List View"
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Explorer Body (Sidebar Folders + File Area) */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px', alignItems: 'start' }}>
          {/* Left Folder Tree Sidebar */}
          <div
            className="glass-card"
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', padding: '0 8px 8px 8px' }}>
              Quick Folders
            </span>
            {folders.map(folder => {
              const isSelected = selectedFolder === folder;
              const count = folder === 'All'
                ? siteConfig.portfolioFiles.length
                : siteConfig.portfolioFiles.filter(f => f.folder === folder).length;

              return (
                <button
                  key={folder}
                  onClick={() => setSelectedFolder(folder)}
                  className="btn-press"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'var(--color-orange-subtle)' : 'transparent',
                    color: isSelected ? 'var(--color-orange)' : 'var(--text-primary)',
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Folder size={16} className={isSelected ? 'text-orange' : 'text-blue'} />
                    <span>{folder}</span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Right Files Container */}
          <div style={{ minHeight: '380px' }}>
            {viewMode === 'grid' ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
                  gap: '16px',
                }}
              >
                {filteredFiles.map(file => (
                  <div
                    key={file.id}
                    onClick={() => setActivePreviewFile(file)}
                    className="glass-card hover-lift btn-press"
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-lg)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <div
                      style={{
                        height: '120px',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        position: 'relative',
                        background: 'var(--bg-surface)',
                      }}
                    >
                      <img
                        src={file.preview}
                        alt={file.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span
                        className="badge badge-orange"
                        style={{ position: 'absolute', top: '6px', left: '6px', fontSize: '0.64rem' }}
                      >
                        {file.type}
                      </span>
                    </div>

                    <div>
                      <h4
                        style={{
                          fontSize: '0.85rem',
                          margin: '0 0 4px 0',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        title={file.name}
                      >
                        {file.name}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        <span>{file.size}</span>
                        <span>{file.modified}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View Table for Desktop */
              <div className="glass-card" style={{ padding: '16px', borderRadius: 'var(--radius-lg)', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-medium)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '10px 12px' }}>File Name</th>
                      <th style={{ padding: '10px 12px' }}>Folder</th>
                      <th style={{ padding: '10px 12px' }}>Type</th>
                      <th style={{ padding: '10px 12px' }}>Size</th>
                      <th style={{ padding: '10px 12px' }}>Modified</th>
                      <th style={{ padding: '10px 12px', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFiles.map(file => (
                      <tr
                        key={file.id}
                        onClick={() => setActivePreviewFile(file)}
                        style={{
                          borderBottom: '1px solid var(--border-medium)',
                          cursor: 'pointer',
                          transition: 'background var(--transition-fast)',
                        }}
                        className="btn-press"
                      >
                        <td style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                          <File size={16} className="text-orange" />
                          <span>{file.name}</span>
                        </td>
                        <td style={{ padding: '10px 12px' }}>
                          <span className="badge badge-glass">{file.folder}</span>
                        </td>
                        <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{file.type}</td>
                        <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{file.size}</td>
                        <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{file.modified}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActivePreviewFile(file);
                            }}
                            className="btn btn-primary-orange btn-sm"
                            style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                          >
                            Preview
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* File Preview Lightbox */}
      {activePreviewFile && (
        <Lightbox
          isOpen={Boolean(activePreviewFile)}
          image={activePreviewFile.preview}
          title={activePreviewFile.name}
          caption={`${activePreviewFile.folder} • ${activePreviewFile.type} (${activePreviewFile.size}) • Tags: ${activePreviewFile.tags.join(', ')}`}
          onClose={() => setActivePreviewFile(null)}
        />
      )}
    </WindowFrame>
  );
};
