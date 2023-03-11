export class LS {
  save = function (key, value) {
    localStorage.setItem(key, value);
  };
  get = function (key) {
    return localStorage.getItem(key);
  };
}

export const KEYS = {
  token: 'TOKEN'
};
