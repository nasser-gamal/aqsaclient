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
    UPDATE_AGENT_PASSWORD_MANUAL: '/agent/update-password-manual',
  },

  user: {
    CREATE_USER: '/user/create',
    GET_USERS: '/user/getAll',
    UPDATE_USER: '/user/update',
    UPDATE_USER_STATUS: '/user/update-status',
    DELETE_USER: '/user/delete',
    UPDATE_USER_PASSWORD: '/user/update-password',
    UPDATE_USER_PASSWORD_MANUAL: '/user/update-password-manual',
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

  fees: {
    GET_FEES: '/fees/getAll',
    CREATE_FEE: '/fees/create',
    UPDATE_FEE: '/fees/update',
    DELETE_FEE: '/fees/delete',
  },
  treasury: {
    GET_TREASURY: '/treasury/get',
  },

  applications: {
    CREATE_APP: '/apps/create',
    DOWNLOAD_APP: '/apps/download',
    GET_APPS: '/apps/getAll',
    UPDATE_APP: '/apps/update',
  },

  reports: {
    DAILY_TRANSACTION: '/reports/transactions/daily',
    EMPLOY_TRANSACTION: '/reports/transactions/employ',
    USER_TRANSACTION: '/reports/transactions/user',
    DAILY_TRANSFER: '/reports/transfer/daily',
    DAILY_FEES: '/reports/fees/daily',
    DAILY_COMMISSIONS: '/reports/commissions/daily',
    EXPORT_DAILY_TRANSACTION: '/reports/transactions/daily/excel',
    EXPORT_BANK_TRANSACTION: '/reports/transactions/bankAccount/excel',
    EXPORT_EMPLOY_TRANSACTION: '/reports/transactions/employ/excel',
    EXPORT_TRANSFER_TRANSACTION: '/reports/transfer/daily/excel',
  },

  profits: {
    GET_DAILY_PROFITS: '/profits/daily',
  },
};

export default apiEndpoints;
