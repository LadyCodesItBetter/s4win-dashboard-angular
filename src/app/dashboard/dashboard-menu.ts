import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'Charts',
    icon: 'pie-chart-outline',
    link: '/dashboard/charts',
  },
  {
    title: 'TRANSACTION',
    group: true,
  },
  {
    title: 'Bikes',
    icon: {
      icon: 'bicycle',
      pack: 'custom-icons',
    },
    pathMatch: 'prefix',
    link: '/dashboard/transaction/bikes',
  },
  {
    title: 'Frames',
    icon: 'layers-outline',
    link: '/dashboard/transaction/frames',
    pathMatch: 'prefix',
  },
  {
    title: 'NFTs',
    icon: 'bookmark-outline',
    link: '/dashboard/transaction/nfts',
    pathMatch: 'prefix',
  },
  {
    title: 'Settings',
    link: '/dashboard/settings',
    icon: 'settings-outline',
  },
  {
    title: 'Logout',
    link: '/login',
    icon: 'power-outline',
    skipLocationChange: true,
  },



  // {
  //   title: 'Miscellaneous',
  //   icon: 'shuffle-2-outline',
  //   children: [
  //     {
  //       title: '404',
  //       link: '/pages/miscellaneous/404',
  //     },
  //   ],
  // },
];
