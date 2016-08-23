'use strict';

const TIME_EXPIRED = 600;

module.exports = {
    check: function (timestamp, now) {
        if (! now) {
            now = new Date().getDate();
        }

        if (now - timestamp > TIME_EXPIRED) {
            return false;
        }

        return true;
    }
}
