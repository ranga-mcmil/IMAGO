import { apiClient, APIResponse } from "@/lib/http-service/apiClient";
import { apiHeaderService } from "@/lib/http-service/apiHeaders";
import { BaseAPIRequests } from "@/lib/http-service/baseAPIRequests";
import { 
  CreateOrderPayload,
  UpdateOrderStatusPayload,
  PaginationParams,
  CreateOrderResponse,
  GetOrdersByShopResponse,
  GetOrderItemsResponse,
  UpdateOrderStatusResponse,
  CancelOrderResponse,
  GetUserOrdersResponse,
  GetAllOrdersForAdminResponse
} from "./types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/next-auth-options";

export class OrdersService extends BaseAPIRequests {
  
  // 1. POST /api/orders - Create Order
  async createOrder(payload: CreateOrderPayload): Promise<APIResponse<CreateOrderResponse>> {
    const url = '/api/orders';

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.post(url, payload, { headers });
      return this.handleResponse<CreateOrderResponse>(response);
    } catch (error) {
      console.error('Orders Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  // 2. GET /api/orders/{shopId}/shop - Get Orders by Shop ID
  async getOrdersByShop(
    shopId: string,
    pagination?: Partial<PaginationParams>
  ): Promise<APIResponse<GetOrdersByShopResponse>> {
    const params = new URLSearchParams({
      pageNo: (pagination?.pageNo ?? 0).toString(),
      pageSize: (pagination?.pageSize ?? 10).toString(),
      sortBy: pagination?.sortBy ?? 'id',
      sortDir: pagination?.sortDir ?? 'asc',
    });

    const url = `/api/orders/${shopId}/shop?${params.toString()}`;

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.get(url, { headers });
      return this.handleResponse<GetOrdersByShopResponse>(response);
    } catch (error) {
      console.error('Orders Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  // 3. GET /api/orders/{orderNumber} - Get Order Items
  async getOrderItems(orderNumber: string): Promise<APIResponse<GetOrderItemsResponse>> {
    const url = `/api/orders/${encodeURIComponent(orderNumber)}`;

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.get(url, { headers });
      return this.handleResponse<GetOrderItemsResponse>(response);
    } catch (error) {
      console.error('Orders Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  // 4. GET /api/orders/{orderNumber}/cancel - Cancel Order
  async cancelOrder(orderNumber: string): Promise<APIResponse<CancelOrderResponse>> {
    const url = `/api/orders/${encodeURIComponent(orderNumber)}/cancel`;

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.get(url, { headers });
      return this.handleResponse<CancelOrderResponse>(response);
    } catch (error) {
      console.error('Orders Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  // 5. GET /api/orders/user-orders - Get User Orders
  async getUserOrders(
    pagination?: Partial<PaginationParams>
  ): Promise<APIResponse<GetUserOrdersResponse>> {
    const params = new URLSearchParams({
      pageNo: (pagination?.pageNo ?? 0).toString(),
      pageSize: (pagination?.pageSize ?? 10).toString(),
      sortBy: pagination?.sortBy ?? 'id',
      sortDir: pagination?.sortDir ?? 'asc',
    });

    const url = `/api/orders/user-orders?${params.toString()}`;

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.get(url, { headers });
      return this.handleResponse<GetUserOrdersResponse>(response);
    } catch (error) {
      console.error('Orders Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  // 6. PUT /api/orders/status/{orderId}/order/{shopId}/shop - Update Order Status
  async updateOrderStatus(
    orderId: number,
    shopId: string,
    payload: UpdateOrderStatusPayload
  ): Promise<APIResponse<UpdateOrderStatusResponse>> {
    const params = new URLSearchParams({
      'orderStatusRequestDTO': JSON.stringify(payload)
    });

    const url = `/api/orders/status/${orderId}/order/${shopId}/shop?${params.toString()}`;

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.put(url, {}, { headers });
      return this.handleResponse<UpdateOrderStatusResponse>(response);
    } catch (error) {
      console.error('Orders Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  // 7. GET /api/orders/admin/all - Get All Orders For Admin
  async getAllOrdersForAdmin(
    pagination?: Partial<PaginationParams>
  ): Promise<APIResponse<GetAllOrdersForAdminResponse>> {
    const params = new URLSearchParams({
      pageNo: (pagination?.pageNo ?? 0).toString(),
      pageSize: (pagination?.pageSize ?? 10).toString(),
      sortBy: pagination?.sortBy ?? 'createdAt',
      sortDir: pagination?.sortDir ?? 'desc',
    });

    const url = `/api/orders/admin/all?${params.toString()}`;

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.get(url, { headers });
      return this.handleResponse<GetAllOrdersForAdminResponse>(response);
    } catch (error) {
      console.error('Orders Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }
}

export const ordersService = new OrdersService(apiClient, apiHeaderService);