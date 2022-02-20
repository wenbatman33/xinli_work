'use strict';

const server = {
  'localhost:9999': {
    // 有需要更動local host 使用.env.local VUE_APP_API_SERVER
    host: process.env.VUE_APP_API_SERVER || 'https://test.bleadapi.com',
    title: '本地端'
  },
  't-bo.betlead.com': {
    host: 'https://test.bleadapi.com',
    title: 'BetLead'
  },
  's-bo.betlead.com': {
    host: 'https://stage.bleadapi.com',
    title: 'BetLead'
  },
  't-bo.tgcity18.com': {
    host: 'https://t-api.tgcity18.info',
    title: '梦工厂'
  },
  's-bo.tgcity18.com': {
    host: 'https://s-api.tgcity18.info',
    title: '梦工厂'
  },
  'bo.tgcity18.com': {
    host: 'https://api.tgcity18.info',
    title: '梦工厂'
  }
}

export const API_HOST = `${server[window.location.host].host}/api/`;
export const TITLE = server[window.location.host].title;
export const getEnv = () => {
  return {
    'localhost:9999': 'develop',
    't-bo': 'develop',
    's-bo': 'stage',
    bo: 'production',
  }[window.location.host.split('.')[0]];
}
