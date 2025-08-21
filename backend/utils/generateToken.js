import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

export const generateResetToken = () => {
  return jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

export const generateEmailVerificationToken = () => {
  return jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
};
