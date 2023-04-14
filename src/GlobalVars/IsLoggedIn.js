localStorage.setItem("isLoggedIn", 0);

const isLoggedIn = {};

Object.defineProperty(isLoggedIn, "value", {
  get() {
    return localStorage.getItem("isLoggedIn");
  },
  set(newValue) {
    localStorage.setItem("isLoggedIn", newValue);
  },
});

export default isLoggedIn;