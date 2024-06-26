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
      {
        id: 4,
        title: 'مصاريف أخري',
        imgSrc: list,
        linkURL: '/fees',
      },
    ],
    roles: ['superAdmin', 'admin'],
  },
  {
    id: 4,
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
      {
        id: 5,
        title: 'تقرير عمولة الوكلاء',
        imgSrc: list,
        linkURL: '/commissionReports',
      },
      {
        id: 6,
        title: 'تقرير مصاريف',
        imgSrc: list,
        linkURL: '/feesReport',
      },
      {
        id: 7,
        title: 'تقارير الارباح',
        imgSrc: list,
        linkURL: '/profits',
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
        title: 'الخدمات الفرعية',
        imgSrc: list,
        linkURL: '/subServices',
      },
      {
        id: 3,
        title: 'الشرائح',
        imgSrc: list,
        linkURL: '/segments',
      },
      {
        id: 4,
        title: 'اضافة عمولة',
        imgSrc: list,
        linkURL: '/commission/new',
      },
      {
        id: 5,
        title: 'عرض العمولة',
        imgSrc: list,
        linkURL: '/commissions',
      },
      {
        id: 6,
        title: 'تعديل العمولة',
        imgSrc: list,
        linkURL: '/commission/edit',
      },
    ],
    roles: ['superAdmin', 'admin'],
  },

  {
    id: 7,
    title: 'المزودين',
    isLink: false,
    imgSrc: menu,
    subMenu: [
      {
        id: 1,
        title: 'اضافة مزود',
        imgSrc: list,
        linkURL: '/providers',
      },
      {
        id: 2,
        title: 'اضافة عمولة',
        imgSrc: list,
        linkURL: '/providers/commissions',
      },
    ],
    roles: ['superAdmin', 'admin'],
  },
  {
    id: 8,
    title: 'الأرصدة',
    isLink: false,
    imgSrc: menu,
    subMenu: [
      {
        id: 1,
        title: 'أرصدة التجار',
        imgSrc: list,
        linkURL: '/agentTreasury',
      },
      {
        id: 2,
        title: 'أرصدة المزودين',
        imgSrc: list,
        linkURL: '/providerTreasury',
      },
      {
        id: 3,
        title: 'أرصدة أخري',
        imgSrc: list,
        linkURL: '/addionalTreasury',
      },
      {
        id: 4,
        title: 'المستحقات',
        imgSrc: list,
        linkURL: '/dues',
      },
    ],
    roles: ['superAdmin', 'admin'],
  },
  {
    id: 9,
    title: 'الجرد',
    isLink: false,
    imgSrc: menu,
    subMenu: [
      {
        id: 1,
        title: 'عرض الجرد',
        imgSrc: list,
        linkURL: '/inventory',
      },
    ],
    roles: ['superAdmin', 'admin'],
  },
  {
    id: 10,
    title: 'التطبيقات',
    isLink: false,
    imgSrc: menu,
    subMenu: [
      {
        id: 1,
        title: 'تطبيقات الاقصي',
        imgSrc: list,
        linkURL: '/applications',
      },
    ],
    roles: ['superAdmin', 'admin'],
  },
];
