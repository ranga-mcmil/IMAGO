'use server';

import { APIResponse } from "@/lib/http-service/apiClient";
import { advertService } from "@/lib/http-service/adverts";
import { 
  AdvertApprovalSchema, 
  CancelAdvertSchema,
  AdvertStatusFilterSchema,
  PaginationSchema
} from "@/lib/http-service/adverts/schema";
import { 
  AdvertApprovalPayload,
  CancelAdvertPayload,
  AdvertStatusFilter,
  PaginationParams,
  GetAdvertsResponse,
  GetPendingAdvertsResponse,
  ProcessAdvertApprovalResponse,
  CancelAdvertResponse,
  GetActiveAdvertsResponse
} from "@/lib/http-service/adverts/types";
import { revalidatePath } from "next/cache";

// 1. Get All Adverts (with filtering)
export async function getAdvertsAction(
  advertStatus: AdvertStatusFilter,
  pagination?: Partial<PaginationParams>
): Promise<APIResponse<GetAdvertsResponse>> {
  // Validate advertStatus
  const statusValidation = AdvertStatusFilterSchema.safeParse(advertStatus);
  if (!statusValidation.success) {
    return {
      success: false,
      error: 'Invalid advert status filter',
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

  return await advertService.getAdverts(advertStatus, pagination);
}

// 3. Get Pending Adverts
export async function getPendingAdvertsAction(
  pagination?: Partial<PaginationParams>
): Promise<APIResponse<GetPendingAdvertsResponse>> {
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

  return await advertService.getPendingAdverts(pagination);
}

// 6. Process Advert Approval (Admin)
export async function processAdvertApprovalAction(
  advertId: number,
  formData: FormData
): Promise<APIResponse<ProcessAdvertApprovalResponse, AdvertApprovalPayload>> {
  const rawData: AdvertApprovalPayload = {
    action: formData.get('action') as 'APPROVE' | 'REJECT',
    rejectionReason: formData.get('rejectionReason') as string || undefined,
    startDate: formData.get('startDate') as string || undefined,
  };

  // Validate the form data
  const validatedData = AdvertApprovalSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      error: 'Please fix the errors in the form',
      fieldErrors: validatedData.error.flatten().fieldErrors,
      inputData: rawData
    };
  }

  const response = await advertService.processAdvertApproval(advertId, validatedData.data);

  if (response.success) {
    // Revalidate relevant pages
    revalidatePath('/admin/adverts/pending');
    revalidatePath('/admin/adverts');
    revalidatePath('/adverts');
    return {
      success: true,
      data: response.data,
    };
  } else {
    return {
      success: false,
      error: response.error || 'Failed to process advert approval',
      inputData: rawData
    };
  }
}

// 7. Cancel Advert
export async function cancelAdvertAction(
  advertId: number,
  formData: FormData
): Promise<APIResponse<CancelAdvertResponse, CancelAdvertPayload>> {
  const rawData: CancelAdvertPayload = {
    cancellationReason: formData.get('cancellationReason') as string,
  };

  // Validate the form data
  const validatedData = CancelAdvertSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      error: 'Please fix the errors in the form',
      fieldErrors: validatedData.error.flatten().fieldErrors,
      inputData: rawData
    };
  }

  const response = await advertService.cancelAdvert(advertId, validatedData.data);

  if (response.success) {
    // Revalidate relevant pages
    revalidatePath('/admin/adverts');
    revalidatePath('/adverts');
    revalidatePath('/');
    return {
      success: true,
      data: response.data,
    };
  } else {
    return {
      success: false,
      error: response.error || 'Failed to cancel advert',
      inputData: rawData
    };
  }
}

// Bonus: Get Active Adverts (for public display)
export async function getActiveAdvertsAction(): Promise<APIResponse<GetActiveAdvertsResponse>> {
  return await advertService.getActiveAdverts();
}