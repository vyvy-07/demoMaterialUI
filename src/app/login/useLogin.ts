import { dataRespone, PayloadLogin } from '@/interface';
import axios from 'axios';
import { useState } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

interface UseLoginReturn {
  handleLogin: (data: any) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
}
const useLogin = (): UseLoginReturn => {
  const [data, setData] = useState<dataRespone>();
  const [value, setValue] = useState(true);
  const route = useRouter();
  const handleChange = (event: any) => {
    const currentValue = event.target.value;
    setValue(event.target.value);
    console.log('currentValue :>> ', currentValue);
    if (currentValue == 'true') {
      setValue(true);
    } else {
      setValue(false);
    }
  };
  const handleLogin = async (payload: PayloadLogin) => {
    console.log('payload :>> ', { ...payload, isAdmin: value == true });
    try {
      const res = await axios.post('/api/user/sign-in', {
        ...payload,
        isAdmin: value,
      });
      console.log('res :>> ', res);
      if (res?.data?.status == 'Not found') {
        message.error(res?.data?.message);
      } else {
        setData(res?.data);
        message.success(res?.data?.message);
        // return route?.push('/');
      }
    } catch (error: any) {
      console.log('error :>> ', error);
      message.error('Email or Something was wrong!');
    }
  };
  console.log('data :>> ', data);
  return { handleLogin, handleChange, value };
};

export default useLogin;
