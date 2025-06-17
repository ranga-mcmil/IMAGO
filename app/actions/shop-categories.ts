"use server"

import { revalidatePath } from "next/cache"

export type ShopCategoryFormState = {
  success?: boolean
  message?: string
  errors?: {
    name?: string[]
    description?: string[]
    thumbnail?: string[]
  }
}

export async function createShopCategory(
  prevState: ShopCategoryFormState,
  formData: FormData,
): Promise<ShopCategoryFormState> {
  // Extract form data
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const thumbnail = formData.get("thumbnail") as File

  // Validate form data
  const errors: ShopCategoryFormState["errors"] = {}

  if (!name || name.trim() === "") {
    errors.name = ["Name is required"]
  } else if (name.length < 2) {
    errors.name = ["Name must be at least 2 characters"]
  }

  if (!description || description.trim() === "") {
    errors.description = ["Description is required"]
  }

  // If there are validation errors, return them
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    }
  }

  // Simulate a delay to mimic server processing
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // In a real application, you would save the category to a database here
    console.log("Creating shop category:", { name, description })

    // Revalidate the shop categories page to show the new category
    revalidatePath("/shops/categories")

    // Return success state
    return {
      success: true,
      message: "Shop category created successfully",
    }
  } catch (error) {
    // Return error state
    return {
      success: false,
      message: "Failed to create shop category. Please try again.",
    }
  }
}
