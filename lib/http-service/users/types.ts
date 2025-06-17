import { z } from "zod";
import { 
  CreateUserSchema,
  UpdateUserSchema,
  UpdateUserV2Schema,
  ForgotPasswordSchema,
  OtpRequestSchema,
  ChangePasswordSchema,
  EmailSchema,
  PaginationSchema
} from "./schema";

// Payload types (input)
export type CreateUserPayload = z.infer<typeof CreateUserSchema>;
export type UpdateUserPayload = z.infer<typeof UpdateUserSchema>;
export type UpdateUserV2Payload = z.infer<typeof UpdateUserV2Schema>;
export type ForgotPasswordPayload = z.infer<typeof ForgotPasswordSchema>;
export type OtpRequestPayload = z.infer<typeof OtpRequestSchema>;
export type ChangePasswordPayload = z.infer<typeof ChangePasswordSchema>;
export type EmailPayload = z.infer<typeof EmailSchema>;
export type PaginationParams = z.infer<typeof PaginationSchema>;

// Response types (based on OpenAPI spec)
export type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  phoneNumber: string;
  shopId?: string;
};

// Pagination response wrapper
export type PaginatedResponse<T> = {
  content: T[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};

// Generic response for string key-value pairs
export type GenericResponse = {
  [key: string]: string;
};

// Generic response for boolean key-value pairs
export type GenericBooleanResponse = {
  [key: string]: boolean;
};

// Generic response for object key-value pairs
export type GenericObjectResponse = {
  [key: string]: object;
};

// API Response types
export type CreateUserResponse = User;
export type GetUserResponse = User;
export type UpdateUserResponse = User;
export type UpdateUserV2Response = GenericObjectResponse;
export type GetUsersResponse = PaginatedResponse<User>;
export type GetCurrentUserResponse = User;
export type ForgotPasswordResetResponse = GenericResponse;
export type ForgotPasswordOtpResponse = GenericResponse;
export type ChangePasswordResponse = GenericResponse;