const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
async function CreateStripeSession(req, res) {
  const { items } = req.body;

  const transformedItems = items.map((item) => ({
    description: item.description,
    quantity: item.count,
    price_data: {
      currency: "USD",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  console.log(transformedItems)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: transformedItems,
    mode: "payment",
    success_url: `${req.headers.origin}/`,
    cancel_url: `${req.headers.origin}/cart`,
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;
