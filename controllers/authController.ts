import argon2 from 'argon2';
import { Request, Response } from "express";
import { UserRepository } from '../repositories/userRepository';
import { parseCookies } from '../utils/cookieParserUtil';
import { generateTokens, storeTokens, setTokenCookies, deleteTokenCookies, deleteToken } from '../utils/oauthTokensUtil';


export class AuthController{
    private userRepository: UserRepository;

    constructor(){
        this.userRepository = new UserRepository();
    }

    public async login(req: Request, res: Response) {
        const {email, password} = req.body;
    
        if (!email || !password) {
            return res.status(422).json({ error: 'Unprocessable Entity - need to provide email and password' });
        }
    
        try {
            const user = await this.userRepository.login(email);

            if(!user){
                return res.status(404).json({ error: "User not found" });
            }

            const isVerified = await argon2.verify(user.passwordHash, password);
    
            if(isVerified){
                //generate tokens
                const tokens = generateTokens();
        
                //store tokens in Redis
                storeTokens(tokens, user.idUser);
        
                //set cookies with tokens in response header
                res = setTokenCookies(res, tokens);
        
                //login succesful
                res.status(200).json({ message: "Ok - logged in" });
            } else {
                //credentials didn't match
                res.status(401).json({ error: "Unauthorized - credentials didn't match" });
            }
        } catch(err) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
    
    public async logout(req: Request, res: Response){
        try {
            if(req.headers.cookie){
                const { accessToken, refreshToken } = parseCookies(req.headers.cookie);
    
                await deleteToken(accessToken);
                await deleteToken(refreshToken);

                res = deleteTokenCookies(res);
            }
    
            res.status(200).json({ message: "Ok - logged out" });
        } catch (err) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}