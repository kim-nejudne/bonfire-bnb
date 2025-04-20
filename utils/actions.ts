"use server";

import { imageSchema, profileSchema, propertySchema, validateWithZodSchema } from "./schemas";
import db from "./db";
import { auth, clerkClient, currentUser, User } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Profile } from "@prisma/client";
import { uploadImage } from "./supabase";

type ErrorResponse = {
  message: string;
};

const renderError = (error: unknown): ErrorResponse => {
  if (error instanceof Error) {
    return { message: error.message };
  }
  if (typeof error === "string") {
    return { message: error };
  }
  if (typeof error === "object" && error !== null) {
    return { message: JSON.stringify(error) };
  }
  return { message: "An unknown error occurred" };
};

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
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

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
    renderError(error);
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
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

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

    revalidatePath("/profile");
    return { message: "Profile updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchProfileImage = async (): Promise<
  string | undefined | ErrorResponse
> => {
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
    return renderError(error);
  }
};

export const fetchProfile = async (): Promise<Profile | ErrorResponse> => {
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
    return renderError(error);
  }
};

export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const image = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(imageSchema, { image });

    if (!validatedFields) {
      throw new Error("Invalid image");
    }

    const fullPath = await uploadImage(validatedFields.image);

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: fullPath,
      },
    });

    revalidatePath("/profile");

    return { message: "Profile image updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const createPropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(propertySchema, rawData);
  } catch (error) {
    return renderError(error);
  }
  redirect("/");
};
