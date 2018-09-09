const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=> {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;
    if (token) {
        jwt.verify(token,req.app.get('api_secret_key'),(err,dataDecoded)=> {
            if (err) {
                res.json({
                    status: false,
                    message: 'Token Hata'
                })
            }else {
                req.decode = dataDecoded;
                next();
            }
        })
    }else {
        res.json({
            status: false,
            message: 'No Token provided'
        });
    }
}