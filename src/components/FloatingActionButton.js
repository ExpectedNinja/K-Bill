"use client";
import * as React from 'react';
import { Fab, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useRouter } from 'next/navigation';

export default function FloatingActionButton() {
  const router = useRouter();

  return (
    <Box sx={{ position: 'fixed', bottom: 80, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 1000, pointerEvents: 'none' }}>
      <Fab 
        color="primary" 
        variant="extended" 
        onClick={() => router.push('/add-customer')}
        sx={{ 
          position: 'absolute', 
          bottom: 0, 
          right: 16,
          pointerEvents: 'auto',
          background: 'linear-gradient(45deg, #ff9800 30%, #ffc107 90%)',
          color: '#000',
          fontWeight: 700,
          boxShadow: '0 4px 20px rgba(255, 152, 0, 0.5)',
        }}
      >
        <AddIcon sx={{ mr: 1 }} />
        Add Customer
      </Fab>
    </Box>
  );
}
