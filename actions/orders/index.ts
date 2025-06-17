'use server';

import { APIResponse } from "@/lib/http-service/apiClient";
import { ordersService } from "@/lib/http-service/orders";
import { 
  CreateOrderSchema,
  UpdateOrderStatusSchema,
  OrderNumberSchema,
  ShopIdSchema,
  PaginationSchema
} from "@/lib/http-service/orders/schema";
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
} from "@/lib/http-service/orders/types";
import { revalidatePath } from "next/cache";

// 1. Create Order
export async function createOrderAction(
  formData: FormData
): Promise<APIResponse<CreateOrderResponse, CreateOrderPayload>> {
  // Parse order items from FormData
  const orderItemsData = formData.get('orderItems') as string;
  
  let orderItems;
  try {
    orderItems = JSON.parse(orderItemsData);
  } catch (error) {
    return {
      success: false,
      error: 'Invalid order items format',
    };
  }

  const rawData: CreateOrderPayload = {
    orderItems,
  };

  // Validate the form data
  const validatedData = CreateOrderSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      error: 'Please fix the errors in the form',
      fieldErrors: validatedData.error.flatten().fieldErrors,
      inputData: rawData
    };
  }

  const response = await ordersService.createOrder(validatedData.data);

  if (response.success) {
    // Revalidate relevant pages
    revalidatePath('/orders');
    revalidatePath('/cart');
    revalidatePath('/');
    return {
      success: true,
      data: response.data,
    };
  } else {
    return {
      success: false,
      error: response.error || 'Failed to create order',
      inputData: rawData
    };
  }
}

// 2. Get Orders by Shop
export async function getOrdersByShopAction(
  shopId: string,
  pagination?: Partial<PaginationParams>
): Promise<APIResponse<GetOrdersByShopResponse>> {
  // Validate shopId
  const shopValidation = ShopIdSchema.safeParse({ shopId });
  if (!shopValidation.success) {
    return {
      success: false,
      error: 'Invalid shop ID provided',
    };
  }

  // Validate pagination if provided
  if (pagination) {
    const paginationValidation = PaginationSchema.partial().safeParse(pagination);
    if (!paginationValidation.success) {
      return {
        success: false,
        error: 'Invalid pagination parameters',
      };
    }
  }

  return await ordersService.getOrdersByShop(shopId, pagination);
}

// 3. Get Order Items
export async function getOrderItemsAction(
  orderNumber: string
): Promise<APIResponse<GetOrderItemsResponse>> {
  // Validate order number
  const validatedData = OrderNumberSchema.safeParse({ orderNumber });

  if (!validatedData.success) {
    return {
      success: false,
      error: 'Invalid order number provided',
    };
  }

  return await ordersService.getOrderItems(orderNumber);
}

// 4. Cancel Order
export async function cancelOrderAction(
  orderNumber: string
): Promise<APIResponse<CancelOrderResponse>> {
  // Validate order number
  const validatedData = OrderNumberSchema.safeParse({ orderNumber });

  if (!validatedData.success) {
    return {
      success: false,
      error: 'Invalid order number provided',
    };
  }

  const response = await ordersService.cancelOrder(orderNumber);

  if (response.success) {
    // Revalidate relevant pages
    revalidatePath('/orders');
    revalidatePath(`/orders/${orderNumber}`);
    revalidatePath('/');
    return {
      success: true,
      data: response.data,
    };
  } else {
    return {
      success: false,
      error: response.error || 'Failed to cancel order',
    };
  }
}

// 5. Get User Orders
export async function getUserOrdersAction(
  pagination?: Partial<PaginationParams>
): Promise<APIResponse<GetUserOrdersResponse>> {
  // Validate pagination if provided
  if (pagination) {
    const paginationValidation = PaginationSchema.partial().safeParse(pagination);
    if (!paginationValidation.success) {
      return {
        success: false,
        error: 'Invalid pagination parameters',
      };
    }
  }

  return await ordersService.getUserOrders(pagination);
}

// 6. Update Order Status
export async function updateOrderStatusAction(
  orderId: number,
  shopId: string,
  formData: FormData
): Promise<APIResponse<UpdateOrderStatusResponse, UpdateOrderStatusPayload>> {
  const rawData: UpdateOrderStatusPayload = {
    status: formData.get('status') as string,
  };

  // Validate shop ID
  const shopValidation = ShopIdSchema.safeParse({ shopId });
  if (!shopValidation.success) {
    return {
      success: false,
      error: 'Invalid shop ID provided',
      inputData: rawData
    };
  }

  // Validate the form data
  const validatedData = UpdateOrderStatusSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      error: 'Please fix the errors in the form',
      fieldErrors: validatedData.error.flatten().fieldErrors,
      inputData: rawData
    };
  }

  const response = await ordersService.updateOrderStatus(orderId, shopId, validatedData.data);

  if (response.success) {
    // Revalidate relevant pages
    revalidatePath('/orders');
    revalidatePath(`/orders/${orderId}`);
    revalidatePath(`/shops/${shopId}/orders`);
    return {
      success: true,
      data: response.data,
    };
  } else {
    return {
      success: false,
      error: response.error || 'Failed to update order status',
      inputData: rawData
    };
  }
}

// 7. Get All Orders For Admin
export async function getAllOrdersForAdminAction(
  pagination?: Partial<PaginationParams>
): Promise<APIResponse<GetAllOrdersForAdminResponse>> {
  // Validate pagination if provided
  if (pagination) {
    const paginationValidation = PaginationSchema.partial().safeParse(pagination);
    if (!paginationValidation.success) {
      return {
        success: false,
        error: 'Invalid pagination parameters',
      };
    }
  }

  return await ordersService.getAllOrdersForAdmin(pagination);
}