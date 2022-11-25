import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import bcrypt from 'bcrypt'

interface ResponseData {
    error?: string;
    msg?: string;
}

 dbConnect();

const validateEmail = (email: string): boolean => {
    const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regEx.test(email);
  };

  const validateFormData =async( email: string, password: string) => {
    if (!validateEmail(email)) {
        return { error: "Email is invalid" };
      }
    
      
      const emailUser = await User.findOne({ email: email });
    
      if (emailUser) {
        return { error: "Email already exists" };
      }
    
      if (password.length < 5) {
        return { error: "Password must have 5 or more characters" };
      }
    
      return null;
  }


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
  ) {
//Validate if its a POST 
if(req.method !== "POST" ) {
    return res.status(405).json({error: ' HTTP Method not allowed '}) 
}
console.log('Are we hitting the register route ndepapi apa')

const { name, password, email, surname} = req.body;
 
const errorMessage = await validateFormData(email, password)
if (errorMessage) {
    return res.status(400).json(errorMessage as ResponseData);
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 12);


    // create new User on MongoDB
    const newUser = new User({
        name, surname,
        email,
        hashedPassword,
      });
    
      await newUser
        .save()
        .then(() =>
          res.status(200).json({ msg: "Successfuly created new User: " + newUser })
        )
        .catch((err: string) =>
          res.status(400).json({ error: "Error on '/api/register': " + err })
        );
console.log(newUser);


  }
  