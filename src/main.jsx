import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';
import { OSProvider } from './context/OSContext';
import { DeviceStatusProvider } from './context/DeviceStatusContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AudioProvider>
        <DeviceStatusProvider>
          <OSProvider>
            <App />
          </OSProvider>
        </DeviceStatusProvider>
      </AudioProvider>
    </ThemeProvider>
  </React.StrictMode>
);
