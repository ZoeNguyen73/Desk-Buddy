export default class Spotify {
  #STORAGE_TOKEN_KEY = 'SPOTIFY_TOKENS';
  #DEFAULT_TOKEN_VAL = {
    accessToken: '',
    expiresAt: '',
    tokenType: ''
  };
  #tokens = this.#DEFAULT_TOKEN_VAL;
  #isAuth = false;

  constructor(spotifyLoginDomId) {
    this.#setTokenFromHash();
    this.#removeHashFromUrl();
    this.#setAuth();
    this.#setDomLink(spotifyLoginDomId);
  }

  #setDomLink(domId) {
    if(this.#isAuth) {
      return;
    }
    const clientId = '<Get from spotify>';
    const redirectUri = '<Same URL as what you put in spotify>';
    const scope = [].join('%20')
    const url = `
      https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&show_dialog=true
    `
    document.getElementById(domId).href = url
  }

  #setAuth() {
    this.#isAuth = !!this.#getTokens();
  }

  #getTokens() {
    const tokens = JSON.parse(sessionStorage.getItem(this.#STORAGE_TOKEN_KEY));
    if (!tokens || this.#isTokenExpired(tokens)) {
      this.#tokens = this.#DEFAULT_TOKEN_VAL;
      return;
    }

    this.#tokens = tokens;

    return this.#tokens
  }

  #setTokenFromHash() {
    const tokens = this.#getTokensFromHash();

    if(!tokens) {
      return;
    }

    const currentTimeInMs = Date.now();

    const tokensMod = {
      accessToken: tokens.access_token,
      expiresAt: (currentTimeInMs + (tokens.expires_in * 1_000)),
      tokenType: tokens.token_type
    }
    const tokenInJsonStr = JSON.stringify(tokensMod);
    sessionStorage.setItem(this.#STORAGE_TOKEN_KEY, tokenInJsonStr)
  }

  #getTokensFromHash() {
    if(!this.#hasHashInUrl()) {
      return
    }

    return window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        if (item) {
          const parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
  }

  #isTokenExpired(tokens) {
    return tokens.expiresAt < Date.now();
  }

  #removeHashFromUrl() {
    if(!this.#hasHashInUrl()) {
      return
    }

    const { pathname, search } = window.location;
    history.pushState('', document.title, pathname + search);
  }

  #hasHashInUrl() {
    return !!window.location.hash;
  }
}
