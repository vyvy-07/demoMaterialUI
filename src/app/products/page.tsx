'use client';
import { PayloadCreateProduct } from '@/interface';
import { schemaCreateNewProduct } from '@/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Products = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schemaCreateNewProduct) });
  const [type, setType] = useState('');
  const [data, setData] = useState({});
  const [files, setFiles] = useState();

  const handleChange = (event: any) => {
    setType(event.target.value);
  };
  const onSubmit = async (data: PayloadCreateProduct) => {
    try {
      const res = await axios.post('/products/create', data);
      reset();
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  const handelChooseFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('event?.target?.files :>> ');
    const files = event?.target?.files;
    if (files) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
    }
  };

  return (
    <Box
      component="form"
      className="max-w-[300px] mx-auto flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        id="outlined-controlled"
        {...register('name', { required: true, maxLength: 80 })}
        label="name"
      />

      {errors?.name?.message}
      <TextField
        id="outlined-required"
        {...register('description', { required: true, maxLength: 80 })}
        label="description"
      />

      {/* {errors.description?.message}
      <TextField
        id="outlined-required"
        {...register('image', { required: true, maxLength: 80 })}
        label="image"
      />

      {errors.image?.message} */}
      <input type="file" onChange={handelChooseFile} name="" id="" />
      <TextField
        id="outlined-required"
        {...register('rating', { required: true, maxLength: 80 })}
        label="rating"
      />

      {errors.rating?.message}
      <TextField
        id="outlined-required"
        {...register('slug', { required: true, maxLength: 80 })}
        label="slug"
      />
      {errors.slug?.message}
      <TextField
        id="outlined-required"
        {...register('quantity', { required: true, maxLength: 80 })}
        label="quantity"
      />
      {errors.quantity?.message}
      <TextField
        id="outlined-required"
        {...register('price', { required: true, maxLength: 80 })}
        label="price"
      />
      {errors.price?.message}
      <>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register('type', { required: true })}
          value={type}
          label="type"
          onChange={handleChange}
        >
          <MenuItem value="ao-thung">áo</MenuItem>
          <MenuItem value="quan-tay">quần</MenuItem>
          <MenuItem value="do-bo">bộ</MenuItem>
        </Select>
        {errors?.type?.message}
      </>

      <Button type="submit">Submit</Button>
    </Box>
  );
};

export default Products;
