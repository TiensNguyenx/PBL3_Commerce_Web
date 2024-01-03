const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const privateKeyPath = path.resolve(__dirname, '..', 'config', 'private.pem');


const generalAccessToken = async (payload) => {
    try {
        const private_key = fs.readFileSync(privateKeyPath);
        const access_token = jwt.sign({
            payload
        }, private_key, {
            expiresIn: '30d',
            algorithm: 'RS256'
        });
        return access_token;
    } catch (error) {
        console.error('Error reading private key:', error);
        throw error;
    }
}

const generalAccessTokenForEmail = async (payload) => {
    const access_token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, {
        expiresIn: '1m'
    });
    return access_token;
}

// const generalRefreshToken = async (payload) => {

//     const refresh_token = jwt.sign({
//         ...payload
//     }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })
//     return refresh_token;
// }

// const refreshTokenJwtService =  (token) => {
//     return new Promise( (resolve, reject) => {
//         try{
//             console.log('token', token)
//             jwt.verify(token,process.env.REFRESH_TOKEN, async(err, user) =>{
//                 if(err){
//                     resolve({
//                         status: 'error',
//                         message: 'Unauthorized'
//                     })
//                 }
//                 const access_token = await generalAccessToken({
//                     id: user?.id,
//                     isAdmin: user?.isAdmin
//                 })

//                 console.log('access_token', access_token)

//                 resolve({
//                     status: 'success',
//                     message: 'Refresh token successfully',
//                     access_token
//                 })
//             })
            
//         }catch(error){
//             reject(error) 
//         }
//     })


// }


module.exports = {
    generalAccessToken,
    generalAccessTokenForEmail
    //generalRefreshToken,
    //refreshTokenJwtService
}