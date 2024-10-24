'use client';
import * as yup from 'yup';

export const schemaCreateNewProduct = yup
  .object({
    name: yup.string().required(),
    slug: yup.string().required(),

    type: yup.string().required(),
    quantity: yup.number().positive().integer().required(),

    rating: yup.number().positive().integer().required(),
    price: yup.number().positive().integer().required(),

    description: yup.string().required(),
    image: yup.string().required(),
  })
  .required();
export const schemaLogin = yup
  .object({
    email: yup
      .string()
      .required('Email is required!')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'email is not true'),
    password: yup.string(),
  })
  .required();
