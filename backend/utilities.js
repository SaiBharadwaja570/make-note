import jwt from 'jsonwebtoken'

function authentication(req, res, next){
    const authHeader = req.headers("authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.status(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if (err) return res.senStatus(401);
        req.user = user;
        next();
    })
}

export default authentication 