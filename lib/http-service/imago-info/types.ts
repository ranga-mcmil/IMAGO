import { z } from "zod";
import { ImagoInfoSchema } from "./schema";

// Payload types (input)
export type ImagoInfoPayload = z.infer<typeof ImagoInfoSchema>;

// Response types (based on OpenAPI spec)
export type ImagoInfo = {
  id: number;
  email: string;
  phoneNumber: string;
  companyName: string;
};

// API Response types
export type CreateOrUpdateImagoInfoResponse = ImagoInfo;
export type GetImagoInfoResponse = ImagoInfo;