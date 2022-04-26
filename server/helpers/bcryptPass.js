import bcrypt from "bcrypt";

export const bcryptPass = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    return err;
  }
}

export const comparePass = async (password, hashedPassword) => {
  try {
    const isPasswordCorrect = await bcrypt.compare(
      password,
      hashedPassword
    );
    return isPasswordCorrect;
  } catch (err) {
    return err;
  }
}