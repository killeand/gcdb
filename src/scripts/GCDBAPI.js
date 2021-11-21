import _ from 'lodash';

const GCDBAPI = {
    Path: {
        Setup: "/data/v1/setup",
        Users: {
            Read: "/data/v1/users/read",
            Auth: "/data/v1/users/auth",
            Check: "/data/v1/users/check",
            Logout: "/data/v1/users/logout"
        }
    },
    Execute: (path, headers, method, body) => {
        if (_.isNil(path)) {
            console.error("NodeAPI.Call - Path Missing");
            return;
        }

        if (!_.isNil(headers)) {
            if (!_.has(headers, "content-type")) {
                _.assign(headers, { "content-type": "application/json" });
            }
        }
        else {
            headers = { "content-type": "application/json" };
        }

        if (_.isNil(method)) {
            console.error("NodeAPI.Call - Method Missing");
            return;
        }

        if (!_.isNil(body))
            if (typeof(body) != "string")
                body = JSON.stringify(body);

        let options = { "headers": headers, "method": method };
        if (method != "GET")
            _.assign(options, { "body": body });

        return fetch(path, options);
    },
    Post: (path, headers, body) => {
        return GCDBAPI.Execute(path, headers, "POST", body);
    },
    Get: (path, headers) => {
        return GCDBAPI.Execute(path, headers, "GET");
    }
}

export default GCDBAPI;