const express=require('express');

const cors = require('cors')
const app= express();

const port=process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())



app.use(cors())
// const stripe = require('stripe')('sk_test_51OmgPMCmZfq7z36s0bbAiXm8l38UGRptqo7bZadRc2n15uVRk3Q385aGzVQrEamDXyNwW12NS987gNxkE53KLGXH00FpKWgMbt');


// // const handlers = async ()=>{
// //   const prices = await stripe.prices.list({
// //     expand: ["data.product"],
// //   });
// //   console.log(prices)

// // }

// // handlers()


// const handler = async function (event, context) {

//   // Stripe doesn't give you a list of products with prices,
//   // so we'll get all prices with their products. This means
//   // products might appear in the results multiple times if
//   // they have multiple prices.
//   //
//   // See Stripe docs: https://stripe.com/docs/api/prices/list
//   const prices = await stripe.prices.list({
//     expand: ["data.product"],
//   });

//   // Let's transform the prices with products
//   //        to a list of products with prices
//   const products = [];
//   prices.data.map((price) => {

//     // Separate product object from price object
//     product = price.product;
//     delete price.product;

//     // Is the product active?
//     if (product.active) {
      
//       // Can we find the product in the array already?
//       if ((existingProduct = products.find(
//           (p) => p.id === product.id
//         ))) {

//         // YES - add the new price to the existing item
//         existingProduct.prices.push(price);

//       } else {
//         // NO - create new object and add to array
//         products.push({ ...product, prices: [price] });

//       }
//     }
//   });

//   return {
//     statusCode: 200,
//     body: JSON.stringify(products),
//   };
// };

// handler().then((res)=>{console.log(res)})


app.use('/api/v1',require('./routers/stripeRouter'))


app.listen(port,()=>{
    console.log(`Se establecio conexion con el servidor ${port}`)
})

