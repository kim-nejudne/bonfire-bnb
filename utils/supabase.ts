import { createClient } from "@supabase/supabase-js";

const bucket = "bonfire-bnb";
const url = process.env.SUPABASE_URL as string;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

const supabase = createClient(url, key);

export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  const newName = `${timestamp}-${image.name}`;

  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: "3600", upsert: false });

  if (!data) {
    throw new Error("Failed to upload image");
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(newName);

  return publicUrl;
};
