export class SP {
  save = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  };
  get = function (key) {
    return JSON.parse(localStorage.getItem(key));
  };

  clear = function () {
    localStorage.clear();
  };
}

export const KEYS = {
  token: 'token',
  user: 'user'
};
