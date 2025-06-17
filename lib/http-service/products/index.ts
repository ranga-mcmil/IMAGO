import { apiClient, APIResponse } from "@/lib/http-service/apiClient";
import { apiHeaderService } from "@/lib/http-service/apiHeaders";
import { BaseAPIRequests } from "@/lib/http-service/baseAPIRequests";
import { 
  PaginationParams,
  GetAllProductsResponse
} from "./types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/next-auth-options";

export class ProductsService extends BaseAPIRequests {
  
  // GET /api/products - Get All Products (with pagination)
  async getAllProducts(pagination?: Partial<PaginationParams>): Promise<APIResponse<GetAllProductsResponse>> {
    const params = new URLSearchParams({
      pageNo: (pagination?.pageNo ?? 0).toString(),
      pageSize: (pagination?.pageSize ?? 10).toString(),
      sortBy: pagination?.sortBy ?? 'name',
      sortDir: pagination?.sortDir ?? 'asc',
    });

    const url = `/api/products?${params.toString()}`;

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.get(url, { headers });
      return this.handleResponse<GetAllProductsResponse>(response);
    } catch (error) {
      console.error('Products Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }
}

export const productsService = new ProductsService(apiClient, apiHeaderService);