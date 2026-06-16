"use client";
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, AppBar, Toolbar, IconButton, Typography, TextField, 
  Button, Collapse, InputAdornment, Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import ContactsIcon from '@mui/icons-material/Contacts';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function AddCustomer() {
  const router = useRouter();
  const [showMore, setShowMore] = React.useState(false);
  const [showLocation, setShowLocation] = React.useState(false);
  const [bNo, setBNo] = React.useState("B-001");

  // Controlled states for inputs
  const [customerName, setCustomerName] = React.useState('');
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [billingArea, setBillingArea] = React.useState('');
  
  // More Details states
  const [mobileNumber2, setMobileNumber2] = React.useState('');
  const [remark, setRemark] = React.useState('');
  const [billingName, setBillingName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [customerCode, setCustomerCode] = React.useState('');
  const [securityDeposit, setSecurityDeposit] = React.useState('');
  const [gstNumber, setGstNumber] = React.useState('');

  // Location states
  const [mapLocation, setMapLocation] = React.useState('');
  const [address, setAddress] = React.useState('');

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#0a0a0a',
      borderRadius: '8px',
      color: '#fff',
      '& fieldset': {
        borderColor: '#333',
      },
      '&:hover fieldset': {
        borderColor: '#555',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ff9800',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#888',
      '&.Mui-focused': {
        color: '#ff9800',
      }
    },
    mb: 2
  };

  const handleContactPicker = async (nameSetter, phoneSetter) => {
    if ('contacts' in navigator && 'ContactsManager' in window) {
      try {
        const props = ['name', 'tel'];
        const opts = { multiple: false };
        const contacts = await navigator.contacts.select(props, opts);
        
        if (contacts && contacts.length > 0) {
          const contact = contacts[0];
          if (nameSetter && contact.name && contact.name.length > 0) {
            nameSetter(contact.name[0]);
          }
          if (phoneSetter && contact.tel && contact.tel.length > 0) {
            phoneSetter(contact.tel[0].replace(/[^0-9+]/g, '')); // clean phone number
          }
        }
      } catch (ex) {
        console.error('Contact picker error:', ex);
      }
    } else {
      alert('Contact Picker API is not supported on this browser. (Requires Chrome on Android)');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#000000', pb: 10 }}>
      {/* Header */}
      <AppBar position="sticky" sx={{ backgroundColor: '#050505', backgroundImage: 'none', borderBottom: '1px solid #1a1a1a', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => router.back()} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: '500' }}>
            Add Customer
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        {/* Banner */}
        <Paper 
          sx={{ 
            p: 1.5, 
            mb: 3, 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: 'rgba(255, 152, 0, 0.1)', 
            border: '1px solid rgba(255, 152, 0, 0.3)',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          <PlayCircleFilledIcon sx={{ color: '#ff3d00', mr: 1.5 }} />
          <Typography variant="body2" sx={{ flexGrow: 1, color: '#ff9800', fontWeight: 500 }}>
            How to add customer in K-Bill App
          </Typography>
          <KeyboardArrowRightIcon sx={{ color: '#ff9800' }} />
        </Paper>

        {/* Form Fields */}
        <TextField
          fullWidth
          label="Customer Name(*)"
          variant="outlined"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          sx={inputStyles}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => handleContactPicker(setCustomerName, setMobileNumber)}>
                    <ContactsIcon sx={{ color: '#ff9800' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }
          }}
        />

        <TextField
          fullWidth
          label="Mobile Number (Optional)"
          variant="outlined"
          type="tel"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          sx={inputStyles}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => handleContactPicker(null, setMobileNumber)}>
                    <ContactsIcon sx={{ color: '#ff9800' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }
          }}
        />

        <TextField
          fullWidth
          label="Billing Area (Optional)"
          variant="outlined"
          value={billingArea}
          onChange={(e) => setBillingArea(e.target.value)}
          sx={inputStyles}
        />

        {/* Add More Details Section */}
        <Box sx={{ mt: 1, mb: 2 }}>
          <Typography 
            variant="body2" 
            sx={{ color: '#ff3d00', cursor: 'pointer', fontWeight: 500, py: 1 }}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? '- Hide Details' : '+ Add More Details'}
          </Typography>
          
          <Collapse in={showMore}>
            <Box sx={{ pt: 1 }}>
              <TextField
                fullWidth
                label="Mobile Number 2"
                variant="outlined"
                type="tel"
                value={mobileNumber2}
                onChange={(e) => setMobileNumber2(e.target.value)}
                sx={inputStyles}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={() => handleContactPicker(null, setMobileNumber2)}>
                          <ContactsIcon sx={{ color: '#ff9800' }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                }}
              />
              <TextField 
                fullWidth 
                label="Remark(Optional)" 
                variant="outlined" 
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                sx={inputStyles} 
              />
              <TextField
                fullWidth
                label="B.No."
                variant="outlined"
                value={bNo}
                disabled
                sx={{
                  ...inputStyles,
                  '& .MuiOutlinedInput-root.Mui-disabled': {
                    backgroundColor: '#111',
                    '& fieldset': { borderColor: '#222' }
                  },
                  '& .MuiInputLabel-root.Mui-disabled': { color: '#666' },
                  '& .MuiInputBase-input.Mui-disabled': { color: '#aaa', WebkitTextFillColor: '#aaa' }
                }}
              />
              <TextField 
                fullWidth 
                label="Customer Billing Name(*)" 
                variant="outlined" 
                value={billingName}
                onChange={(e) => setBillingName(e.target.value)}
                sx={inputStyles} 
              />
              <TextField 
                fullWidth 
                label="Email" 
                variant="outlined" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={inputStyles} 
              />
              <TextField 
                fullWidth 
                label="Customer Code" 
                variant="outlined" 
                value={customerCode}
                onChange={(e) => setCustomerCode(e.target.value)}
                sx={inputStyles} 
              />
              <TextField 
                fullWidth 
                label="Security Deposit" 
                variant="outlined" 
                type="number" 
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(e.target.value)}
                sx={inputStyles} 
              />
              <TextField 
                fullWidth 
                label="GST Number" 
                variant="outlined" 
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
                sx={inputStyles} 
              />
            </Box>
          </Collapse>
        </Box>

        {/* Add Customer Location Section */}
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="body2" 
            sx={{ color: '#ff3d00', cursor: 'pointer', fontWeight: 500, py: 1 }}
            onClick={() => setShowLocation(!showLocation)}
          >
            {showLocation ? '- Hide Customer Location' : '+ Add Customer Location'}
          </Typography>
          
          <Collapse in={showLocation}>
            <Box sx={{ pt: 1 }}>
              <TextField
                fullWidth
                label="Set customer location on map"
                placeholder="Please add your customer location. Click on side icon"
                variant="outlined"
                multiline
                rows={2}
                value={mapLocation}
                onChange={(e) => setMapLocation(e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true },
                  input: {
                    endAdornment: (
                      <InputAdornment position="end" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                        <IconButton edge="end">
                          <LocationOnIcon sx={{ color: '#ff9800', fontSize: '2rem' }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                }}
                sx={inputStyles}
              />
              <TextField
                fullWidth
                label="Flat/ House No./ Floor/ Building"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={inputStyles}
              />
            </Box>
          </Collapse>
        </Box>

      </Box>

      {/* Fixed Bottom ADD Button */}
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 1000 }}>
        <Button 
          fullWidth 
          variant="contained" 
          sx={{ 
            height: '60px', 
            borderRadius: 0, 
            backgroundColor: '#ff9800', 
            color: '#000',
            fontWeight: 700,
            fontSize: '1.1rem',
            '&:hover': {
              backgroundColor: '#e68a00'
            }
          }}
        >
          ADD
        </Button>
      </Box>
    </Box>
  );
}
