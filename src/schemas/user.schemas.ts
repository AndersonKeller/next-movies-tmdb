import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().nonempty("username is not valid valid"),
  password: z.string().nonempty("Password is required"),
  request_token: z.string().optional(),
});

export type LoginData = z.infer<typeof loginSchema>;
