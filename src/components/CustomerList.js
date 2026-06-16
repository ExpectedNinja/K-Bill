"use client";
import * as React from 'react';
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, useTheme, ListItemButton } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useRouter } from 'next/navigation';
import { getCustomers } from '@/lib/storage';

function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

export default function CustomerList() {
  const theme = useTheme();
  const router = useRouter();
  const [customers, setCustomers] = React.useState([]);

  React.useEffect(() => {
    setCustomers(getCustomers());
  }, []);

  if (customers.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" sx={{ color: '#888' }}>
          No customers found. Click + to add or import.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 10 }}>
      <Box sx={{ p: 2, pb: 1, backgroundColor: '#0a0a0a' }}>
        <Typography variant="subtitle1" sx={{ color: '#ff9800', fontWeight: 500 }}>
          All Customers ({customers.length})
        </Typography>
      </Box>
      <List sx={{ pt: 0 }}>
        {customers.map((cust, index) => {
          const name = cust.Name || 'Unknown';
          const initial = name.charAt(0).toUpperCase();
          const color = stringToColor(name);
          const amount = cust['Balance Amount'] || '₹0';
          const isActive = cust['active/inactive'] !== 'Inactive';
          const isDue = parseFloat(amount.replace(/[^0-9.-]+/g,"")) > 0;
          const status = isActive ? 'Active' : 'Inactive';
          const dueDate = cust['Expiry Date'] || 'N/A';

          return (
            <React.Fragment key={cust.id}>
              <ListItem disablePadding sx={{ py: 0 }}>
                <ListItemButton 
                  onClick={() => router.push(`/customer/${cust.id}`)}
                  sx={{ py: 1.5, px: 2 }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: color, color: theme.palette.getContrastText(color), width: 48, height: 48, fontSize: '1.2rem' }}>
                      {initial}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    disableTypography
                    primary={
                      <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500, mb: 0.25 }}>
                        {name}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <PowerSettingsNewIcon sx={{ fontSize: 14, color: isActive ? '#00e676' : '#ff9800', mr: 0.5 }} />
                        <Typography component="span" variant="body2" sx={{ color: '#888', fontSize: '0.75rem' }}>
                          {status} | Expiry: {dueDate}
                        </Typography>
                      </Box>
                    }
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                    <Box 
                      sx={{ 
                        backgroundColor: isDue ? 'rgba(255, 152, 0, 0.15)' : '#1a1a1a', 
                        color: isDue ? '#ff9800' : '#888',
                        px: 1.5, 
                        py: 0.25, 
                        borderRadius: '12px',
                        fontWeight: 600,
                        border: isDue ? '1px solid rgba(255, 152, 0, 0.3)' : '1px solid transparent',
                        boxShadow: isDue ? '0 0 10px rgba(255, 152, 0, 0.1)' : 'none'
                      }}
                    >
                      {amount.startsWith('₹') ? amount : `₹${amount}`}
                    </Box>
                    {isDue && (
                      <Typography variant="caption" sx={{ color: '#888', mt: 0.5, fontSize: '0.65rem' }}>
                        Due
                      </Typography>
                    )}
                  </Box>
                </ListItemButton>
              </ListItem>
              {index < customers.length - 1 && <Divider sx={{ borderColor: '#111' }} />}
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
}
