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
};

export default apiEndpoints;
