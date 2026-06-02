"use client";
import * as React from 'react';
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, useTheme } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const customers = [
  { id: 1, name: 'Suresh Kumar', initial: 'S', color: '#102e3b', amount: '₹0', status: 'Active', dueDate: '30-Jun-26', isDue: false },
  { id: 2, name: 'Nithin Reddy', initial: 'N', color: '#16384a', amount: '₹300', status: 'Active', dueDate: '30-Jun-26', isDue: true },
  { id: 3, name: 'Srinivas Rao', initial: 'S', color: '#ffb300', amount: '₹900', status: 'Active', dueDate: '30-Jun-26', isDue: true },
  { id: 4, name: 'Rajeshwari M', initial: 'R', color: '#1976d2', amount: '₹650', status: 'Active', dueDate: '30-Jun-26', isDue: true },
  { id: 5, name: 'Kavitha S', initial: 'K', color: '#2c3e50', amount: '₹350', status: 'Active', dueDate: '30-Jun-26', isDue: true },
  { id: 6, name: 'Ganesh V', initial: 'G', color: '#e64a19', amount: '₹900', status: 'Active', dueDate: '30-Jun-26', isDue: true },
  { id: 7, name: 'Mahesh Babu', initial: 'M', color: '#0288d1', amount: '₹450', status: 'Active', dueDate: '30-Jun-26', isDue: true },
  { id: 8, name: 'Priyanka T', initial: 'P', color: '#102e3b', amount: '₹300', status: 'Active', dueDate: '30-Jun-26', isDue: true },
  { id: 9, name: 'Anand C', initial: 'A', color: '#d32f2f', amount: '₹500', status: 'Active', dueDate: '30-Jun-26', isDue: true },
  { id: 10, name: 'Bhavana K', initial: 'B', color: '#7b1fa2', amount: '₹750', status: 'Active', dueDate: '30-Jun-26', isDue: true },
  { id: 11, name: 'Chiranjeevi', initial: 'C', color: '#388e3c', amount: '₹200', status: 'Active', dueDate: '30-Jun-26', isDue: true },
  { id: 12, name: 'Deepika R', initial: 'D', color: '#fbc02d', amount: '₹150', status: 'Active', dueDate: '30-Jun-26', isDue: true },
  { id: 13, name: 'Eshwar D', initial: 'E', color: '#f57c00', amount: '₹800', status: 'Active', dueDate: '30-Jun-26', isDue: true },
  { id: 14, name: 'Farooq Ahmed', initial: 'F', color: '#0097a7', amount: '₹600', status: 'Active', dueDate: '30-Jun-26', isDue: true },
  { id: 15, name: 'Gowtham N', initial: 'G', color: '#512da8', amount: '₹400', status: 'Active', dueDate: '30-Jun-26', isDue: true },
  { id: 16, name: 'Hari Krishna', initial: 'H', color: '#c2185b', amount: '₹250', status: 'Active', dueDate: '30-Jun-26', isDue: true },
  { id: 17, name: 'Indira P', initial: 'I', color: '#1976d2', amount: '₹950', status: 'Active', dueDate: '30-Jun-26', isDue: true },
  { id: 18, name: 'Jagadish', initial: 'J', color: '#303f9f', amount: '₹350', status: 'Active', dueDate: '30-Jun-26', isDue: true },
  { id: 19, name: 'Karthik P', initial: 'K', color: '#00796b', amount: '₹700', status: 'Active', dueDate: '30-Jun-26', isDue: true },
  { id: 20, name: 'Lakshmi N', initial: 'L', color: '#e64a19', amount: '₹850', status: 'Active', dueDate: '30-Jun-26', isDue: true },
];

export default function CustomerList() {
  const theme = useTheme();

  return (
    <Box sx={{ pb: 10 }}>
      <Box sx={{ p: 2, pb: 1, backgroundColor: '#0a0a0a' }}>
        <Typography variant="subtitle1" sx={{ color: '#ff9800', fontWeight: 500 }}>
          Durgamma Colony
        </Typography>
      </Box>
      <List sx={{ pt: 0 }}>
        {customers.map((cust, index) => (
          <React.Fragment key={cust.id}>
            <ListItem sx={{ py: 1.5, px: 2 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: cust.color, color: theme.palette.getContrastText(cust.color), width: 48, height: 48, fontSize: '1.2rem' }}>
                  {cust.initial}
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
                disableTypography
                primary={
                  <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500, mb: 0.25 }}>
                    {cust.name}
                  </Typography>
                }
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    <PowerSettingsNewIcon sx={{ fontSize: 14, color: '#ff9800', mr: 0.5 }} />
                    <Typography component="span" variant="body2" sx={{ color: '#888', fontSize: '0.75rem' }}>
                      {cust.status} | Due Date: {cust.dueDate}
                    </Typography>
                  </Box>
                }
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Box 
                  sx={{ 
                    backgroundColor: cust.isDue ? 'rgba(0, 230, 118, 0.15)' : '#1a1a1a', 
                    color: cust.isDue ? '#00e676' : '#888',
                    px: 1.5, 
                    py: 0.25, 
                    borderRadius: '12px',
                    fontWeight: 600,
                    border: cust.isDue ? '1px solid rgba(0, 230, 118, 0.3)' : '1px solid transparent',
                    boxShadow: cust.isDue ? '0 0 10px rgba(0, 230, 118, 0.1)' : 'none'
                  }}
                >
                  {cust.amount}
                </Box>
                {cust.isDue && (
                  <Typography variant="caption" sx={{ color: '#888', mt: 0.5, fontSize: '0.65rem' }}>
                    Due
                  </Typography>
                )}
              </Box>
            </ListItem>
            {index < customers.length - 1 && <Divider sx={{ borderColor: '#111' }} />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
