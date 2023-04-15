export const mainColor = "#0096DB";
export const maninsidebar = "#FFF";
export const color_1 = "#43B5F4";
export const color_2 = "#89CFF5";
export const color_3 = "#ACE2FFDA";
export const color_4 = "#D4EDFB";
export const color_5 = "#E9F3FF";
export const active_sidebar_item_bg_color = "#DEEDF4";
export const navbarHeight = "60px";

export const TokenType="Bearer ";
export const TOKEN='10b2a5bb-69df-45d5-8015-43671443dbe9';
export const USER_STORE='store';
export const NOTIFICATION_STORE='notifications';

export const getHeaders = () => {
  const token=localStorage.getItem(TOKEN)
  const headers={
    'Authorization':TokenType+token,
    'Access-Control-Allow-Origin': '*'
  }
  return {headers};
}

export const getToken = () => {
  const token=localStorage.getItem(TOKEN);
  return { token }
}

export const logOut = () => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(USER_STORE);
  window.location.replace('/login')
}

export const BASE_URL = "http://localhost:7070/api/v1/desktop";


//http://localhost:8081/api/v1/desktop/building/createBuilding
export const AUTH = {
  LOGIN: "/auth/login",
  EMAIL: "/auth/email/"
};

export const USER = {
  CHECK_ROLE: "/user/me",
  USER_ACTION:"/user/getUserFields"
};

