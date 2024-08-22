'use client';
import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Box } from '@mui/material';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import Link from 'next/link';

interface TMenu {
  id: string;
  name: string;
  alias: string;
  isDisplayOnMenu: boolean;
  parentId?: string | undefined;
  subCates?: TMenu[];
}
const menu = [
  {
    id: '6268ab6b4340666ac1a9ba39',
    name: 'Dashboard',
    alias: '/',
    isDisplayOnMenu: true,
    parentId: '',
  },
  {
    id: '6268ab6b9270666ac1a9ba39',
    name: 'Media',
    alias: 'media',
    isDisplayOnMenu: true,
    parentId: '',
    subCates: [
      {
        id: '606c205bd5514b17fb0580a6',
        name: 'Video',
        alias: 'video',
        isDisplayOnMenu: true,
        parentId: '6268ab6b9270666ac1a9ba39',
        subCates: [
          {
            id: '63e5c56b8f7d5771de86988b',
            name: 'Cà phê khuyến nông',
            alias: 'ca-phe-khuyen-nong',
            isDisplayOnMenu: true,
            parentId: '606c205bd5514b17fb0580a6',
            subCates: [],
          },
        ],
      },
      {
        id: '6018dbf03b03d94d646aeecd',
        name: 'Emagazine',
        alias: 'emagazine',
        isDisplayOnMenu: true,
        parentId: '6268ab6b9270666ac1a9ba39',
        subCates: [],
      },
      {
        id: '621ee24fb39100710b1a214a',
        name: 'Podcast',
        alias: 'podcast',
        isDisplayOnMenu: true,
        parentId: '6268ab6b9270666ac1a9ba39',
        subCates: [
          {
            id: '628f2e0e0435ff067fa939be',
            name: 'Podcast | Góc nhìn',
            alias: 'podcast--goc-nhin',
            isDisplayOnMenu: true,
            parentId: '621ee24fb39100710b1a214a',
            subCates: [],
          },
          {
            id: '6232b2a0b39100710b4b1f07',
            name: 'Nông nghiệp',
            alias: 'nong-nghiep',
            isDisplayOnMenu: true,
            parentId: '621ee24fb39100710b1a214a',
            subCates: [],
          },
          {
            id: '6232b2b1b39100710b4b2239',
            name: 'Cuộc sống muôn màu',
            alias: 'cuoc-song-muon-mau',
            isDisplayOnMenu: true,
            parentId: '621ee24fb39100710b1a214a',
            subCates: [],
          },
          {
            id: '6232b2ccb39100710b4b9de7',
            name: 'Gia vị cuộc sống',
            alias: 'gia-vi-cuoc-song',
            isDisplayOnMenu: true,
            parentId: '621ee24fb39100710b1a214a',
            subCates: [],
          },
        ],
      },
      {
        id: '611b70130963ee0a41330ae3',
        name: 'Phóng sự ảnh',
        alias: 'phong-su-anh',
        isDisplayOnMenu: true,
        parentId: '6268ab6b9270666ac1a9ba39',
        subCates: [],
      },
      {
        id: '611b70cf0963ee0a41331dfe',
        name: 'Infographic',
        alias: 'infographic',
        isDisplayOnMenu: true,
        parentId: '6268ab6b9270666ac1a9ba39',
        subCates: [],
      },
    ],
  },
  {
    id: '6268ab6b4560666ac1a9ba39',
    name: 'Podcast',
    alias: 'podcast',
    isDisplayOnMenu: true,
    parentId: '',
  },
];
export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = (id: string) => {
    setOpen(!open);
  };

  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <SimpleTreeView>
        {menu.map((item: TMenu) => (
          <>
            {item?.subCates ? (
              <TreeItem itemId={item?.id} key={item?.id} label={item?.name}>
                {item?.subCates?.map((subMenu: TMenu) => (
                  <Link href={subMenu?.alias} key={subMenu?.id}>
                    <TreeItem itemId={subMenu?.id} label={subMenu?.name} />
                  </Link>
                ))}
              </TreeItem>
            ) : (
              <Link href={item?.alias} key={item?.id}>
                <TreeItem itemId={item?.id} label={item?.name} />
              </Link>
            )}
          </>
        ))}
      </SimpleTreeView>
    </Box>
  );
}
