import * as z from "zod";
import { ZodSchema } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  username: z.string().min(2, { message: "Username must be at least 2 characters" }),
});

export const validateWithZodSchema = <T>(
  schema: ZodSchema<T>,
  data: unknown
): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((err) => err.message).join(",");
    throw new Error(errors);
  }

  return result.data;
};

const validateFile = () => {
  const maxUploadSize = 2 * 1024 * 1024; // 2MB
  const acceptedFileTypes = ["image/jpeg", "image/png"];

  return z.instanceof(File).refine((file) => {
    const isValidType = acceptedFileTypes.includes(file.type);
    const isValidSize = file.size <= maxUploadSize;
    return isValidType && isValidSize;
  }
  , {
    message: `File must be one of the following types: ${acceptedFileTypes.join(", ")} and less than 2MB`,
    params: {
      acceptedFileTypes,
      maxUploadSize,
    },
  });
};

export const imageSchema = z.object({
  image: validateFile()
});
