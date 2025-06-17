import { apiClient, APIResponse } from "@/lib/http-service/apiClient";
import { apiHeaderService } from "@/lib/http-service/apiHeaders";
import { BaseAPIRequests } from "@/lib/http-service/baseAPIRequests";
import { 
  CreateCategoryResponse, 
  GetCategoriesResponse,
  UpdateCategoryPayload,
  UpdateCategoryResponse,
  UploadCategoryIconResponse
} from "./types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/next-auth-options";

export class ShopsService extends BaseAPIRequests {
  
  async getCategories(): Promise<APIResponse<GetCategoriesResponse>> {
    const url = '/api/categories';

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

  async createCategory(payload: FormData): Promise<APIResponse<CreateCategoryResponse>> {
    const url = '/api/categories';

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      
      // Remove Content-Type header for FormData - browser will set it automatically
      delete headers['Content-Type'];
      
      const response = await this.client.post(url, payload, { 
        headers,
        body: payload 
      });
      return this.handleResponse<CreateCategoryResponse>(response);
    } catch (error) {
      console.error('Shops Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  async updateCategory(
    payload: UpdateCategoryPayload, 
    categoryId: number
  ): Promise<APIResponse<UpdateCategoryResponse>> {
    const url = `/api/categories/${categoryId}`;

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.patch(url, payload, { headers });
      return this.handleResponse<UpdateCategoryResponse>(response);
    } catch (error) {
      console.error('Shops Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  async deleteCategory(categoryId: number): Promise<APIResponse<void>> {
    const url = `/api/categories/${categoryId}`;

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.delete(url, { headers });
      return this.handleResponse<void>(response);
    } catch (error) {
      console.error('Shops Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  async uploadCategoryIcon(
    categoryId: number, 
    iconFile: File
  ): Promise<APIResponse<UploadCategoryIconResponse>> {
    const url = `/api/categories/${categoryId}/icon`;

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      
      // Remove Content-Type header for FormData
      delete headers['Content-Type'];
      
      const formData = new FormData();
      formData.append('icon', iconFile);
      
      const response = await this.client.post(url, formData, { 
        headers,
        body: formData 
      });
      return this.handleResponse<UploadCategoryIconResponse>(response);
    } catch (error) {
      console.error('Shops Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }
}

export const shopsService = new ShopsService(apiClient, apiHeaderService);