import Admin from "../Models/Admin.models.js";
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const client = new OAuth2Client(process.env.CLIENT_ID);

const Register = async (req, res) => {
  const { credential, name, email, password } = req.body;

  try {
    // Check if the request contains a Google OAuth credential
    if (credential) {
      // Google OAuth signup
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.CLIENT_ID,
      });

      // Get the user information from the verified ticket
      const payload = ticket.getPayload();
      const googleId = payload.sub;

      // Check if the user already exists based on email or googleId
      const existingUser = await Admin.findOne({ $or: [{ email: payload.email }, { googleId }] });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists', success: false });
      }

      // Create a new user with Google OAuth data
      const newUser = new Admin({
        name: payload.name,
        email: payload.email,
        googleId,
      });

      await newUser.save();

      const token = jwt.sign({email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.status(200).json({ user: newUser, token, success: true });
    } else {
      // Custom signup
      // Check if the user already exists based on email
      const existingUser = await Admin.findOne({ email });

      if (existingUser.googleId) {
        return res.status(400).json({ message: 'User already exists please login via google', success: false });
      }
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists', success: false });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with custom signup data
      const newUser = new Admin({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      const token = jwt.sign({email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.status(201).json({ user: newUser, token, success: true });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};
const Login = async (req, res) => {
  const { credential, email, password } = req.body;

  try {
    // Check if the request contains a Google OAuth credential
    if (credential) {
      // Google OAuth login
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.CLIENT_ID,
      });

      // Get the user information from the verified ticket
      const payload = ticket.getPayload();
      const googleId = payload.sub;

      // Check if the user exists based on googleId
      const user = await Admin.findOne({ googleId });

      if (!user) {
        return res.status(404).json({ message: 'User not found', success: false });
      }

      const token = jwt.sign({email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.status(200).json({ user, token, success: true });
    } else {
      // Custom login
      // Check if the user exists based on email
      const user = await Admin.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found', success: false });
      }

      // Check if the user has a Google ID, meaning they signed up via Google OAuth
      if (user.googleId) {
        return res.status(400).json({ message: 'Please log in via Google', success: false });
      }

      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password', success: false });
      }

      const token = jwt.sign({email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.status(200).json({ user, token, success: true });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', success: false });
  }
}

export { Register, Login };