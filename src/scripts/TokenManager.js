import _ from 'lodash';

const TokenManager = {
    GetAuth: () => {
        let Token = localStorage.getItem("access_token");

        if (!_.isNil(Token))
            return Token;
        
        return null;
    },
    GetRefresh: () => {
        let Token = localStorage.getItem("refresh_token");

        if (!_.isNil(Token))
            return Token;
        
        return null;
    },
    DecodeAuth: () => {
        let Token = localStorage.getItem("access_token");

        if (!_.isNil(Token)) {
            let TokenPieces = Token.split(".");
            let RetVal = null;

            try {
                RetVal = JSON.parse(TokenManager.Convert(TokenPieces[1]));
            }
            catch (error) {
                console.error("Could not convert token", error);
            }

            return RetVal;
        }
        
        return null;
    },
    DecodeRefresh: () => {
        let Token = localStorage.getItem("refresh_token");

        if (!_.isNil(Token)) {
            let TokenPieces = Token.split(".");
            let RetVal = null;
            
            try {
                RetVal = JSON.parse(TokenManager.Convert(TokenPieces[1]));
            }
            catch (error) {
                console.error("Could not convert token", error)
            }

            return RetVal;
        }
        
        return null;
    },
    Convert: (base64url) => {
        let value = base64url.replace('-', '+').replace('_', '/');
        let pad = value.length % 4;

        if (pad)
            if (pad !== 1)
                value += new Array(5-pad).join("=");
            
        return atob(value);
    }
}

export default TokenManager;