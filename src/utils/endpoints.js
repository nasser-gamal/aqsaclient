const apiEndpoints = {
  auth: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },

  USERS: '/users',
  CATEGORIES: '/categories',
  SUB_CATEGORIES: '/subCategories',
  SEGMENTS: '/segments',
  BANKS: '/banks',
  BANK_ACCOUNTS: '/bank-accounts',
  FEES: '/fees',
  PROVIDERS: '/providers',
  PROVIDER_COMMISSIONS: '/providers-commissions',
  AGENT_TREASURIES: '/agentTreasuries',
  PROVIDER_TREASURIES: '/providerTreasuries',
  ADDIONAL_TREASURIES: '/addionalTreasuries',
  DUES: '/dues',
  APPS: '/apps',
  TRANSACTIONS: '/transactions',
  TRANSFER: '/transfers',
  LOGGED_USER_COMMISSIONS: '/commission/me',

  
  agent: {
    CREATE_AGENT: '/agent/create',
    GET_AGENTS: '/agent/getAll',
    UPDATE_AGENT: '/agent/update',
    UPDATE_AGENT_STATUS: '/agent/update-status',
    DELETE_AGENT: '/agent/delete',
    UPDATE_AGENT_PASSWORD: '/agent/update-password',
    UPDATE_AGENT_PASSWORD_MANUAL: '/agent/update-password-manual',
  },

  // user: {
  //   CREATE_USER: '/user/create',
  //   GET_USERS: '/user/getAll',
  //   UPDATE_USER: '/user/update',
  //   UPDATE_USER_STATUS: '/user/update-status',
  //   DELETE_USER: '/user/delete',
  //   UPDATE_USER_PASSWORD: '/user/update-password',
  //   UPDATE_USER_PASSWORD_MANUAL: '/user/update-password-manual',
  // },

  commission: {
    GET_COMMISSIONS: '/commission/getAll',
    GET_COMMISSION: '/commission/get',
    CREATE_COMMISSION: '/commission/create',
    UPDATE_COMMISSION: '/commission/update',
    DELETE_COMMISSION: '/commission/delete',
  },

  deposite: {
    CREATE_DEPOSITE: '/transaction/deposite/create',
    GET_DEPOSITES: '/transaction/deposite/getAll',
    UPDATE_DEPOSITE: '/transaction/deposite/update',
    DELETE_DEPOSITE: '/transaction/deposite/delete',
    RESTORE_DEPOSITE: '/transaction/deposite/restore',
  },

  withdraw: {
    CREATE_WITHDRAW: '/transaction/withdraw/create',
    GET_WITHDRAWS: '/transaction/withdraw/getAll',
    UPDATE_WITHDRAW: '/transaction/withdraw/update',
    DELETE_WITHDRAW: '/transaction/withdraw/delete',
    RESTORE_WITHDRAW: '/transaction/withdraw/restore',
  },

  transfer: {
    CREATE_TRANSFER: '/transaction/transfer/create',
    GET_TRANSFERS: '/transaction/transfer/getAll',
    UPDATE_TRANSFER: '/transaction/transfer/update',
    DELETE_TRANSFER: '/transaction/transfer/delete',
  },

  treasury: {
    GET_TREASURY: '/treasury/get',
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

  inventory: {
    GET_INVENTROY: '/inventory/get',
  },
};

export default apiEndpoints;
