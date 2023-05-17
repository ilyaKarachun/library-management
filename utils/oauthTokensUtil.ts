import { Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { redisClient } from '../db/redis';

const accessTokenExpiration = 900;
const refreshTokenExpiration = 21600;

//Generates a new pair of tokens
function generateTokens(): {accessToken: string, refreshToken: string} {
    const accessToken = uuidv4();
    const refreshToken = uuidv4();
    return { accessToken, refreshToken };
}

//Store tokens pair in redis db
async function storeTokens(tokens: {accessToken: string, refreshToken: string}, userId: string): Promise<any>{
    try {
        await redisClient.set(
            tokens.accessToken,
            JSON.stringify({ tokenType: "access", userId: userId }),
            { EX: accessTokenExpiration }
          );
        await redisClient.expire(tokens.accessToken, accessTokenExpiration);

        await redisClient.set(
            tokens.refreshToken,
            JSON.stringify({tokenType: "refresh", userId: userId}),
            { EX: refreshTokenExpiration }
        );
        await redisClient.expire(tokens.refreshToken, refreshTokenExpiration);

    } catch (error) {
        console.error(`Error storing tokens in Redis: ${error}`);
        throw error;
    }
}

//SetCookies with access and refresh tokens.
function setTokenCookies(res: Response, tokens: {accessToken: string, refreshToken: string}): Response{
    res.setHeader('Set-Cookie', [
        `accessToken=${tokens.accessToken}; HttpOnly; Max-Age=${accessTokenExpiration}; SameSite=lax;`,
        `refreshToken=${tokens.refreshToken}; HttpOnly; Max-Age=${refreshTokenExpiration}; SameSite=lax;`
    ]);

    return res;
}

//SetCookies with access and refresh tokens.
function deleteTokenCookies(res: Response): Response{
    res.setHeader('Set-Cookie', [
        `accessToken=""; HttpOnly; Max-Age=0; SameSite=lax;`,
        `refreshToken=""; HttpOnly; Max-Age=0; SameSite=lax;`
    ]);

    return res;
}

//Validate a token. If valid, returns tokenData. Else returns null
async function validateToken(token: string | undefined): Promise<any> {
    try {
        let data = (token) ? await redisClient.get(token as any) : null;
        if (data) {
            data = JSON.parse(data);
        }
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function refreshTokens(refreshToken: string, userId: string): Promise<any>{
    try{
        await deleteToken(refreshToken);
        const tokens = generateTokens();
        await storeTokens(tokens, userId);

        return tokens;
    } catch (err) {
        console.error(`Error refreshing tokens: ${err}`);
        throw err;
    }
}

//Delete a token from redis storage
async function deleteToken(token?: string): Promise<void>{
    try {
        if(token){
            await redisClient.del(token);
        }
    } catch (err) {
        console.error(`Error deleting token in Redis: ${err}`);
        throw err;
    }
}

export {
    generateTokens,
    storeTokens,
    setTokenCookies,
    deleteTokenCookies,
    validateToken,
    refreshTokens,
    deleteToken
};