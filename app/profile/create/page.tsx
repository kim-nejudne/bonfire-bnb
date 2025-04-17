import { SubmitButton } from "@/components/form/Buttons";
import FormInput from "@/components/form/FormInput";
import FormContainer from "@/components/form/FormContainer";
import { createProfileAction } from "@/utils/actions";

const CreateProfile = () => {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">new user</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createProfileAction}>
          <div className="grid md:grid-cols-2 gap-2 mt-4">
            <FormInput type="input" name="firstName" label="First Name" />
            <FormInput type="input" name="lastName" label="Last Name" />
            <FormInput type="input" name="username" label="Username" />
          </div>
          <SubmitButton className="mt-4" text="Create Profile" />
        </FormContainer>
      </div>
    </section>
  );
};
export default CreateProfile;
