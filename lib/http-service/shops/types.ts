import { z } from "zod";
import { 
  CreateCategorySchema,
  CreateCategoryFormSchema,
  UpdateCategorySchema, 
  UploadCategoryIconSchema,
  UpdateBranchSchema,
  PaginationSchema
} from "./schema";

// Payload types (input)
export type CreateCategoryPayload = z.infer<typeof CreateCategorySchema>;
export type CreateCategoryFormPayload = z.infer<typeof CreateCategoryFormSchema>;
export type UpdateCategoryPayload = z.infer<typeof UpdateCategorySchema>;
export type UploadCategoryIconPayload = z.infer<typeof UploadCategoryIconSchema>;
export type UpdateBranchPayload = z.infer<typeof UpdateBranchSchema>;

// Response types (based on OpenAPI spec)
export type Category = {
  id: number;
  name: string;
  description: string;
  iconUrl: string;
};

// API Response types
export type CreateCategoryResponse = Category;
export type GetCategoriesResponse = Category[];
export type UpdateCategoryResponse = Category;
export type UploadCategoryIconResponse = {
  [key: string]: string;
};


// S HO P S

// Payload types (input)
export type PaginationParams = z.infer<typeof PaginationSchema>;

// Response types (based on OpenAPI spec)
export type Shop = {
  id: string;
  name: string;
  description: string;
  email: string;
  phoneNumber: string;
  shopCategoryId: number;
  shopCategoryName: string;
  logo: string;
  location: string;
  active: boolean;
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

// API Response types
export type GetShopsResponse = PaginatedResponse<Shop>;