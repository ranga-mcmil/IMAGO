import { apiClient, APIResponse } from "@/lib/http-service/apiClient";
import { apiHeaderService } from "@/lib/http-service/apiHeaders";
import { BaseAPIRequests } from "@/lib/http-service/baseAPIRequests";
import { 
  ImagoInfoPayload,
  CreateOrUpdateImagoInfoResponse,
  GetImagoInfoResponse
} from "./types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/next-auth-options";

export class ImagoInfoService extends BaseAPIRequests {
  
  async getImagoInfo(): Promise<APIResponse<GetImagoInfoResponse>> {
    const url = '/api/imago-info';

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.get(url, { headers });
      return this.handleResponse<GetImagoInfoResponse>(response);
    } catch (error) {
      console.error('Imago Info Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  async createOrUpdateImagoInfo(payload: ImagoInfoPayload): Promise<APIResponse<CreateOrUpdateImagoInfoResponse>> {
    const url = '/api/imago-info/create-or-update';

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.post(url, payload, { headers });
      return this.handleResponse<CreateOrUpdateImagoInfoResponse>(response);
    } catch (error) {
      console.error('Imago Info Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }
}

export const imagoInfoService = new ImagoInfoService(apiClient, apiHeaderService);