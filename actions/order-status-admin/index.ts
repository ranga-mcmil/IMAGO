'use server';

import { APIResponse } from "@/lib/http-service/apiClient";
import { orderStatusAdminService } from "@/lib/http-service/order-status-admin";
import { SyncSpecificOrderSchema } from "@/lib/http-service/order-status-admin/schema";
import { 
  TriggerManualSyncResponse,
  SyncSpecificOrderResponse,
  GetOrderStatusSummaryResponse
} from "@/lib/http-service/order-status-admin/types";
import { revalidatePath } from "next/cache";

// 1. Trigger Manual Sync
export async function triggerManualSyncAction(): Promise<APIResponse<TriggerManualSyncResponse>> {
  const response = await orderStatusAdminService.triggerManualSync();

  if (response.success) {
    // Revalidate relevant pages after sync
    revalidatePath('/admin/orders');
    revalidatePath('/admin/order-status');
    revalidatePath('/orders');
    return {
      success: true,
      data: response.data,
    };
  } else {
    return {
      success: false,
      error: response.error || 'Failed to trigger manual sync',
    };
  }
}

// 2. Sync Specific Order
export async function syncSpecificOrderAction(
  orderNumber: string
): Promise<APIResponse<SyncSpecificOrderResponse>> {
  // Validate the order number
  const validatedData = SyncSpecificOrderSchema.safeParse({ orderNumber });

  if (!validatedData.success) {
    return {
      success: false,
      error: 'Invalid order number provided',
      fieldErrors: validatedData.error.flatten().fieldErrors,
    };
  }

  const response = await orderStatusAdminService.syncSpecificOrder(orderNumber);

  if (response.success) {
    // Revalidate relevant pages after sync
    revalidatePath('/admin/orders');
    revalidatePath('/admin/order-status');
    revalidatePath('/orders');
    revalidatePath(`/orders/${orderNumber}`);
    return {
      success: true,
      data: response.data,
    };
  } else {
    return {
      success: false,
      error: response.error || 'Failed to sync specific order',
    };
  }
}

// 3. Get Order Status Summary
export async function getOrderStatusSummaryAction(): Promise<APIResponse<GetOrderStatusSummaryResponse>> {
  return await orderStatusAdminService.getOrderStatusSummary();
}