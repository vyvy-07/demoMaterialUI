'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useListUser = () => {
  const [listUser, setListUser] = useState([]);

  const allUser = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/user');
      if (res?.data?.data?.length > 0) {
        setListUser(res?.data?.data);
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  useEffect(() => {
    allUser();
  }, []);
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/api/user/delete/${id}`
      );
      if (res?.data?.data) {
        setListUser(res?.data?.data);
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  return { listUser, handleDelete };
};

export default useListUser;
