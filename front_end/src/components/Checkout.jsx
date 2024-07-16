import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Stripe publishable key
const stripePromise = loadStripe("pk_test_51PQmTxRwUzFk8T9DCSJvLEpeIC5cmYGnMEnQsUht5xLHFp3ImCPKcsBWuKPRg6ciKELcJn4ellupkkInMpQx8ggM00soU5HFON");

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found in local storage');
                    return;
                }
                const response = await axios.get('http://localhost:3001/cart', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCartItems(response.data);
                createCheckoutSession(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        const createCheckoutSession = async (items) => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post('http://localhost:3001/create-checkout-session', { items }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const { id: sessionId } = response.data;
                const stripe = await stripePromise;
                const result = await stripe.redirectToCheckout({
                    sessionId,
                });
                if (result.error) {
                    console.error(result.error.message);
                }
            } catch (error) {
                console.error('Error creating checkout session:', error);
            }
        };

        fetchCartItems();
    }, [navigate]);

    return (
        <div>
            <h2>Redirecting to Checkout...</h2>
        </div>
    );
};

export default Checkout;
