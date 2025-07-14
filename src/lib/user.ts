"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { ActionResult } from "@/types/action";
import { User, UserData } from "@/types/user";
import { Role } from "@prisma/client";

export async function getUsers(): Promise<User[]> {
  return await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserById(id: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function editUser(id: string, role: Role): Promise<ActionResult<UserData>> {
  try {
    await prisma.user.update({
      where: { id },
      data: { role },
    });

    revalidatePath("/dashboard/tech");
    return { success: true };
  } catch (error) {
    console.error("Failed to update user role:", error);
    return { 
      success: false, 
      error: "Failed to update user role. Please try again." 
    };
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    });

    revalidatePath("/dashboard/tech");
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw new Error("Failed to delete user. Please try again.");
  }
}
