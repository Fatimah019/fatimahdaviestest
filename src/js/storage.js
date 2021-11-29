export const newsStorage = {
  setItemToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItemFromLocalStorage(key) {
    localStorage.getItem(key);
  },
};

// export const setItemToLocalStorage = (key, value) => {
//   localStorage.setItem(key, JSON.stringify(value));
// };

// export const getItemFromLocalStorage = (key) => {
//   localStorage.getItem(key);
// };
