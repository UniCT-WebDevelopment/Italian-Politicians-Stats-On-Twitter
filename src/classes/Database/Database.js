class Database {
    _host;
    _port;
    _user;
    _password;
    _db;

    _connection;
    _isConnected;

    constructor() {
        if (this.constructor === Database)
            throw new TypeError('Cannot construct an abstract instance directly.');
    }

    _connect() {
        throw new Error('Method must be implemented.');
    }

    _disconnect() {
        throw new Error('Method must be implemented.');
    }

    insertRow(table, fields, values) {
        throw new Error('Method must be implemented.');
    }

    updateRow(table, values, condition) {
        throw new Error('Method must be implemented.');
    }

    deleteRow(table, condition) {
        throw new Error('Method must be implemented.');
    }

    getRows(table, fields, condition, orderBy) {
        throw new Error('Method must be implemented.');
    }
}

module.exports = Database