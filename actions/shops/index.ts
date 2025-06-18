'use server';

import { APIResponse } from "@/lib/http-service/apiClient"; 
import { shopsService } from "@/lib/http-service/shops";
import { CreateCategorySchema, PaginationSchema, UpdateCategorySchema } from "@/lib/http-service/shops/schema";
import { 
  CreateCategoryPayload, 
  CreateCategoryResponse, 
  GetCategoriesResponse,
  GetShopsResponse,
  PaginationParams,
  UpdateCategoryPayload,
  UpdateCategoryResponse,
} from "@/lib/http-service/shops/types";
import { revalidatePath } from "next/cache";

// Get All Shops (with pagination)
export async function getShopsAction(
  pagination?: Partial<PaginationParams>
): Promise<APIResponse<GetShopsResponse>> {
  // Validate pagination if provided
  if (pagination) {
    const paginationValidation = PaginationSchema.partial().safeParse(pagination);
    if (!paginationValidation.success) {
      return {
        success: false,
        error: 'Invalid pagination parameters',
        fieldErrors: paginationValidation.error.flatten().fieldErrors,
      };
    }
  }

  return await shopsService.getShops(pagination);
}

export async function createCategoryAction(
  initialData: any, 
  formData: FormData
): Promise<APIResponse<CreateCategoryResponse, CreateCategoryPayload>> {
  const icon = formData.get('icon');
  const description = formData.get('description') as string;
  const name = formData.get('name') as string;

  const rawData: CreateCategoryPayload = {
    icon: icon as File,
    name,
    description,
  };

  // Validate the form data
  const validatedData = CreateCategorySchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      error: 'Please fix the errors in the form',
      fieldErrors: validatedData.error.flatten().fieldErrors,
      inputData: rawData
    };
  }

  if (!(icon instanceof File)) {
    return { 
      success: false, 
      error: 'Please select a valid icon file.',
      inputData: rawData
    };
  }

  try {
    // // Prepare FormData for API call according to OpenAPI spec
    // const apiFormData = new FormData();
    // apiFormData.append('icon', icon);
    
    // // The API expects categoryRequestDTO as a JSON string
    // const categoryRequestDTO = JSON.stringify({
    //   name: validatedData.data.name,
    //   description: validatedData.data.description,
    // });
    // apiFormData.append('categoryRequestDTO', categoryRequestDTO);

    const response = await shopsService.createCategory(formData);

    if (response.success) {
      revalidatePath('/categories');
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        error: response.error || 'Failed to create category',
        inputData: rawData
      };
    }
  } catch (error) {
    console.error('Error creating category:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while creating the category.',
      inputData: rawData
    };
  }
}

export async function updateCategoryAction(
  formData: FormData, 
  categoryId: number
): Promise<APIResponse<UpdateCategoryResponse, UpdateCategoryPayload>> {
  const rawData: UpdateCategoryPayload = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
  };

  // Validate the form data
  const validatedData = UpdateCategorySchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      error: 'Please fix the errors in the form',
      fieldErrors: validatedData.error.flatten().fieldErrors,
      inputData: rawData
    };
  }

  const response = await shopsService.updateCategory(validatedData.data, categoryId);

  console.log("%%%")
  console.log("%%%")
  console.log("%%%")
  console.log("%%%")
  console.log("%%%")
  console.log("%%%")
  console.log(response)
  console.log("%%%")
  console.log("%%%")
  console.log("%%%")
  console.log("%%%")
  console.log("%%%")
  console.log("%%%")
  console.log("%%%")


  if (response.success) {
    revalidatePath('/categories');
    revalidatePath(`/categories/${categoryId}`);
    return {
      success: true,
      data: response.data,
    };
  } else {
    return {
      success: false,
      error: response.error || 'Failed to update category',
      inputData: rawData
    };
  }
}

export async function deleteCategoryAction(categoryId: number): Promise<APIResponse<void>> {
  const response = await shopsService.deleteCategory(categoryId);
  
  if (response.success) {
    revalidatePath('/categories');
  }
  
  return response;
}

export async function uploadCategoryIconAction(
  categoryId: number, 
  formData: FormData
): Promise<APIResponse<any>> {
  const icon = formData.get('icon');

  if (!(icon instanceof File)) {
    return { 
      success: false, 
      error: 'Please select a valid icon file.' 
    };
  }

  const response = await shopsService.uploadCategoryIcon(categoryId, icon);
  
  if (response.success) {
    revalidatePath('/categories');
    revalidatePath(`/categories/${categoryId}`);
  }
  
  return response;
}

export async function getCategoriesAction(): Promise<APIResponse<GetCategoriesResponse>> {
  return await shopsService.getCategories();
}

// Legacy function to maintain backward compatibility
export async function getCategoriessAction(): Promise<APIResponse<GetCategoriesResponse>> {
  return await shopsService.getCategories();
}