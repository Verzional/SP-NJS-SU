import z from "zod";
import { FormProps } from "./action";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AchievementData {
  title: string;
  description: string;
  imageUrl: string | null;
  imagePublicId: string | null;
}

export type AchievementFormProps = FormProps<Achievement>;

export const AchievementSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),

  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),

  imageUrl: z
    .string()
    .nullable()
    .optional()
    .transform((val) => val || null),

  imagePublicId: z
    .string()
    .nullable()
    .optional()
    .transform((val) => val || null),
});

export type AchievementInput = z.infer<typeof AchievementSchema>;
