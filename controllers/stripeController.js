const stripe = require('stripe')('sk_test_51OmgPMCmZfq7z36s0bbAiXm8l38UGRptqo7bZadRc2n15uVRk3Q385aGzVQrEamDXyNwW12NS987gNxkE53KLGXH00FpKWgMbt');


// const handlers = async ()=>{
//   const prices = await stripe.prices.list({
//     expand: ["data.product"],
//   });
//   console.log(prices)

// }

// handlers()


const handler = async function (req, res) {

  // Stripe doesn't give you a list of products with prices,
  // so we'll get all prices with their products. This means
  // products might appear in the results multiple times if
  // they have multiple prices.
  //
  // See Stripe docs: https://stripe.com/docs/api/prices/list
  const prices = await stripe.prices.list({
    expand: ["data.product"],
  });

  // Let's transform the prices with products
  //        to a list of products with prices
  products = [];
  prices.data.map((price) => {

    // Separate product object from price object
    product = price.product;
    delete price.product;

    // Is the product active?
    if (product.active) {
      
      // Can we find the product in the array already?
      if ((existingProduct = products.find(
          (p) => p.id === product.id
        ))) {

        // YES - add the new price to the existing item
        existingProduct.prices.push(price);

      } else {
        // NO - create new object and add to array
        products.push({ ...product, prices: [price] });

      }
    }
  });

  return res.status(200).json({
    msg:"todo va bien",
    body:products
  })
//   {
//     statusCode: 200,
//     body: JSON.stringify(products),
//   };
};

module.exports={
    handler
}