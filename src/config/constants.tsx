// export const serverUrl = window.location.origin + "/";
export const serverUrl = "http://localhost/";

const constants = {
    HOST_URL: serverUrl + 'api/',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  
export default constants;  

export const userImageBaseUrl = serverUrl + "img/user_images/"

export const badgeImageBaseUrl = serverUrl + 'img/badge_images/'

export const badgeImage = [
  'title_wg.png',
  'title_g1.png',
  'title_g2.png',
  'title_g3.png',
  'title_ol.png',
  'title_w3.png',
  'title_w2.png',
  'title_w1.png',
  'title_nr.png',
  'title_uw.png',
]