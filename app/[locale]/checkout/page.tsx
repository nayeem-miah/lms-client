import CheckoutForm from "@/components/checkout/CheckoutForm";
import StripeProvider from "@/app/providers/StripeProvider";

export default function Page() {
    return (
        <StripeProvider>
            <CheckoutForm />
        </StripeProvider>
    );
}
