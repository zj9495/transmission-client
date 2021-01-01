import {IStatusColor} from './types'

export const APP_ROUTES = {
  base: '/',
  signIn: '/sign-in',
  list: '/list',
};

export const LANGUAGES = [
  {
    code: 'en',
    text: 'English',
  },
  {
    code: 'zh-CN',
    text: '中文(简体)',
  },
];

export const GITHUB_REPO = 'https://github.com/zj9495/transmission-client'

export const STATUS_COLORS:IStatusColor = {
  3: 'disabled',
  4: 'primary'
}