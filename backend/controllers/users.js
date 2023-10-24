import { error } from "console";
import { User } from "../models/signupModel.js"
import bcrypt from "bcrypt";
const saltRounds = 10;
export const AddUser = async (req, res) => {
    try {
        const { name, phone, email, age, gender, adhar, pan, address, pincode, password } = req.body;
        const newUser = new User({
            name: name,
            phone: phone,
            email: email,
            age: age,
            gender: gender,
            adhar: adhar,
            pan: pan,
            address: address,
            pincode: pincode,
            password: bcrypt.hashSync(password, saltRounds)
        })
        newUser.save().catch(err => console.log(err));
        console.log(newUser);
    } catch (error) {
        res.staus(500).send("internal sever err" + error);
    }
    res.send("user added ");
}
export const getUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const foundUser = await User.findOne({ email: email }).exec();

        if(foundUser){
            if(bcrypt.compareSync(password, foundUser.password)===true) {
                console.log("correct password")
    
            }else {
                console.log("wrong password");
            }
        }else{
            res.send("user not found");
        }
        console.log(foundUser);
    }catch (error) {
        res.status(500).send("internal sever err" + error);
    }
    res.send("user found ");
}






// {
//     "name":"A",
//     "phone":"1234",
//     "email":"a@b.com",
//     "age":"12",
//     "gender":"Male",
//     "adhar":"23",
//     "pan":"342",
//     "address":"34",
//     "pincode":"3",
//     "password":"123"
// }