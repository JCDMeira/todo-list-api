import bcrypt from "bcryptjs";

const encryptPassword = async (password: string) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return passwordHash;
};

export default encryptPassword;
