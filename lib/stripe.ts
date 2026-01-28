import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51PKm4VRurofIzrbC91TUapeDzGN8Ft6xyqLF6TxwtbT00tg84i0C44zQICp5ylRLOMs4YbcnwAMtMZomnTKhC8NC00KfnKrE1M" // publishable key
);
