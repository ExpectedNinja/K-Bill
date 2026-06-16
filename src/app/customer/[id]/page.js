"use client";
import * as React from 'react';
import { Box, Typography, IconButton, Paper, Grid, Divider, Chip, Avatar, useTheme, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import RouterIcon from '@mui/icons-material/Router';
import { useRouter } from 'next/navigation';
import { getCustomerById } from '@/lib/storage';

function DetailItem({ icon, label, value }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
      <Box sx={{ color: '#ff9800', mr: 2, mt: 0.5 }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="caption" sx={{ color: '#888', display: 'block', mb: 0.2 }}>
          {label}
        </Typography>
        <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500 }}>
          {value || 'N/A'}
        </Typography>
      </Box>
    </Box>
  );
}

export default function CustomerDetails({ params }) {
  const router = useRouter();
  const theme = useTheme();
  // Unwrap params using React.use() as per Next.js 15+ patterns, or standard params for older.
  // We use standard params directly since it's Next.js 14-like app routing, but we'll unwrap id.
  const id = params?.id;
  const [customer, setCustomer] = React.useState(null);

  React.useEffect(() => {
    if (id) {
      const data = getCustomerById(id);
      setCustomer(data);
    }
  }, [id]);

  if (!customer) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', backgroundColor: '#000', minHeight: '100vh' }}>
        <Typography sx={{ color: '#fff' }}>Loading customer details...</Typography>
      </Box>
    );
  }

  const name = customer.Name || 'Unknown';
  const initial = name.charAt(0).toUpperCase();
  const isActive = customer['active/inactive'] !== 'Inactive';

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#000', pb: 10 }}>
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', backgroundColor: '#0a0a0a', borderBottom: '1px solid #1a1a1a' }}>
        <IconButton onClick={() => router.push('/')} sx={{ color: '#ff9800', mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
          Customer Details
        </Typography>
      </Box>

      {/* Profile Section */}
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(180deg, #111 0%, #000 100%)' }}>
        <Avatar sx={{ width: 80, height: 80, bgcolor: '#ff9800', color: '#000', fontSize: '2.5rem', mb: 2, boxShadow: '0 0 20px rgba(255, 152, 0, 0.3)' }}>
          {initial}
        </Avatar>
        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 0.5 }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#aaa', mb: 2 }}>
          {customer['customer_code'] ? `Code: ${customer['customer_code']}` : 'No Customer Code'}
        </Typography>
        <Chip 
          label={isActive ? 'Active' : 'Inactive'} 
          sx={{ 
            backgroundColor: isActive ? 'rgba(0, 230, 118, 0.15)' : 'rgba(255, 50, 50, 0.15)', 
            color: isActive ? '#00e676' : '#ff3d00',
            fontWeight: 600,
            border: isActive ? '1px solid rgba(0, 230, 118, 0.3)' : '1px solid rgba(255, 50, 50, 0.3)'
          }} 
        />
      </Box>

      {/* Main Info Card */}
      <Box sx={{ px: 2, mt: 2 }}>
        <Paper sx={{ p: 2.5, backgroundColor: '#111', borderRadius: '16px', border: '1px solid #222' }}>
          <Typography variant="subtitle2" sx={{ color: '#ff9800', mb: 2, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
            Primary Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DetailItem icon={<PhoneIcon />} label="Mobile" value={customer.Mobile} />
            </Grid>
            <Grid item xs={6}>
              <DetailItem icon={<PersonIcon />} label="Bill Name" value={customer['Bill Name']} />
            </Grid>
            <Grid item xs={12}>
              <DetailItem icon={<HomeIcon />} label="Locality" value={customer.Locality} />
            </Grid>
            <Grid item xs={12}>
              <DetailItem icon={<HomeIcon />} label="Billing Address" value={customer['Billing Address']} />
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Billing & Plan Card */}
      <Box sx={{ px: 2, mt: 2 }}>
        <Paper sx={{ p: 2.5, backgroundColor: '#111', borderRadius: '16px', border: '1px solid #222' }}>
          <Typography variant="subtitle2" sx={{ color: '#ff9800', mb: 2, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
            Billing & Plan
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DetailItem icon={<PaymentIcon />} label="Balance Amount" value={customer['Balance Amount']} />
            </Grid>
            <Grid item xs={6}>
              <DetailItem icon={<PaymentIcon />} label="Plan Amount" value={customer['Plan amount']} />
            </Grid>
            <Grid item xs={12}>
              <DetailItem icon={<RouterIcon />} label="Plan Name" value={customer['Plan Name']} />
            </Grid>
            <Grid item xs={6}>
              <DetailItem icon={<DateRangeIcon />} label="Type" value={customer['Prepaid/postpaid']} />
            </Grid>
            <Grid item xs={6}>
              <DetailItem icon={<DateRangeIcon />} label="Interval" value={customer['Billing Interval']} />
            </Grid>
            <Grid item xs={6}>
              <DetailItem icon={<DateRangeIcon />} label="Connection Date" value={customer['Connection Start Date']} />
            </Grid>
            <Grid item xs={6}>
              <DetailItem icon={<DateRangeIcon />} label="Expiry Date" value={customer['Expiry Date']} />
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Hardware Details Card */}
      <Box sx={{ px: 2, mt: 2, mb: 4 }}>
        <Paper sx={{ p: 2.5, backgroundColor: '#111', borderRadius: '16px', border: '1px solid #222' }}>
          <Typography variant="subtitle2" sx={{ color: '#ff9800', mb: 2, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
            Hardware Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DetailItem icon={<RouterIcon />} label="STB Name" value={customer['STB Name']} />
            </Grid>
            <Grid item xs={12}>
              <DetailItem icon={<RouterIcon />} label="Settop Box Number" value={customer['Settop Box Number']} />
            </Grid>
            <Grid item xs={12}>
              <DetailItem icon={<RouterIcon />} label="Card Number" value={customer['Card Number']} />
            </Grid>
            <Grid item xs={6}>
              <DetailItem icon={<PersonIcon />} label="Membership No" value={customer['membership no']} />
            </Grid>
            <Grid item xs={6}>
              <DetailItem icon={<PaymentIcon />} label="Sequence No" value={customer['Sequence No']} />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}
