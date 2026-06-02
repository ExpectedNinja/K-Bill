"use client";
import * as React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import SatelliteDishIcon from '@mui/icons-material/SettingsInputAntenna';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import AppsIcon from '@mui/icons-material/Apps';

export default function BottomNavigationMenu() {
  const [value, setValue] = React.useState(1);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 1000 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Plan" icon={<SatelliteDishIcon />} />
        <BottomNavigationAction label="Customer" icon={<GroupIcon />} />
        <BottomNavigationAction label="Summary" icon={<BarChartIcon />} />
        <BottomNavigationAction label="Action" icon={<AppsIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
