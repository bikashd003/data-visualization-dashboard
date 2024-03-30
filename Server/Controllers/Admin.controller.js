import Admin from "../Models/Admin.models.js";
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';


const client = new OAuth2Client(process.env.CLIENT_ID);

export const Register = async (req, res) => {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.CLIENT_ID,
    });
  
    // Get the user information from the verified ticket
    const payload = ticket.getPayload();
    const user = await Admin.findOne({ email: payload.email });
  
    if (user) {
      res.json({ message: 'User already exists' ,success:false});
    } else {
      const newUser = new Admin({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub, 
      });
      await newUser.save();
  
      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      res.json({ user: newUser, token ,success:true,status:200});
    }
  };