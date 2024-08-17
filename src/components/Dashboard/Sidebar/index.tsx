'use client';
import { handleChangeClass } from '@/untils/changeClassSidebar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, IconButton, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';
import TreeView from './TreeView';
import { twMerge } from 'tailwind-merge';
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    handleChangeClass(isOpen);
  }, [isOpen]);

  return (
    <div
      className={`${twMerge(
        'sidebar w-full max-w-[400px]',
        'sidebar w-full '
      )}`}
    >
      <div className="relative z-[90] -mt-[64px]">
        <Toolbar
          className="btnOpen flex"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <IconButton className="">
            {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
      </div>

      <div
        onClick={() => {
          if (isOpen == false) {
            setIsOpen(true);
          }
        }}
      >
        <TreeView />
      </div>
    </div>
  );
};

export default Sidebar;
