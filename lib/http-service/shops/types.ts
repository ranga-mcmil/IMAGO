import { z } from "zod";
import { UpdateBranchSchema, CreateCategorySchema } from "./schema";

export type CreateCategoryPayload = z.infer<typeof CreateCategorySchema>
export type UpdateBranchPayload = z.infer<typeof UpdateBranchSchema>

export type Category = {
  id: number;
  name: string;
  description: string;
  iconUrl: string;
};


export type CreateCategoryResponse = Category
export type GetCategoriesResponse = Category[]
