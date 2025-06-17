'use server';

import { APIResponse } from "@/lib/http-service/apiClient";
import { imagoInfoService } from "@/lib/http-service/imago-info";
import { ImagoInfoSchema } from "@/lib/http-service/imago-info/schema";
import { 
  ImagoInfoPayload, 
  CreateOrUpdateImagoInfoResponse,
  GetImagoInfoResponse
} from "@/lib/http-service/imago-info/types";
import { revalidatePath } from "next/cache";

export async function createOrUpdateImagoInfoAction(
  formData: FormData
): Promise<APIResponse<CreateOrUpdateImagoInfoResponse, ImagoInfoPayload>> {
  const rawData: ImagoInfoPayload = {
    email: formData.get('email') as string,
    phoneNumber: formData.get('phoneNumber') as string,
    companyName: formData.get('companyName') as string,
  };

  // Validate the form data
  const validatedData = ImagoInfoSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      error: 'Please fix the errors in the form',
      fieldErrors: validatedData.error.flatten().fieldErrors,
      inputData: rawData
    };
  }

  const response = await imagoInfoService.createOrUpdateImagoInfo(validatedData.data);

  if (response.success) {
    revalidatePath('/settings/company');
    revalidatePath('/');
    return {
      success: true,
      data: response.data,
    };
  } else {
    return {
      success: false,
      error: response.error || 'Failed to save company information',
      inputData: rawData
    };
  }
}

export async function getImagoInfoAction(): Promise<APIResponse<GetImagoInfoResponse>> {
  return await imagoInfoService.getImagoInfo();
}