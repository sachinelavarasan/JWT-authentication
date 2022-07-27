const bcrypt = require("bcryptjs");
const saltlevel = 10 ;

const hashcreator = async (mypass)=>{
    const salt = await bcrypt.genSalt(saltlevel);
    const hash = await bcrypt.hash(mypass,salt);
    return hash;
}

const hashcheck = async (mypass,hashpass)=>{
    const result = await bcrypt.compare(mypass,hashpass);
   
    return result;
}


module.exports.hashcreator = hashcreator;
module.exports.hashcheck = hashcheck;
