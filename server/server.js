import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import connectDB from './configs/db.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhook } from './controllers/orderController.js';

const app = express();
const port = process.env.PORT || 4000;

// Database aur Cloudinary initialization function
const startBackend = async () => {
    try {
        await connectDB();
        connectCloudinary();
    } catch (err) {
        console.error("Initialization error:", err);
    }
};

startBackend();

const allowedOrigins = ['http://localhost:5173', 'https://your-vercel-frontend-url.vercel.app'];

app.post('/stripe', express.raw({ type: "application/json" }), stripeWebhook);

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get('/', (req, res) => { res.send("Api is Working") });
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// LOCAL TESTING KE LIYE: Sirf tab chalega jab Vercel par na ho
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

// VERCEL KE LIYE ZAROORI: Default export
export default app;