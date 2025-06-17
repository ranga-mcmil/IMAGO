import { z } from "zod";
import { GetAllProductsSchema, PaginationSchema } from "./schema";

// Payload types (input)
export type GetAllProductsParams = z.infer<typeof GetAllProductsSchema>;
export type PaginationParams = z.infer<typeof PaginationSchema>;

// Response types (based on OpenAPI spec)
export type ProductRating = {
  id: number;
  rating: number;
  review: string;
  fullName: string;
};

export type Product = {
  shopId: string;
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  brand: string;
  imageUrl: string;
  averageRating: number;
  shopEmail: string;
  shopPhoneNumber: string;
  shopName: string;
  shopLocation: string;
  shopCategory: string;
  ratings: ProductRating[];
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
export type GetAllProductsResponse = PaginatedResponse<Product>;