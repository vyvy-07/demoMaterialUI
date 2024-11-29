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
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 100">
          <g fill="none" stroke="black" stroke-width="1">
            <rect x="10" y="10" width="50" height="50" stroke="black" />
            <text x="25" y="40" font-family="Arial" font-size="20" fill="black">
              66
            </text>

            <rect x="70" y="10" width="50" height="50" stroke="black" />
            <text x="85" y="40" font-family="Arial" font-size="20" fill="black">
              39
            </text>

            <rect x="130" y="10" width="50" height="50" stroke="black" />
            <text
              x="145"
              y="40"
              font-family="Arial"
              font-size="20"
              fill="black"
            >
              93
            </text>

            <rect x="190" y="10" width="50" height="50" stroke="black" />
            <text
              x="205"
              y="40"
              font-family="Arial"
              font-size="20"
              fill="black"
            >
              48
            </text>

            <rect x="250" y="10" width="50" height="50" stroke="black" />
            <text
              x="265"
              y="40"
              font-family="Arial"
              font-size="20"
              fill="black"
            >
              84
            </text>

            <rect x="310" y="10" width="50" height="50" stroke="black" />
            <text
              x="325"
              y="40"
              font-family="Arial"
              font-size="20"
              fill="black"
            >
              444
            </text>

            <rect x="370" y="10" width="50" height="50" stroke="black" />
            <text
              x="385"
              y="40"
              font-family="Arial"
              font-size="20"
              fill="black"
            >
              363
            </text>
          </g>
        </svg>
      </div>

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
