import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

import STRIPE_PUBLISHABLE from "./constants/stripe";
import PAYMENT_SERVER_URL from "./constants/server";

const CURRENCY = "Rs.";

const fromDollarToCent = (amount) => parseInt(amount * 100);

const successPayment = (data) => {
  alert("Payment Successful");
};

const errorPayment = (data) => {
  alert("Payment Error");
};

const onToken = (amount, description) => (token) =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarToCent(amount),
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromDollarToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
    zipCode
    email
    allowRememberMe
    image="https://png.pngtree.com/png-clipart/20190925/original/pngtree-hand-painted-flat-mobile-phone-online-shopping-png-image_4986619.jpg" // the pop-in header image (default none)
    ComponentClass="div"
    panelLabel="Rs." // prepended to the amount in the bottom pay button
    locale="in"
    // Note: Enabling either address option will give the user the ability to
    // fill out both. Addresses are sent as a second parameter in the token callback.
    shippingAddress
    billingAddress={false}
    // Note: enabling both zipCode checks and billing or shipping address will
    // cause zipCheck to be pulled from billing address (set to shipping if none provided).

    //alipay // accept Alipay (default false)
    // bitcoin // accept Bitcoins (default false)
  />
);

export default Checkout;
