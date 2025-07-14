"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { ActionResult } from "@/types/action";
import {
  Achievement,
  AchievementData,
  AchievementSchema,
} from "@/types/achievement";

export async function getAchievements(): Promise<Achievement[]> {
  return await prisma.achievement.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getAchievementById(
  id: string
): Promise<Achievement | null> {
  return await prisma.achievement.findUnique({
    where: { id },
  });
}

export async function createAchievement(
  formData: FormData
): Promise<ActionResult<Achievement>> {
  try {
    const rawData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      imagePublicId: formData.get("imagePublicId") as string,
    };

    const validationResult = AchievementSchema.safeParse(rawData);

    if (!validationResult.success) {
      const errors = validationResult.error.issues
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      return {
        success: false,
        error: `Validation failed: ${errors}`,
      };
    }

    const validatedData = validationResult.data;

    const achievement = await prisma.achievement.create({
      data: validatedData,
    });

    revalidatePath("/dashboard/sa");

    return {
      success: true,
      data: achievement,
      message: "Achievement created successfully!",
    };
  } catch (error) {
    console.error("Failed to create achievement:", error);
    return {
      success: false,
      error: "Failed to create achievement. Please try again.",
    };
  }
}

export async function editAchievement(
  id: string,
  formData: FormData
): Promise<ActionResult<AchievementData>> {
  try {
    const rawData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      imagePublicId: formData.get("imagePublicId") as string,
    };

    const validationResult = AchievementSchema.safeParse(rawData);

    if (!validationResult.success) {
      const errors = validationResult.error.issues
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      return {
        success: false,
        error: `Validation failed: ${errors}`,
      };
    }

    const validatedData = validationResult.data;

    const achievement = await prisma.achievement.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath("/dashboard/sa");

    return {
      success: true,
      data: achievement,
      message: "Achievement updated successfully!",
    };
  } catch (error) {
    console.error("Failed to update achievement:", error);
    return {
      success: false,
      error: "Failed to update achievement. Please try again.",
    };
  }
}

export async function deleteAchievement(
  id: string
): Promise<ActionResult<void>> {
  try {
    await prisma.achievement.delete({
      where: { id },
    });

    revalidatePath("/dashboard/sa");

    return {
      success: true,
      message: "Achievement deleted successfully!",
    };
  } catch (error) {
    console.error("Failed to delete achievement:", error);
    return {
      success: false,
      error: "Failed to delete achievement. Please try again.",
    };
  }
}
