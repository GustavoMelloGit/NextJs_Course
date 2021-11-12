import { hash, compare } from "bcryptjs";

export function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function hashData(data) {
  const salt = await hash(data, 12);
  return salt;
}

export async function verifyPassword(password, hashedPassword) {
  const isEqual = await compare(password, hashedPassword);
  return isEqual;
}
