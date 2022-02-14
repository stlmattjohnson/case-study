export const stringifyDetails = (
  details: (string | number | undefined | null)[]
): string => {
  const displayDetails = details
    .filter((detail) => typeof detail === "string" && detail.length > 0)
    .join(" | ");
  return displayDetails;
};
