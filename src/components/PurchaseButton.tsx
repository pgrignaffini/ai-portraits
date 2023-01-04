import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PurchaseButton() {
    React.useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you&apos;re ready.');
        }
    }, []);

    return (
        <form action="/api/checkoutSessions" method="POST">
            <section>
                <button className="rounded-md bg-violet-500 text-white p-2 px-4"
                    type="submit" role="link">
                    Checkout
                </button>
            </section>
        </form>
    );
}