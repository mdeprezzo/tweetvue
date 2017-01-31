let utils = {
  saveTokens: ({ oauth_token, oauth_token_secret }) => {
    localStorage.setItem('oauth_token', oauth_token)
	localStorage.setItem('oauth_token_secret', oauth_token_secret)
  },

  getToken: (key) => {
    return localStorage.getItem(key) || null
  } 
}

export default utils