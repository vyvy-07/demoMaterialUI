'use client';
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import useLogin from './useLogin';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaLogin } from '@/validate';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaLogin) });
  const { handleLogin, handleChange, value } = useLogin() || {};
  return (
    <form
      className="max-w-[300px] mx-auto flex flex-col gap-3"
      onSubmit={handleSubmit(handleLogin)}
    >
      <TextField
        required
        id="outlined-required"
        {...register('email', { required: true, maxLength: 80 })}
        label="Email"
      />
      {errors?.email?.message}
      <TextField
        type="password"
        id="outlined"
        // control
        {...register('password', { required: true, maxLength: 80 })}
        label="Password"
      />
      {errors?.password?.message}
      <RadioGroup
        aria-labelledby="demo-error-radios"
        name="quiz"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value={false} control={<Radio />} label="False" />
        <FormControlLabel value={true} control={<Radio />} label="True" />
      </RadioGroup>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Login;
