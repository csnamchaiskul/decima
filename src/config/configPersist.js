import sessionStorage from 'redux-persist/lib/storage/session'

export default {
  key: 'root',
  storage: sessionStorage,
  blacklist: ['location']
};