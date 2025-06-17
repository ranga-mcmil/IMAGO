import { apiClient, APIResponse } from "@/lib/http-service/apiClient";
import { apiHeaderService } from "@/lib/http-service/apiHeaders";
import { BaseAPIRequests } from "@/lib/http-service/baseAPIRequests";
import { 
  CreateUserPayload,
  UpdateUserPayload,
  UpdateUserV2Payload,
  ForgotPasswordPayload,
  OtpRequestPayload,
  ChangePasswordPayload,
  PaginationParams,
  CreateUserResponse,
  GetUserResponse,
  UpdateUserResponse,
  UpdateUserV2Response,
  GetUsersResponse,
  GetCurrentUserResponse,
  ForgotPasswordResetResponse,
  ForgotPasswordOtpResponse,
  ChangePasswordResponse
} from "./types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/next-auth-options";

export class UsersService extends BaseAPIRequests {
  
  // 1. POST /api/users - Create User
  async createUser(payload: CreateUserPayload): Promise<APIResponse<CreateUserResponse>> {
    const url = '/api/users';

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.post(url, payload, { headers });
      return this.handleResponse<CreateUserResponse>(response);
    } catch (error) {
      console.error('Users Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  // 2. GET /api/users - Get Users (with pagination)
  async getUsers(pagination?: Partial<PaginationParams>): Promise<APIResponse<GetUsersResponse>> {
    const params = new URLSearchParams({
      pageNo: (pagination?.pageNo ?? 0).toString(),
      pageSize: (pagination?.pageSize ?? 10).toString(),
      sortBy: pagination?.sortBy ?? 'id',
      sortDir: pagination?.sortDir ?? 'asc',
    });

    const url = `/api/users?${params.toString()}`;

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.get(url, { headers });
      return this.handleResponse<GetUsersResponse>(response);
    } catch (error) {
      console.error('Users Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  // 3. GET /api/users/{email} - Get User by Email
  async getUserByEmail(email: string): Promise<APIResponse<GetUserResponse>> {
    const url = `/api/users/${encodeURIComponent(email)}`;

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.get(url, { headers });
      return this.handleResponse<GetUserResponse>(response);
    } catch (error) {
      console.error('Users Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  // 4. PUT /api/users/{email} - Update User
  async updateUser(email: string, payload: UpdateUserPayload): Promise<APIResponse<UpdateUserResponse>> {
    const url = `/api/users/${encodeURIComponent(email)}`;

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.put(url, payload, { headers });
      return this.handleResponse<UpdateUserResponse>(response);
    } catch (error) {
      console.error('Users Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  // 5. PUT /api/users/{email}/v2 - Update User V2
  async updateUserV2(email: string, payload: UpdateUserV2Payload): Promise<APIResponse<UpdateUserV2Response>> {
    const url = `/api/users/${encodeURIComponent(email)}/v2`;

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.put(url, payload, { headers });
      return this.handleResponse<UpdateUserV2Response>(response);
    } catch (error) {
      console.error('Users Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  // 6. GET /api/users/me - Get Current User
  async getCurrentUser(): Promise<APIResponse<GetCurrentUserResponse>> {
    const url = '/api/users/me';

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.get(url, { headers });
      return this.handleResponse<GetCurrentUserResponse>(response);
    } catch (error) {
      console.error('Users Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  // 7. POST /api/users/forgot-password-reset - Forgot Password Reset
  async forgotPasswordReset(payload: ForgotPasswordPayload): Promise<APIResponse<ForgotPasswordResetResponse>> {
    const url = '/api/users/forgot-password-reset';

    try {
      const headers = await this.apiHeaders.getHeaders();
      const response = await this.client.post(url, payload, { headers });
      return this.handleResponse<ForgotPasswordResetResponse>(response);
    } catch (error) {
      console.error('Users Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  // 8. POST /api/users/forgot-password-otp - Forgot Password OTP
  async forgotPasswordOtp(payload: OtpRequestPayload): Promise<APIResponse<ForgotPasswordOtpResponse>> {
    const url = '/api/users/forgot-password-otp';

    try {
      const headers = await this.apiHeaders.getHeaders();
      const response = await this.client.post(url, payload, { headers });
      return this.handleResponse<ForgotPasswordOtpResponse>(response);
    } catch (error) {
      console.error('Users Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  // 9. POST /api/users/change-password - Change Password
  async changePassword(payload: ChangePasswordPayload): Promise<APIResponse<ChangePasswordResponse>> {
    const url = '/api/users/change-password';

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.post(url, payload, { headers });
      return this.handleResponse<ChangePasswordResponse>(response);
    } catch (error) {
      console.error('Users Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }
}

export const usersService = new UsersService(apiClient, apiHeaderService);