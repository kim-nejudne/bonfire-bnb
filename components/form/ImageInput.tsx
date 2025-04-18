import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ImageInput = () => {
  const name = "image";

  return (
    <div className="mb-2">
      <Label
        htmlFor="image"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Image
      </Label>
      <Input
        id={name}
        name={name}
        type="file"
        required
        accept="image/*"
        className="max-w-xs"
      />
    </div>
  );
};

export default ImageInput;
