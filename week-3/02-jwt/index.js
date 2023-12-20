const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const z=require('zod');

const emailSchema = z.string().email();

/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */
function signJwt(username, password) {
    const isemail=emailSchema.safeParse(username)
    if(!isemail.success){
        return null
    }
    
    if(password.length<6){
        return null
    }

    return jwt.sign({username},jwtPassword);
}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
    if(jwt.verify(token,jwtPassword,(err,decoded)=>{
        if(err){
            return false;
        }
        return true;
    })){
        return true
    }
    return false
}

/**
 * Check if a JWT can be docoded to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {boolean} true if the jwt can be DECODED (not verified). Return false otherwise
 */
function decodeJwt(token) {
    const decoded=jwt.decode(token)
    if(decoded){
        return true
    }
    return false
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
