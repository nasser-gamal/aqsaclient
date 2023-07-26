import list from '../assets/icons/list.png';
import menu from '../assets/icons/menu.png';

export const adminMenu = [
  {
    id: 1,
    title: 'المنطقة الادارية',
    isLink: false,
    imgSrc: menu,
    subMenu: [
      {
        id: 1,
        title: 'المستخدمين',
        imgSrc: list,
        linkURL: '/users',
      },
      {
        id: 2,
        title: 'الوكلاء',
        imgSrc: list,
        linkURL: '/agents',
      },
    ],
    roles: ['superAdmin'],
  },
  {
    id: 2,
    title: 'الحسابات',
    isLink: false,
    imgSrc: menu,
    subMenu: [
      {
        id: 1,
        title: 'البنوك',
        imgSrc: list,
        linkURL: '/banks',
      },
      {
        id: 2,
        title: 'الحسابات',
        imgSrc: list,
        linkURL: '/bankAccounts',
      },
    ],
    roles: ['superAdmin', 'admin'],
  },
  {
    id: 3,
    title: 'العمليات',
    isLink: false,
    imgSrc: menu,
    subMenu: [
      {
        id: 1,
        title: 'ايداع',
        imgSrc: list,
        linkURL: '/deposit',
      },
      {
        id: 2,
        title: 'سحب',
        imgSrc: list,
        linkURL: '/withdraws',
      },
      {
        id: 3,
        title: 'تسوية - تحويل',
        imgSrc: list,
        linkURL: '/transfers',
      },
    ],
    roles: ['superAdmin', 'admin'],
  },
  {
    id: 8,
    title: 'التقارير',
    isLink: false,
    imgSrc: menu,
    subMenu: [
      {
        id: 1,
        title: 'تقارير عمليات اليوم',
        imgSrc: list,
        linkURL: '/dayReport',
      },
      {
        id: 2,
        title: 'تقرير الحسابات',
        imgSrc: list,
        linkURL: '/bankAccountReport',
      },
      {
        id: 3,
        title: 'تقرير موظف',
        imgSrc: list,
        linkURL: '/employReport',
      },
      {
        id: 4,
        title: 'تقرير تسوية الحسابات',
        imgSrc: list,
        linkURL: '/transferReport',
      },
    ],
    roles: ['superAdmin', 'admin'],
  },
  {
    id: 5,
    title: 'الوكلاء',
    isLink: false,
    imgSrc: menu,
    subMenu: [
      {
        id: 1,
        title: 'الخدمات',
        imgSrc: list,
        linkURL: '/services',
      },
      {
        id: 2,
        title: 'الشرائح',
        imgSrc: list,
        linkURL: '/segments',
      },
      {
        id: 3,
        title: 'اضافة عمولة',
        imgSrc: list,
        linkURL: '/commission/new',
      },
      {
        id: 4,
        title: 'عرض العمولة',
        imgSrc: list,
        linkURL: '/commissions',
      },
      {
        id: 5,
        title: 'تعديل العمولة',
        imgSrc: list,
        linkURL: '/commission/edit',
      },
    ],
    roles: ['superAdmin', 'admin'],
  },

];
