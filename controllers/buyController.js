const stripe = require('stripe')('sk_test_51OmgPMCmZfq7z36s0bbAiXm8l38UGRptqo7bZadRc2n15uVRk3Q385aGzVQrEamDXyNwW12NS987gNxkE53KLGXH00FpKWgMbt');
const jwt = require('jsonwebtoken');


const handlerV = jwt.verify({
  issuer: "https://" + "dev-3f3dtkzzoe0a41k3.us.auth0.com" + "/",
  audience: "http://localhost:5173/",
},async function (req, res) {
  // Get Stripe Customer ID from Access Token
  const stripeCustomerId = res.identityContext.claims["http://localhost:5173" + "/stripe_customer_id"];

  // Decode the payload
  const payload = JSON.parse(req.body);

  // Create a new Stripe Checkout Session
  //
  // See Stripe docs: https://stripe.com/docs/api/checkout/sessions/create
  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:5173" + "/success",
    cancel_url: "http://localhost:5173" + "/",
    payment_method_types: ["card"],
    customer: stripeCustomerId,
    line_items: [
      {
        price: payload.priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  return res.status(200).json({
    msg:"todo va bien",
    body:session
  })
    
  // {
  //   statusCode: 200,
  //   body: JSON.stringify(session),
  // };
});

module.exports={
  handlerV
}