import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51Qs0eP2fzaNCXv9FsffOpyFIUm9f0c1qh3pRB4QVpjvLvLNeU97fPbcOGoxKdUHBR3XWF6DDUR3J2r2Hx9IUDMax000N1l4XiM");

export function Message() {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('🎉 Payment Successful! Thank you for your purchase.');
          setStatus('success');
          break;
        case 'processing':
          setMessage("⏳ Your payment is processing. We'll notify you once it's confirmed.");
          setStatus('processing');
          break;
        case 'requires_payment_method':
          setMessage('❌ Payment failed. Please try again with another method.');
          setStatus('failed');
          break;
        default:
          setMessage('⚠️ Something went wrong. Please contact support.');
          setStatus('error');
          break;
      }
    });
  }, [stripe]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className={`shadow-lg rounded-lg p-8 w-full max-w-md text-center transition-all transform duration-300 
        ${status === 'success' ? 'bg-white border-green-500' : 
          status === 'failed' ? 'bg-white border-red-500' : 
          'bg-white border-gray-300'}
        border-4`}>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {status === 'success' ? '✅ Payment Successful' :
            status === 'failed' ? '❌ Payment Failed' :
            'ℹ️ Payment Status'}
        </h2>

        <p className={`text-lg font-medium leading-relaxed 
          ${status === 'success' ? 'text-green-600' : 
            status === 'failed' ? 'text-red-600' : 
            'text-gray-600'}`}>
          {message || 'Fetching payment status...'}
        </p>

        {status === 'success' && (
          <div className="mt-6">
            <a href="/" className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition">
              Return to Home
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function PaymentStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    'payment_intent_client_secret'
  );

  if (!clientSecret) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center border-4 border-red-500">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            ⚠️ Payment Error
          </h2>
          <p className="text-gray-600">Invalid Payment Request. Missing client secret.</p>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <Message />
    </Elements>
  );
}

export default PaymentStatus;
