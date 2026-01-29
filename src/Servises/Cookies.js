class Cookies {
    set(name, value, days = 30) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = "expires=" + date.toUTCString();
      document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};${expires};path=/;domain=${location.hostname}`;
    }
  
    get(name) {
      const target = encodeURIComponent(name) + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const parts = decodedCookie.split(";");
      for (let part of parts) {
        part = part.trim();
        if (part.indexOf(target) === 0) {
          return part.substring(target.length);
        }
      }
      return null;
    }
  
    delete(name) {
      this.set(name, "", -1);
    }
  
    rewrite(name, value, days = 30) {
      this.set(name, value, days);
    }
  }
  
  export default Cookies;
  