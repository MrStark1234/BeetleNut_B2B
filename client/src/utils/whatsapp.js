export const buildWhatsAppLink = ({ message }) => {
  const num = "919576089007"; // keep digits only
  const text = encodeURIComponent(message || "");
  return `https://api.whatsapp.com/send?phone=${num}&text=${text}`;
};

// export const defaultInquiryMessage = ({ productName, productType }) => {
//   const parts = [
//     "Hello! I have a query about the ",
//     productName ? `Product name: ${productName}` : null,
//     productType
//       ? ` of Type: ${productType}, could you please provide me some more details about it.`
//       : null,
//   ];
//   return parts;
// };
