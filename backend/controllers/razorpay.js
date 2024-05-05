import Razorpay from 'razorpay'
import crypto from 'crypto'


const razorpay = () => {
    return {
        async order(req, res) {
            try {
                const razorpay = new Razorpay({
                    key_id: process.env.RAZORPAY_KEY,
                    key_secret: process.env.RAZORPAY_SECRET,
                });

                const options = req.body;
                const order = await razorpay.orders.create(options);

                if (!order) {
                    return res.status(500).send("Error");
                }

                res.json(order);
            } catch (err) {
                console.log(err);
                res.status(500).send("Error");
            }
        },
        
        async validate(req, res) {

            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

            const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
            sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
            const digest = sha.digest("hex");
            if (digest !== razorpay_signature) {
                return res.status(400).json({ msg: "Transaction is not legit!" });
            }

            res.json({
                msg: "success",
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
            });
        }
    }
}

export default razorpay
