export default class Token {
  accessToken = '';
  refreshToken = '';

  updateToken(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
