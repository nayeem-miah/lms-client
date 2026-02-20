import CheckoutForm from "@/components/checkout/CheckoutForm";
import StripeProvider from "../providers/StripeProvider";

export default function Page() {
    return (
        <StripeProvider>
            <CheckoutForm />
        </StripeProvider>
    );
}
