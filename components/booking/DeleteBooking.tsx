import { deleteBookingAction } from "@/utils/actions";
import { IconButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";

const DeleteBooking = ({ bookingId }: { bookingId: string }) => {
  const deleteBooking = deleteBookingAction.bind(null, { bookingId });

  return (
    <FormContainer action={deleteBooking}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
};

export default DeleteBooking;
