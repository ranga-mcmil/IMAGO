import { apiClient, APIResponse } from "@/lib/http-service/apiClient";
import { apiHeaderService } from "@/lib/http-service/apiHeaders";
import { BaseAPIRequests } from "@/lib/http-service/baseAPIRequests";
import { 
  CreateAdvertPayload,
  AdvertApprovalPayload,
  CancelAdvertPayload,
  AdvertStatusFilter,
  PaginationParams,
  CreateAdvertResponse,
  GetAdvertsResponse,
  GetPendingAdvertsResponse,
  ProcessAdvertApprovalResponse,
  CancelAdvertResponse,
  GetActiveAdvertsResponse
} from "./types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/next-auth-options";

export class AdvertService extends BaseAPIRequests {
  
  // 1. GET /api/adverts - Get All Adverts (with filtering)
  async getAdverts(
    advertStatus: AdvertStatusFilter,
    pagination?: Partial<PaginationParams>
  ): Promise<APIResponse<GetAdvertsResponse>> {
    const params = new URLSearchParams({
      advertStatus,
      pageNo: (pagination?.pageNo ?? 0).toString(),
      pageSize: (pagination?.pageSize ?? 10).toString(),
      sortBy: pagination?.sortBy ?? 'id',
      sortDir: pagination?.sortDir ?? 'asc',
    });

    const url = `/api/adverts?${params.toString()}`;

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.get(url, { headers });
      return this.handleResponse<GetAdvertsResponse>(response);
    } catch (error) {
      console.error('Advert Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  // 3. GET /api/adverts/pending - Get Pending Adverts
  async getPendingAdverts(
    pagination?: Partial<PaginationParams>
  ): Promise<APIResponse<GetPendingAdvertsResponse>> {
    const params = new URLSearchParams({
      pageNo: (pagination?.pageNo ?? 0).toString(),
      pageSize: (pagination?.pageSize ?? 10).toString(),
      sortBy: pagination?.sortBy ?? 'id',
      sortDir: pagination?.sortDir ?? 'asc',
    });

    const url = `/api/adverts/pending?${params.toString()}`;

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.get(url, { headers });
      return this.handleResponse<GetPendingAdvertsResponse>(response);
    } catch (error) {
      console.error('Advert Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  // 6. PUT /api/adverts/{advertId}/process - Process Approval
  async processAdvertApproval(
    advertId: number,
    payload: AdvertApprovalPayload
  ): Promise<APIResponse<ProcessAdvertApprovalResponse>> {
    const url = `/api/adverts/${advertId}/process`;

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.put(url, payload, { headers });
      return this.handleResponse<ProcessAdvertApprovalResponse>(response);
    } catch (error) {
      console.error('Advert Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  // 7. PUT /api/adverts/{advertId}/cancel - Cancel Advert
  async cancelAdvert(
    advertId: number,
    payload: CancelAdvertPayload
  ): Promise<APIResponse<CancelAdvertResponse>> {
    const url = `/api/adverts/${advertId}/cancel`;

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.put(url, payload, { headers });
      return this.handleResponse<CancelAdvertResponse>(response);
    } catch (error) {
      console.error('Advert Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  // Bonus: GET /api/adverts/active - Get Active Adverts (commonly used for display)
  async getActiveAdverts(): Promise<APIResponse<GetActiveAdvertsResponse>> {
    const url = '/api/adverts/active';

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.get(url, { headers });
      return this.handleResponse<GetActiveAdvertsResponse>(response);
    } catch (error) {
      console.error('Advert Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }
}

export const advertService = new AdvertService(apiClient, apiHeaderService);