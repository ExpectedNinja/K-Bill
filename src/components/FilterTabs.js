"use client";
import * as React from 'react';
import { Box, Chip } from '@mui/material';

const filters = ["Due Today", "Due Tomorrow", "Unpaid", "Today's Follow up", "Paid", "Advance"];

export default function FilterTabs() {
  const [active, setActive] = React.useState(0);

  return (
    <Box 
      className="hide-scroll"
      sx={{ 
        display: 'flex', 
        overflowX: 'auto', 
        p: 2, 
        gap: 1.5,
        backgroundColor: '#050505',
        borderBottom: '1px solid #1a1a1a'
      }}
    >
      {filters.map((filter, index) => (
        <Chip 
          key={index}
          label={filter} 
          onClick={() => setActive(index)}
          color={active === index ? 'primary' : 'default'}
          sx={{ 
            borderRadius: '16px',
            px: 1,
            backgroundColor: active === index ? 'rgba(255, 152, 0, 0.15)' : '#1a1a1a',
            color: active === index ? '#ff9800' : '#888',
            border: active === index ? '1px solid #ff9800' : '1px solid transparent',
            fontWeight: active === index ? 600 : 400,
            '&:hover': {
              backgroundColor: active === index ? 'rgba(255, 152, 0, 0.25)' : '#2a2a2a',
            }
          }} 
        />
      ))}
    </Box>
  );
}
