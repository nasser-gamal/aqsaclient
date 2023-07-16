const apiEndpoints = {
  auth: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },

  agent: {
    CREATE_AGENT: '/agent/create',
    GET_AGENTS: '/agent/getAll',
    UPDATE_AGENT: '/agent/update',
    UPDATE_AGENT_STATUS: '/agent/update-status',
    DELETE_AGENT: '/agent/delete',
    UPDATE_AGENT_PASSWORD: '/agent/update-password',
  },

  user: {
    CREATE_USER: '/user/create',
    GET_USERS: '/user/getAll',
    UPDATE_USER: '/user/update',
    UPDATE_USER_STATUS: '/user/update-status',
    DELETE_USER: '/user/delete',
    UPDATE_USER_PASSWORD: '/user/update-password',
  },

  category: {
    CREATE_CATEGORY: '/category/create',
    GET_CATEGORIES: '/category/getAll',
    UPDATE_CATEGORY: '/category/update',
    DELETE_CATEGORY: '/category/delete',
  },

  segment: {
    GET_SEGMENTS: '/segment/getAll',
    CREATE_SEGMENT: '/segment/create',
    UPDATE_SEGMENT: '/segment/update',
    DELETE_SEGMENT: '/segment/delete',
  },

  commission: {
    GET_COMMISSIONS: '/commission/getAll',
    GET_COMMISSION: '/commission/get',
    CREATE_COMMISSION: '/commission/create',
    UPDATE_COMMISSION: '/commission/update',
    DELETE_COMMISSION: '/commission/delete',
  },

  bank: {
    CREATE_BANK: '/banks/create',
    GET_BANKS: '/banks/getAll',
    UPDATE_BANK: '/banks/update',
  },

  bankAccount: {
    CREATE_BANKACCOUNT: '/bank-accounts/create',
    GET_BANKACCOUNTS: '/bank-accounts/getAll',
    UPDATE_BANKACCOUNT: '/bank-accounts/update',
  },

  deposite: {
    CREATE_DEPOSITE: '/transaction/deposite/create',
    GET_DEPOSITES: '/transaction/deposite/getAll',
    UPDATE_DEPOSITE: '/transaction/deposite/update',
  },

  withdraw: {
    CREATE_WITHDRAW: '/transaction/withdraw/create',
    GET_WITHDRAWS: '/transaction/withdraw/getAll',
    UPDATE_WITHDRAW: '/transaction/withdraw/update',
  },

  transfer: {
    CREATE_TRANSFER: '/transaction/transfer/create',
    GET_TRANSFERS: '/transaction/transfer/getAll',
    UPDATE_TRANSFER: '/transaction/transfer/update',
  },

  treasury: {
    GET_TREASURY: '/treasury/get',
  },
};

export default apiEndpoints;
