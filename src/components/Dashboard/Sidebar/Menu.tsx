'use client';
import Menu from '@/DataFake/menu';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import * as React from 'react';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Link from 'next/link';
interface TMenu {
  id: string;
  name: string;
  alias: string;
  isDisplayOnMenu: boolean;
  parentId?: string | undefined;
  subCates?: TMenu[];
}
interface Label {
  icon: any;
  label: string | undefined;
}

export default function NestedList() {
  const [open, setOpen] = React.useState(true);
  const [isShow, setIsShow] = React.useState('');

  const handleShowSubCate = (id: string) => {
    setIsShow(id);
  };
  const listNav = Menu || [];
  return (
    <>
      <List>
        {listNav?.length > 0 &&
          listNav?.map((item: TMenu, index) => (
            <ListItem key={item?.id} disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={() => handleShowSubCate(item?.id)}>
                <Link href={item?.alias}></Link>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                {!item?.subCates ? (
                  <Link href={item?.alias}>
                    <ListItemText
                      primary={item?.name}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </Link>
                ) : (
                  <div className="">
                    <>{item?.name}</>
                  </div>
                )}
              </ListItemButton>
              {isShow == item?.id && (
                <ul className="ml-5">
                  {item?.subCates?.map((subCate, subIndex) => {
                    return (
                      <Link
                        href={subCate?.alias}
                        key={subCate?.id}
                        className="flex items-center p-3 max-w-[200px] whitespace-wrap"
                      >
                        {subIndex % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        <p className="block ml-3"> {subCate?.name}</p>
                      </Link>
                    );
                  })}
                </ul>
              )}
            </ListItem>
          ))}
      </List>
    </>
  );
}
