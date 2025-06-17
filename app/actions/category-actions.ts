"use server"

import { revalidatePath } from "next/cache"

// Types for our category data
export type Category = {
  id: number
  name: string
  description: string
}

// Mock database for categories (in a real app, this would be a database)
let productCategories: Category[] = Array.from({ length: 20 }, (_, i) => {
  const id = i + 1
  return {
    id,
    name: id <= 4 ? ["Sweatshirts", "Shirts", "Pants", "Merch"][i] : `Category ${id}`,
    description: `Description for ${id <= 4 ? ["Sweatshirts", "Shirts", "Pants", "Merch"][i] : `Category ${id}`}`,
  }
})

let shopCategories: Category[] = Array.from({ length: 20 }, (_, i) => {
  const id = i + 1
  return {
    id,
    name: id <= 4 ? ["Retail Stores", "Online Shops", "Pop-up Shops", "Outlet Stores"][i] : `Category ${id}`,
    description: `Description for ${id <= 4 ? ["Retail Stores", "Online Shops", "Pop-up Shops", "Outlet Stores"][i] : `Category ${id}`}`,
  }
})

// Get categories - these functions return promises and are called from server components
export async function getProductCategories(): Promise<Category[]> {
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 100))
  return [...productCategories]
}

export async function getShopCategories(): Promise<Category[]> {
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 100))
  return [...shopCategories]
}

// Delete a product category
export async function deleteProductCategory(id: number): Promise<{ success: boolean; message: string }> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Find the category index
    const index = productCategories.findIndex((category) => category.id === id)

    if (index === -1) {
      return { success: false, message: "Category not found" }
    }

    // Remove the category
    productCategories = productCategories.filter((category) => category.id !== id)

    // Revalidate the path to update the UI
    revalidatePath("/products/categories")

    return { success: true, message: "Category deleted successfully" }
  } catch (error) {
    return { success: false, message: "Failed to delete category" }
  }
}

// Delete a shop category
export async function deleteShopCategory(id: number): Promise<{ success: boolean; message: string }> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Find the category index
    const index = shopCategories.findIndex((category) => category.id === id)

    if (index === -1) {
      return { success: false, message: "Category not found" }
    }

    // Remove the category
    shopCategories = shopCategories.filter((category) => category.id !== id)

    // Revalidate the path to update the UI
    revalidatePath("/shops/categories")

    return { success: true, message: "Category deleted successfully" }
  } catch (error) {
    return { success: false, message: "Failed to delete category" }
  }
}

// Update a product category
export async function updateProductCategory(
  id: number,
  data: { name: string; description: string },
): Promise<{ success: boolean; message: string }> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Find the category
    const categoryIndex = productCategories.findIndex((category) => category.id === id)

    if (categoryIndex === -1) {
      return { success: false, message: "Category not found" }
    }

    // Update the category
    productCategories = productCategories.map((category) => (category.id === id ? { ...category, ...data } : category))

    // Revalidate the path to update the UI
    revalidatePath("/products/categories")

    return { success: true, message: "Category updated successfully" }
  } catch (error) {
    return { success: false, message: "Failed to update category" }
  }
}

// Update a shop category
export async function updateShopCategory(
  id: number,
  data: { name: string; description: string },
): Promise<{ success: boolean; message: string }> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Find the category
    const categoryIndex = shopCategories.findIndex((category) => category.id === id)

    if (categoryIndex === -1) {
      return { success: false, message: "Category not found" }
    }

    // Update the category
    shopCategories = shopCategories.map((category) => (category.id === id ? { ...category, ...data } : category))

    // Revalidate the path to update the UI
    revalidatePath("/shops/categories")

    return { success: true, message: "Category updated successfully" }
  } catch (error) {
    return { success: false, message: "Failed to update category" }
  }
}
