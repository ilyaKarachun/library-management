function parseCookies(cookieHeader: string): { [key: string]: string } {
    const cookies: { [key: string]: string } = {};
  
    if (cookieHeader) {
      cookieHeader.split(';').forEach((cookie) => {
        const parts = cookie.split('=');
        cookies[parts[0].trim()] = decodeURIComponent(parts[1]);
      });
    }
  
    return cookies;
  }
  
  export { parseCookies };