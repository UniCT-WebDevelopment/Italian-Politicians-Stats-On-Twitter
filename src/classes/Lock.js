const DateOperations = require('./DateOperations');

require('dotenv').config();

class Lock {
    static #lock = false;

    static async wait() {
        while (Lock.#lock)
            await DateOperations.sleep(process.env.WAIT_TIME);
    }

    static lock() {
        Lock.#lock = true;
    }

    static unlock() {
        Lock.#lock = false;
    }
}

module.exports = Lock;