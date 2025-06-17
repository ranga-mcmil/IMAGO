import { apiClient, APIResponse } from "@/lib/http-service//apiClient";
import { apiHeaderService } from "@/lib/http-service/apiHeaders";
import { BaseAPIRequests } from "@/lib/http-service/baseAPIRequests";
import { CreateCategoryPayload, CreateCategoryResponse, GetCategoriesResponse} from "./types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/next-auth-options";


export class ShopsService extends BaseAPIRequests {
  async get_categories(): Promise<APIResponse<GetCategoriesResponse>> {
    const url = `/api/categories`

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.get(url, { headers });
      return this.handleResponse<GetCategoriesResponse>(response);
    } catch (error) {
      console.error('Shops Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  async createCategory(payload: CreateCategoryPayload): Promise<APIResponse<CreateCategoryResponse>> {
    const url = '/api/categories';

    console.log("payload.........>>>>>>>>>>>>>>", payload)

    const session = await getServerSession(authOptions)

    try {
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.post(url, payload, { headers });
      return this.handleResponse<CreateCategoryResponse>(response);
    } catch (error) {
      console.error('Shop Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

}

export const shopsService = new ShopsService(apiClient, apiHeaderService);