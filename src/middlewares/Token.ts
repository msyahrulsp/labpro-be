import env from "../env";

const jwt = require("jsonwebtoken");

export const getRoleFromToken = (auth: string | undefined) => {
  if (!auth) return ""; 
  let role = "";
  const token = auth?.split(' ')[1];
  jwt.verify(token, env.JWT_SECRET, (err: any, user: any) => {
    role = user.user.role ?? "";
  })
  return role;
}

export const getUsernameFromToken = (auth: string | undefined) => {
  if (!auth) return ""; 
  let username = ""
  const token = auth?.split(' ')[1];
  jwt.verify(token, env.JWT_SECRET, (err: any, user: any) => {
    username = user.user.username ?? "";
  })
  return username;
}

export const isAdmin = (auth: string | undefined) => {
  const role = getRoleFromToken(auth);
  return role === 'admin';
}

export const isLogged = (auth: string | undefined) => {
  const role = getRoleFromToken(auth);
  return (role === 'customer') || (role === 'admin');
}