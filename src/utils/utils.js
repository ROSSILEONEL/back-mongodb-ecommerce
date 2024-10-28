import bcrypt from 'bcrypt';

export const createHash = (password) => {
  return bcrypt.hashSync(password, 10);
};


export const comparePassword = (password, user) => {
  return bcrypt.compareSync(password, user.password);
};