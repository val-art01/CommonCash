export const logout = async (req, res) => {
    const user = req.user;
    try {
        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non authentifié' });
        }

        user.authTokens = user.authTokens.filter((authToken) =>{
            return authToken.authToken !== req.authToken;
        });

        req.session.destroy();
        await user.save();
        res.status(200).json({ message: 'Déconnexion réussie' });
    } catch (error) {
        res.status(500).json({ response: 'Internal server error: ' + error.message });
    }    
};

export const logoutAll = async (req, res) => {
    const user = req.user;
    try {
        user.authTokens = [];
        req.session.destroy();
        await user.save()
        res.status(200).json({ message: 'Déconnexion réussie' });
    } catch (error) {
        res.status(500).json({ response: 'Internal server error: ' + error.message });
    }    
};