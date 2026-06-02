import * as React from 'react';
import { Box } from '@mui/material';
import Header from '@/components/Header';
import FilterTabs from '@/components/FilterTabs';
import CustomerList from '@/components/CustomerList';
import FloatingActionButton from '@/components/FloatingActionButton';
import BottomNavigationMenu from '@/components/BottomNavigationMenu';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#000000' }}>
      <Header />
      <FilterTabs />
      <CustomerList />
      <FloatingActionButton />
      <BottomNavigationMenu />
    </Box>
  );
}
