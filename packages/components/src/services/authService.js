export default class AuthService {

  static makeTrouble() {
    // small chance to return true ...
    return Math.floor((Math.random() * 100) + 1) % 4 === 0;
  }

  static async login(username) {
    // TODO - its a mock!
    if (this.makeTrouble()) {
      return {
        error: 'Error: Unknown username'
      }
    }
    return {
      userData: {
        username: username,
        mantra: 'TODO from server'
      },
      token: 'auth-token'
    };
  }

  static async register(userData) {
    // TODO - its a mock!
    if (this.makeTrouble()) {
      return {
        error: 'Error: Username already taken'
      }
    }
    return {
      userData: userData,
      token: 'auth-token'
    };
  }

}
