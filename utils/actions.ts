"use server";

import { profileSchema } from "./schemas";

export const createProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = profileSchema.parse(rawData);

    console.log("rawData", validatedFields);

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Profile created successfully", rawData);
        resolve({ message: "Profile created successfully" });
      }, 200);
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    return { message: "Error creating profile." };
  }
};
