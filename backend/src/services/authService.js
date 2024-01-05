import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateTokenAndSave = async (user) => {
    const authToken = jwt.sign(
        { id: user._id }, 
        process.env.JWT_SEC, 
        { expiresIn: '3h' }
    );
    user.authTokens.push({authToken});
    await user.save();
    return authToken;
};
  
const verifyPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

const logout = async (req, user) => {
    try {
        req.session.destroy();
        await user.save
        res.status(200).json({ message: 'Déconnexion réussie' });
    } catch (error) {
        res.status(500).json({ response: 'Internal server error: ' + error.message });
    }    
};

export {generateTokenAndSave, verifyPassword, logout}