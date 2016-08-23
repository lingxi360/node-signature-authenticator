'use strict';

const crypto = require('crypto');

module.exports = (str, secret) => {
    return crypto.createHmac('sha256', secret)
                 .update(str)
                 .digest('hex');
}
