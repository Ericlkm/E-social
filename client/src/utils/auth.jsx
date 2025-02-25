import { jwtDecode } from "jwt-decode";

class Auth {
  getToken() {
    return localStorage.getItem("token");
  }
  getUser() {
    const token = this.getToken();
    return token ? jwtDecode(token) : "" || null;
  }
  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decode = jwtDecode(token);
    if (decode.exp < Date.now() / 1000) {
      return true;
    }
    return false;
  }

  login(token) {
    localStorage.setItem("token", token);
    location.assign("/");
  }
  logout() {
    localStorage.removeItem("token");
    location.assign("/login");
  }
}

export default new Auth();
