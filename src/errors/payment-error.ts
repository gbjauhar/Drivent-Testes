import { ApplicationError } from "@/protocols";

export function paymentRequired(): ApplicationError {
  return {
    name: "PaymentRequired",
    message: "A payment is required for this search!",
  };
}
  
