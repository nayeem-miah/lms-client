"use client";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        try {
            setLoading(true);
            setMessage("");

            // 1️⃣ Create payment intent
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/create-payment-intent`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amount: 1000 }), // $10
                }
            );

            const { clientSecret } = await res.json();
            console.log(clientSecret);

            // 2️⃣ Confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                },
            });

            console.log(result);

            if (result.error) {
                setMessage(result.error.message || "❌ Payment failed");
            } else if (result.paymentIntent?.status === "succeeded") {
                setMessage("✅ Payment successful!");
            }
        } catch (error) {
            setMessage("❌ Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || loading}>
                {loading ? "Processing..." : "Pay"}
            </button>
            {message && <p>{message}</p>}
        </form>
    );
}
