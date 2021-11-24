import _ from 'lodash';

const CONTENT_TYPE_REQUIRE = (contentType) => {
    return (req, res, next) => {
        if (_.isNil(contentType)) contentType = "application/json";

        if (req.headers['content-type'] != contentType) {
            res.status(400).contentType("application/json").send({"error": "Request must be supplied as a content type of application/json"});
            return;
        }
        
        next();
    }
}

export default CONTENT_TYPE_REQUIRE;