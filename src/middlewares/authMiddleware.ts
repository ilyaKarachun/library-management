import { Request, Response, NextFunction } from "express";
import { parseCookies } from '../utils/cookieParserUtil';
import { setTokenCookies, validateToken, refreshTokens } from '../utils/oauthTokensUtil';


async function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        if(req.headers.cookie){
            const { accessToken, refreshToken } = parseCookies(req.headers.cookie);
            const accessTokenData = await validateToken(accessToken, "access");

            if(accessTokenData){    //accessToken is valid
                const {userId} = accessTokenData;
                req.body.requestId = userId; //id of the user that is making the request
                return next();
            }

            //accessToken invalid - check refreshToken
            const refreshTokenData = await validateToken(refreshToken, "refresh");

            if(refreshTokenData){   //refreshToken is valid
                const {userId} = refreshTokenData;
                const newTokens = await refreshTokens(refreshToken, userId);
                req.body.requestId = userId;
                res = setTokenCookies(res, newTokens);
                return next();
            }
        }

        return res.status(401).json({ error: "Unauthorized - Need to log in" });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}


export { authenticate };