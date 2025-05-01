import { fetchProperties } from "@/utils/actions";
import PropertiesList from "./PropertiesList";
import EmptyList from "./EmptyList";
import type { PropertyCardProps } from "@/utils/types";
import { ErrorResponse } from "@/utils/types";

const PropertiesContainer = async ({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) => {
  const properties: PropertyCardProps[] | ErrorResponse = await fetchProperties({
    category,
    search,
  });

  if (!Array.isArray(properties) && "message" in properties) {
    return (
      <EmptyList
        heading="Error"
        message="Something went wrong while fetching properties."
        btnText="Try Again"
      />
    );
  }

  if (Array.isArray(properties) && properties.length === 0) {
    return (
      <EmptyList
        heading="No results."
        message="Try changing or removing some of your filters."
        btnText="Clear Filters"
      />
    );
  }

  return <PropertiesList properties={properties} />;
};
export default PropertiesContainer;
