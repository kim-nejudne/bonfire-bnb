import { deleteRentalAction } from "@/utils/actions";
import { IconButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";

const DeleteRental = ({ propertyId }: { propertyId: string }) => {
  const deleteRental = deleteRentalAction.bind(null, { propertyId });
  return (
    <FormContainer action={deleteRental}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
};

export default DeleteRental;
