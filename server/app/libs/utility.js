exports.set_body = (req) => JSON.stringify(
    {
        req : _get_request(req)
    }
);

exports.set_options = (req) => {
    return {
        req : _get_request(req)
    };
};

const _get_request = (req) =>{
    return {
        method : req.method,
        params : req.params,
        query  : req.query,
        body   : req.body
    }
};