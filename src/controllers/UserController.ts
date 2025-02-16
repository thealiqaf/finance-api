import { Request, Response } from "express";
import User from '../models/User';
import bcrypt from 'bcryptjs';
import  Jwt  from "jsonwebtoken";

export const register = async (req:Request, res:Response) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPasseord = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPasseord });
        await user.save();

        res.status(201).json({
            message: 'User created successfully'
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
      }
};

export const login = async (req:Request, res:Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    const validpassword = await bcrypt.compare(password, user.password);
        if (!validpassword) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '3h'});

        res.status(200).json(token);
  }  catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};