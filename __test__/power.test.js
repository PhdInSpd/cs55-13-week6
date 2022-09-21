const power = require("../lib/power")
test( 'power 2^8 to equal 256',
    () => {
        expect( power(2,8) ).toBe(256);
    });