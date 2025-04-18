import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import {
  fetchProfile,
  updateProfileAction,
  updateProfileImageAction,
} from "@/utils/actions";
import { Profile } from "@prisma/client";
import ImageInputContainer from "@/components/form/ImageInputContainer";

const ProfilePage = async () => {
  const profile = (await fetchProfile()) as Profile;

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">Profile</h1>
      <div className="border p-8 rounded-md">
        <ImageInputContainer
          image={profile.profileImage}
          name={profile.username}
          action={updateProfileImageAction}
          text="Update Profile Image"
        />
        <FormContainer action={updateProfileAction}>
          <div className="grid md:grid-cols-2 gap-2 mt-4">
            <FormInput
              type="input"
              name="firstName"
              label="First Name"
              defaultValue={profile.firstName}
            />
            <FormInput
              type="input"
              name="lastName"
              label="Last Name"
              defaultValue={profile.lastName}
            />
            <FormInput
              type="input"
              name="username"
              label="Username"
              defaultValue={profile.username}
            />
          </div>
          <SubmitButton className="mt-4" text="Update Profile" />
        </FormContainer>
      </div>
    </section>
  );
};

export default ProfilePage;
