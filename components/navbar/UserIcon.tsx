import { LucideUser2 } from "lucide-react";
import { fetchProfileImage } from "@/utils/actions";
import Image from "next/image";

const UserIcon = async () => {
  const profileImage = await fetchProfileImage();

  console.log("Profile Image:", profileImage);

  if (profileImage) {
    return (
      <Image
        src={profileImage}
        alt="User Profile"
        className="w-6 h-6 bg-primary rounded-full"
        width={24}
        height={24}
      />
    );
  }

  return <LucideUser2 className="w-6 h-6 bg-primary rounded-full text-white" />;
};
export default UserIcon;
