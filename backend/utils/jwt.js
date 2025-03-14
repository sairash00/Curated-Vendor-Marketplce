import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'krej!@$#^&*%(^VX$^BV#%@&#%@#&*^(@&CX#VB^XB#XVB()*(!@#*^&BCXN)&#NBC#)@&BX^NBX)(&^#N!@*()@*(C#&@)(*#&7*8&*)(#B&@BC#@';

// Encrypt cookie
export const encryptToken = (payload) => {
  return jwt.sign(payload, secret);
};

// Decrypt cookie
export const decryptToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null; 
  }
};
