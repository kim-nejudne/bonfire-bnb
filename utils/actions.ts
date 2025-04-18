"use server";

import { profileSchema } from "./schemas";
import db from "./db";
import { auth, clerkClient, currentUser, User } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Profile } from "@prisma/client";

const getAuthUser = async (): Promise<User> => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  if (!user.privateMetadata?.hasProfile) {
    redirect("/profile/create");
  }

  return user;
};

export const createProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = profileSchema.parse(rawData);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validatedFields,
      },
    });

    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }

  redirect("/");
};

export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = profileSchema.parse(rawData);
    const profile = await db.profile.findUnique({
      where: {
        clerkId: user.id,
      },
    });
    if (!profile) {
      throw new Error("Profile not found");
    }
    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        ...validatedFields,
        profileImage: user.imageUrl ?? "",
      },
    });
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });

    return { message: "Profile updated successfully" };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

export const fetchProfileImage = async (): Promise<string | undefined> => {
  try {
    const user = await getAuthUser();
    const profile = await db.profile.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        profileImage: true,
      },
    });

    return profile?.profileImage;
  } catch (error) {
    console.error("Error fetching profile image:", error);
    throw error;
  }
};

export const fetchProfile = async (): Promise<Profile> => {
  try {
    const user = await getAuthUser();
    const profile = await db.profile.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (!profile) {
      throw new Error("Profile not found");
    }

    return profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};
