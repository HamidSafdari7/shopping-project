import React from 'react';
import { AiOutlineShoppingCart} from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine } from 'react-icons/ri';
import { GrLocation } from 'react-icons/gr';
import { BsFileEarmarkText } from 'react-icons/bs';

export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'dashboard',
        icon: <FiShoppingBag />,
      },
    ],
  },

  {
    title: 'Pages',
    links: [
      {
        name: 'orders',
        icon: <AiOutlineShoppingCart />,
      },
      {
        name: 'customers',
        icon: <RiContactsLine />,
      },
      {
        name: 'AdminProducts',
        icon: <BsFileEarmarkText />,
      },
    ],
  },
  
  
];

export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];




















