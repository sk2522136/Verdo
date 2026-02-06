import Product from '../models/Product.js'
import Order from '../models/Order.js'
import stripe from 'stripe'
import User from '../models/User.js'


// place Order COD : /api/order/cod
export const placeOrderCOD = async (req , res)=>{
    try {
        const userId= req.user.id;
        const { items, address} = req.body;
        if(!address || items.length ===0){
            return res.json({success: false, message:"Invalid data"})
        }
        
        // calculate amount using items
        
           let amount = 0;

            for (const item of items) {
            const product = await Product.findById(item.product);
            amount += product.offerPrice * item.quantity;
            }

        // add Tax Charge (2%)
        amount = amount + (amount * 0.02);

        const order = await Order.create({
        userId,
        items,
        address,
        amount,
        paymentType: "COD",
        isPaid: false,
        });

        return res.json({
        success: true,
        message: "Order placed successfully",
        order,
        });

        
        } catch (error) {
            console.log(error);
            return res.json({success: false, message:"Internal Server Error"})
        }
    }

//Place Order Stripe : /api/order/stripe
export const placeOrderStripe = async (req , res) =>{
    try {
         const userId= req.user.id;
        const { items , address }= req.body;
        const {origin} =  req.headers;
        if(!address || items.length === 0){
            res.json({success:false , message:"Invalid data"})
        }

        let amount = 0;
        let productData = [];

        // calculate Amount Using items
        for (const item of items) {
        const product = await Product.findById(item.product);

        // Stripe ke liye product data
        productData.push({
            name: product.name,
            price: product.offerPrice,
            quantity: item.quantity
        });

        // subtotal calculate
        amount += product.offerPrice * item.quantity;
        }

 
        // add Tax charge (2%)
        amount += Math.floor(amount * 0.02);
        
        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",

        })

        //Stripe Gateway Initialization 
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        //create line items for stripe
        const line_items = productData.map((item)=>{
            return{
                price_data:{
                    currency: 'usd',
                    product_data:{
                        name:item.name,
                    },
                    unit_amount:Math.floor(item.price + item.price * 100) ,
                },
                quantity: item.quantity,
            }
        })

        // create Stripe session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode:'payment',
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata:{ 
                orderId: order._id.toString(),
                userId,
            }
        })


         return res.json({success:true , url:session.url})

    } catch (error) {
        return res.json({success:false , message:error.message})
    }
    }

    //Stripe webhook to verify Payment Action : /stripe 
    export const stripeWebhook = async (req ,  res) =>{
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        const sig = req.headers['stripe-signature'];
        let event;

        try {
            event = stripeInstance.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );
            
        } catch (error) {
            res.status(400).send(`webhook error : ${error.message}`)
        }

        switch(event.type){
            case "payment_intent.succeeded":{
                const paymentintent = event.data.object;
                const paymentIntentId = paymentintent.id;

                // Getting session Metadata
                const session = await stripeInstance.checkout.sessions.list({
                    payment_intent : paymentIntentId
                });

                const {orderId ,userId} =  session.data[0].metadata;
                //Mark payment as Paid
                await Order.findByIdAndUpdate(orderId , {isPaid:true});

                // clear user Cart
                await User.findByIdAndUpdate(userId , {cartItems:{}})
                break;
            }
            case "payment_intent.payment_failed":{

                const paymentintent = event.data.object;
                const paymentIntentId = paymentintent.id;

                // Getting session Metadata
                const session = await stripeInstance.checkout.sessions.list({
                    payment_intent : paymentIntentId
                });

                const {orderId } =  session.data[0].metadata;
                
                await Order.findByIdAndDelete(orderId );

            }

            default:
                console.log(`Unhandled event type ${event.type}`)
               break;
        }
        res.json({received:true})
        

    }



// Get Orders By User Id : /api/order/user
export const getUserOrders = async (req, res) =>{
  try {
   const userId = req.user.id; 
    const orders = await Order.find({
        userId,
        $or:[{paymentType: 'COD'} , {isPaid:true}]
    }).populate('items.product address').sort({createdAt: -1});
    return res.json({success:true , orders})
  } catch (error) {
    res.json({success:false , message:error.message})
    
  }
}


// Get All Orders (for Seller/admin) : /api/order/seller
export const getAllOrders = async (req,res) =>{
    try {
        const orders = await Order.find({
        $or:[{paymentType: 'COD'} , {isPaid:true}]
    }).populate('items.product address').sort({createdAt: -1});
    return res.json({success:true , orders})
    } catch (error) {
        res.json({success:false , message:error.message})
    }
}