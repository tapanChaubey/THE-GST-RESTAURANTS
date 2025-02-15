import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements, Elements, PaymentElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51Qs0eP2fzaNCXv9FsffOpyFIUm9f0c1qh3pRB4QVpjvLvLNeU97fPbcOGoxKdUHBR3XWF6DDUR3J2r2Hx9IUDMax000N1l4XiM");

export function CheckOutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setErrorMessage("");

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/status`,
            },
        });

        if (result.error) {
            setErrorMessage(result.error.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white p-6">
            <div className="bg-gray-100 shadow-md rounded-lg p-8 w-full max-w-md h-auto min-h-[500px] flex flex-col justify-center">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Secure Payment</h2>

                <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col justify-between">
                    <PaymentElement />

                    {errorMessage && (
                        <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded">{errorMessage}</p>
                    )}

                    <button 
                        className={`w-full flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-md transition-all duration-300 ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={!stripe || !elements || loading}
                    >
                        {loading ? (
                            <span className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></span>
                        ) : (
                            "Pay Now"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

function Payment() {
    const client_secret = new URLSearchParams(window.location.search).get("client_secret");

    const options = {
        clientSecret: client_secret,
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckOutForm />
        </Elements>
    );
}

export default Payment;
