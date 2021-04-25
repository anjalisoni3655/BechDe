const configureStripe = require("stripe");

const STRIPE_SECRET_KEY =
  process.env.NODE_ENV === "production"
    ? "pk_test_51Ik3DnSBixcBTc9Qgo3W5jVz2qAcRUp29S1FojCxAmEJX7Qu6kPbpwONa9dhMU8Dpfe7t2cHMY6EVIERBM6rlwGK00abjTANpU"
    : "pk_test_51Ik3DnSBixcBTc9Qgo3W5jVz2qAcRUp29S1FojCxAmEJX7Qu6kPbpwONa9dhMU8Dpfe7t2cHMY6EVIERBM6rlwGK00abjTANpU";

 
const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
