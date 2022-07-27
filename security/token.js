const jwt = require("jsonwebtoken");

const tokencreator =(email)=>{
    const token = jwt.sign(
        {email},
        process.env.tokenkey,
        { expiresIn : "3h"}
    );
    return token;
}

const tokenchecker =(token)=>{
    
    const check = jwt.verify(token,process.env.tokenkey);
    return check;   
}

module.exports.tokencreator = tokencreator;
module.exports.tokenchecker = tokenchecker;