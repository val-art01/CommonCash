import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "./../models/Users.js"

export const loginUser = async (req, res)=>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: 'Email ou mot de passe incorrect'})
        }

        // Verification du mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({message: 'Email ou mot de passe incorrect'})
        }

        // Génération du token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SEC, { expiresIn: '24h' });        
        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ response: 'Internal server error: ' + error.message });
    }
}