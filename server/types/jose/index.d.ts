import { JWTPayload } from "jose";

export interface UserIdJWTPayload extends JWTPayload {
  userId: string;
}
