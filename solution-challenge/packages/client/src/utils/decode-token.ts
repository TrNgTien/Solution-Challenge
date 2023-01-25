import jwtDecode from "jwt-decode";
import { JwtDecode } from "@/types/jwt-decode";
export const decodedID = (token: string) => {
  const decoded = jwtDecode<JwtDecode>(token);
  return decoded.id;
};
