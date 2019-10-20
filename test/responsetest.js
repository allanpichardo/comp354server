const assert = require('assert');
const Response = require('../src/api/response');

describe('Response class', ()=> {

    let mockObject = {
        id: 22,
        you: "get",
        the: "point"
    };

    it('should create a json string from a JSON payload', () => {

        let payload = [ mockObject ];

        let expected = '{"is_success":true,"message":"This is a response","contents":[{"id":22,"you":"get","the":"point"}],"pages":1}';

        let r = Response.makeResponse(true, "This is a response", payload);
        assert.strictEqual(r, expected);
    });

    it('should create a json string from an empty payload', () => {

        let expected = '{"is_success":false,"message":"This is a response","contents":[],"pages":1}';

        let r = Response.makeResponse(false, "This is a response");
        assert.strictEqual(r, expected);

        r = Response.makeResponse(false, "This is a response", null);
        assert.strictEqual(r, expected);

        r = Response.makeResponse(false, "This is a response", []);
        assert.strictEqual(r, expected);
    });

    it('should automatically wrap a single object in an array', () => {

        let expected = '{"is_success":true,"message":"This is a response","contents":[{"id":22,"you":"get","the":"point"}],"pages":1}';

        let r = Response.makeResponse(true, "This is a response", mockObject);
        assert.strictEqual(r, expected);
    });
});