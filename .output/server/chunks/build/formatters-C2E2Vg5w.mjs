const avatarText = (value) => {
  if (!value)
    return "";
  const nameArray = value.split(" ");
  return nameArray.map((word) => word.charAt(0).toUpperCase()).join("");
};
const currencyFormatter = (value) => {
  if (!value || typeof value === "undefined")
    return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR"
  }).format(value);
};

export { avatarText as a, currencyFormatter as c };
//# sourceMappingURL=formatters-C2E2Vg5w.mjs.map
