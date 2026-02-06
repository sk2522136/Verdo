import jwt from 'jsonwebtoken';

export const authSeller = async(req , res,next) =>{
        

   

    try {
             const {sellerToken} = req.cookies;
             if(!sellerToken) {
             return res.json({success:false , message : 'Not Authorized'});
    }


        const tokenDecode = jwt.verify(sellerToken , process.env.JWT_SECRET)
        if(tokenDecode.email === process.env.SELLER_EMAIL){
            next()
        }else{
            res.json({success : false , message :'Not Authrized'})
        }
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false , message : error.message})
        
    }
}

export default authSeller;