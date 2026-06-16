"use client";
import * as React from 'react';
import { Box, SpeedDial, SpeedDialAction } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useRouter } from 'next/navigation';
import { importCustomers } from '@/lib/storage';

export default function FloatingActionButton() {
  const router = useRouter();
  const fileInputRef = React.useRef(null);

  const loadSheetJS = () => {
    return new Promise((resolve, reject) => {
      if (window.XLSX) {
        resolve(window.XLSX);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
      script.onload = () => resolve(window.XLSX);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const XLSX = await loadSheetJS();
      const reader = new FileReader();
      
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        
        // Convert to JSON array
        const data = XLSX.utils.sheet_to_json(ws);
        
        if (data && data.length > 0) {
          importCustomers(data);
          alert(`Successfully imported ${data.length} customers!`);
          window.location.reload(); // Refresh to show new data
        } else {
          alert('No data found in the file.');
        }
      };
      
      reader.readAsBinaryString(file);
    } catch (err) {
      console.error(err);
      alert('Failed to parse the file. Please check the console.');
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAction = (actionName) => {
    if (actionName === 'Add Customer') {
      router.push('/add-customer');
    } else if (actionName === 'Import from xlsx') {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  const actions = [
    { icon: <PersonAddIcon />, name: 'Add Customer' },
    { icon: <UploadFileIcon />, name: 'Import from xlsx' },
  ];

  return (
    <Box sx={{ position: 'fixed', bottom: 80, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 1000, pointerEvents: 'none' }}>
      <input 
        type="file" 
        accept=".xlsx, .xls, .csv" 
        style={{ display: 'none' }} 
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
      
      <SpeedDial
        ariaLabel="SpeedDial Customer Actions"
        sx={{ 
          position: 'absolute', 
          bottom: 0, 
          right: 16,
          pointerEvents: 'auto',
          '& .MuiSpeedDial-fab': {
            background: 'linear-gradient(45deg, #ff9800 30%, #ffc107 90%)',
            color: '#000',
            boxShadow: '0 4px 20px rgba(255, 152, 0, 0.5)',
            '&:hover': {
              background: 'linear-gradient(45deg, #e68a00 30%, #ffb300 90%)',
            }
          }
        }}
        icon={<AddIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => handleAction(action.name)}
            sx={{
              backgroundColor: '#1a1a1a',
              color: '#ff9800',
              '&:hover': {
                backgroundColor: '#2a2a2a',
                color: '#ffb300',
              },
              '& .MuiSpeedDialAction-tooltipLabel': {
                backgroundColor: '#1a1a1a',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 500,
                border: '1px solid #333',
                whiteSpace: 'nowrap',
              }
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

