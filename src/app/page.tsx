'use client';
import CardLarge from '@/components/CardLarge';
import SimpleBarChart from '@/components/Chart';
import Deposits from '@/components/Dashboard/Deposits';
import Orders from '@/components/Dashboard/Orders';
import BasicPie from '@/components/PieChart';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { GridIcon3x6x3 } from '@/constant/iconCkeditor';
const Item = styled(Paper)(({ theme }) => ({
  // color: 'secondary',
}));
interface Payload {
  name: string;
  slug: string;
  image: string;
  type: string;
  price: number;
  rating: number;
  quantity: number;
  description: string;
}
export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const payload: Payload = {
    name: 'váy hoa to nhí xanhh lè',
    slug: 'ddd34242feddg22454542',
    image: '098343wef4',
    type: 'áo',
    price: 11000,
    rating: 4,
    quantity: 1,
    description: 'vải cotton',
  };

  // const handleTest = async () => {
  //   try {
  //     const res = await axios.post('/products/create', payload);
  //     console.log('res :>> ', res);
  //   } catch (error) {
  //     console.log('error :>> ', error);
  //   }
  // };

  return (
    <>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Button>post</Button>
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
            <Item></Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
