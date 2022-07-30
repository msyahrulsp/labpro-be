import env from "../env";

const jwt = require("jsonwebtoken");

export const getRoleFromToken = (auth: string | undefined) => {
  if (!auth) return ""; 
  let role = "";
  try {
    const token = auth?.split(' ')[1];
    jwt.verify(token, env.JWT_SECRET, (err: any, res: any) => {
      role = res.user.role ?? "";
    })
  } catch (err: any) {
    // console.log(err.message);
  }
  return role;
}

export const getUsernameFromToken = (auth: string | undefined) => {
  if (!auth) return ""; 
  let username = ""
  try {
    const token = auth?.split(' ')[1];
    jwt.verify(token, env.JWT_SECRET, (err: any, res: any) => {
      username = res.user.username ?? "";
    })
  } catch (err: any) {
    // console.log(err.message);
  }
  return username;
}

export const isAdmin = (auth: string | undefined) => {
  const role = getRoleFromToken(auth);
  return role === 'admin';
}

export const isCustomer = (auth: string | undefined) => {
  const role = getRoleFromToken(auth);
  return role === 'customer';
}

export const isLogged = (auth: string | undefined) => {
  const role = getRoleFromToken(auth);
  return (role === 'customer') || (role === 'admin');
}