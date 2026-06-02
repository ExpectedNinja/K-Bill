"use client";
import * as React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const amoledTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#0a0a0a',
    },
    primary: {
      main: '#ff9800', // vibrant orange from the FAB
    },
    secondary: {
      main: '#00e676', // neon green for amounts
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)', // softer white
      secondary: 'rgba(255, 255, 255, 0.60)',
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a0a0a',
          backgroundImage: 'none',
          boxShadow: '0 1px 3px rgba(255,255,255,0.05)',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a0a0a',
          borderTop: '1px solid #222',
          height: '64px',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: '#888',
          '&.Mui-selected': {
            color: '#ff9800',
          }
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '24px',
          padding: '0 24px',
          boxShadow: '0 4px 14px rgba(255, 152, 0, 0.4)',
        }
      }
    }
  },
});

export default function ThemeRegistry({ children }) {
  return (
    <ThemeProvider theme={amoledTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
