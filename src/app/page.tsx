'use client';
import CardLarge from '@/components/CardLarge';
import SimpleBarChart from '@/components/Chart';
import BasicPie from '@/components/PieChart';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const Item = styled(Paper)(({ theme }) => ({
  // color: 'secondary',
}));
export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <Item>
            <CardLarge />
          </Item>
        </Grid>
        <Grid item xs={6} md={4}>
          <CardLarge />
        </Grid>
        <Grid item xs={6} md={4}>
          <Item>
            <BasicPie />
          </Item>
        </Grid>
        <Grid item xs={6} md={8}>
          <Item>
            <SimpleBarChart />
          </Item>
        </Grid>
        <Grid xs={6} md={8}>
          <Item></Item>
        </Grid>
        <Grid xs={6} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
