'use server';

import { APIResponse } from "@/lib/http-service/apiClient";
import { usersService } from "@/lib/http-service/users";
import { 
  CreateUserSchema,
  UpdateUserSchema,
  UpdateUserV2Schema,
  ForgotPasswordSchema,
  OtpRequestSchema,
  ChangePasswordSchema,
  EmailSchema,
  PaginationSchema
} from "@/lib/http-service/users/schema";
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
} from "@/lib/http-service/users/types";
import { revalidatePath } from "next/cache";

// 1. Create User
export async function createUserAction(
  formData: FormData
): Promise<APIResponse<CreateUserResponse, CreateUserPayload>> {
  const rawData: CreateUserPayload = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    phoneNumber: formData.get('phoneNumber') as string,
    firstName: formData.get('firstName') as string || undefined,
    lastName: formData.get('lastName') as string || undefined,
    role: formData.get('role') as string,
  };

  // Validate the form data
  const validatedData = CreateUserSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      error: 'Please fix the errors in the form',
      fieldErrors: validatedData.error.flatten().fieldErrors,
      inputData: rawData
    };
  }

  const response = await usersService.createUser(validatedData.data);

  if (response.success) {
    // Revalidate relevant pages
    revalidatePath('/users');
    revalidatePath('/admin/users');
    return {
      success: true,
      data: response.data,
    };
  } else {
    return {
      success: false,
      error: response.error || 'Failed to create user',
      inputData: rawData
    };
  }
}

// 2. Get Users (with pagination)
export async function getUsersAction(
  pagination?: Partial<PaginationParams>
): Promise<APIResponse<GetUsersResponse>> {
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

  return await usersService.getUsers(pagination);
}

// 3. Get User by Email
export async function getUserByEmailAction(
  email: string
): Promise<APIResponse<GetUserResponse>> {
  // Validate email
  const validatedData = EmailSchema.safeParse({ email });

  if (!validatedData.success) {
    return {
      success: false,
      error: 'Invalid email provided',
      fieldErrors: validatedData.error.flatten().fieldErrors,
    };
  }

  return await usersService.getUserByEmail(email);
}

// 4. Update User
export async function updateUserAction(
  email: string,
  formData: FormData
): Promise<APIResponse<UpdateUserResponse, UpdateUserPayload>> {
  const rawData: UpdateUserPayload = {
    email: formData.get('email') as string,
    phoneNumber: formData.get('phoneNumber') as string,
    firstName: formData.get('firstName') as string || undefined,
    lastName: formData.get('lastName') as string || undefined,
    role: formData.get('role') as string,
  };

  // Validate email parameter
  const emailValidation = EmailSchema.safeParse({ email });
  if (!emailValidation.success) {
    return {
      success: false,
      error: 'Invalid email parameter provided',
      inputData: rawData
    };
  }

  // Validate the form data
  const validatedData = UpdateUserSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      error: 'Please fix the errors in the form',
      fieldErrors: validatedData.error.flatten().fieldErrors,
      inputData: rawData
    };
  }

  const response = await usersService.updateUser(email, validatedData.data);

  if (response.success) {
    // Revalidate relevant pages
    revalidatePath('/users');
    revalidatePath(`/users/${encodeURIComponent(email)}`);
    revalidatePath('/admin/users');
    return {
      success: true,
      data: response.data,
    };
  } else {
    return {
      success: false,
      error: response.error || 'Failed to update user',
      inputData: rawData
    };
  }
}

// 5. Update User V2
export async function updateUserV2Action(
  email: string,
  formData: FormData
): Promise<APIResponse<UpdateUserV2Response, UpdateUserV2Payload>> {
  const rawData: UpdateUserV2Payload = {
    email: formData.get('email') as string,
    phoneNumber: formData.get('phoneNumber') as string,
    firstName: formData.get('firstName') as string || undefined,
    lastName: formData.get('lastName') as string || undefined,
    role: formData.get('role') as string,
  };

  // Validate email parameter
  const emailValidation = EmailSchema.safeParse({ email });
  if (!emailValidation.success) {
    return {
      success: false,
      error: 'Invalid email parameter provided',
      inputData: rawData
    };
  }

  // Validate the form data
  const validatedData = UpdateUserV2Schema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      error: 'Please fix the errors in the form',
      fieldErrors: validatedData.error.flatten().fieldErrors,
      inputData: rawData
    };
  }

  const response = await usersService.updateUserV2(email, validatedData.data);

  if (response.success) {
    // Revalidate relevant pages
    revalidatePath('/users');
    revalidatePath(`/users/${encodeURIComponent(email)}`);
    revalidatePath('/admin/users');
    return {
      success: true,
      data: response.data,
    };
  } else {
    return {
      success: false,
      error: response.error || 'Failed to update user',
      inputData: rawData
    };
  }
}

// 6. Get Current User
export async function getCurrentUserAction(): Promise<APIResponse<GetCurrentUserResponse>> {
  return await usersService.getCurrentUser();
}

// 7. Forgot Password Reset
export async function forgotPasswordResetAction(
  formData: FormData
): Promise<APIResponse<ForgotPasswordResetResponse, ForgotPasswordPayload>> {
  const rawData: ForgotPasswordPayload = {
    email: formData.get('email') as string,
    newPassword: formData.get('newPassword') as string,
  };

  // Validate the form data
  const validatedData = ForgotPasswordSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      error: 'Please fix the errors in the form',
      fieldErrors: validatedData.error.flatten().fieldErrors,
      inputData: rawData
    };
  }

  const response = await usersService.forgotPasswordReset(validatedData.data);

  if (response.success) {
    return {
      success: true,
      data: response.data,
    };
  } else {
    return {
      success: false,
      error: response.error || 'Failed to reset password',
      inputData: rawData
    };
  }
}

// 8. Forgot Password OTP
export async function forgotPasswordOtpAction(
  formData: FormData
): Promise<APIResponse<ForgotPasswordOtpResponse, OtpRequestPayload>> {
  const rawData: OtpRequestPayload = {
    email: formData.get('email') as string,
  };

  // Validate the form data
  const validatedData = OtpRequestSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      error: 'Please fix the errors in the form',
      fieldErrors: validatedData.error.flatten().fieldErrors,
      inputData: rawData
    };
  }

  const response = await usersService.forgotPasswordOtp(validatedData.data);

  if (response.success) {
    return {
      success: true,
      data: response.data,
    };
  } else {
    return {
      success: false,
      error: response.error || 'Failed to send OTP',
      inputData: rawData
    };
  }
}

// 9. Change Password
export async function changePasswordAction(
  formData: FormData
): Promise<APIResponse<ChangePasswordResponse, ChangePasswordPayload>> {
  const rawData: ChangePasswordPayload = {
    currentPassword: formData.get('currentPassword') as string,
    newPassword: formData.get('newPassword') as string,
  };

  // Validate the form data
  const validatedData = ChangePasswordSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      error: 'Please fix the errors in the form',
      fieldErrors: validatedData.error.flatten().fieldErrors,
      inputData: rawData
    };
  }

  const response = await usersService.changePassword(validatedData.data);

  if (response.success) {
    // Revalidate relevant pages
    revalidatePath('/profile');
    revalidatePath('/settings');
    return {
      success: true,
      data: response.data,
    };
  } else {
    return {
      success: false,
      error: response.error || 'Failed to change password',
      inputData: rawData
    };
  }
}