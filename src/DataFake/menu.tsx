const Menu = [
  {
    id: '6268ab6b4340666ac1a9ba39',
    name: 'Dashboard',
    alias: '/',
    isDisplayOnMenu: true,
    parentId: '',
  },
  {
    id: '6018dbf03b03d94d64345ecd',
    name: 'Soạn thảo',
    alias: 'editArticle',
    isDisplayOnMenu: true,
    parentId: '',
  },
  {
    id: '6018dbf03b03444d64345ecd',
    name: 'ckeditor',
    alias: 'ckeditor',
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
  {
    id: '606c205bd5514b123b0580a6',
    name: 'Video',
    alias: 'video',
    isDisplayOnMenu: true,
    parentId: '6268ab6b92706645c1a9ba39',
    subCates: [
      {
        id: '63e5c56b8f7d57713486988b',
        name: 'Cà phê khuyến nông',
        alias: 'ca-phe-khuyen-nong',
        isDisplayOnMenu: true,
        parentId: '606c205bd5514b17fb0580a6',
        subCates: [],
      },
    ],
  },
];
export default Menu;
