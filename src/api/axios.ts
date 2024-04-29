import axios from "axios";

export default axios.create({
  baseURL: "http://18.224.166.225:8000",
  withCredentials: true,
  headers: {
    "Content-type": "application/x-www-form-urlencoded",
  },
});

export function getCookie(name: string) {
  // Split the cookie string into individual cookies
  const cookies = document.cookie.split(";");
  console.log(cookies);

  // Loop through each cookie to find the one with the specified name
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    // Check if this is the cookie we're looking for
    if (cookie.startsWith(name + "=")) {
      // Extract and return the cookie value
      return cookie.substring(name.length + 1);
    }
  }

  // If the cookie with the specified name is not found, return null
  return null;
}
