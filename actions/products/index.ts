'use server';

import { APIResponse } from "@/lib/http-service/apiClient";
import { productsService } from "@/lib/http-service/products";
import { PaginationSchema } from "@/lib/http-service/products/schema";
import { 
  PaginationParams,
  GetAllProductsResponse
} from "@/lib/http-service/products/types";

// Get All Products (with pagination)
export async function getAllProductsAction(
  pagination?: Partial<PaginationParams>
): Promise<APIResponse<GetAllProductsResponse>> {
  // Validate pagination if provided
  if (pagination) {
    const paginationValidation = PaginationSchema.partial().safeParse(pagination);
    if (!paginationValidation.success) {
      return {
        success: false,
        error: 'Invalid pagination parameters',
        fieldErrors: paginationValidation.error.flatten().fieldErrors,
      };
    }
  }

  return await productsService.getAllProducts(pagination);
}