import { z } from "zod";
import { SyncSpecificOrderSchema } from "./schema";

// Payload types (input)
export type SyncSpecificOrderPayload = z.infer<typeof SyncSpecificOrderSchema>;

// Response types (based on OpenAPI spec)
export type SyncResponse = {
  [key: string]: string;
};

export type OrderStatusSummaryResponse = {
  [key: string]: object;
};

// API Response types
export type TriggerManualSyncResponse = SyncResponse;
export type SyncSpecificOrderResponse = SyncResponse;
export type GetOrderStatusSummaryResponse = OrderStatusSummaryResponse;