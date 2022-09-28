const mysql = require('mysql');
const Database = require('./Database');

class MySql extends Database {

    constructor(host, port, user, password, dbname) {
        super();

        this._host = host;
        this._port = port;
        this._user = user;
        this._password = password;
        this._db = dbname;

        this._connection = null;
        this._isConnected = false;
    }

    async _connect() {
        if (this._isConnected)
            return;

        this._connection = mysql.createConnection({
            host: this._host,
            port: this._port,
            user: this._user,
            password: this._password,
            database: this._db
        });

        await new Promise((resolve, reject) => {
            this._connection.connect((error) => {
                if (!error) resolve(true);
                else reject(false);
            });
        })
        .then(res => this._isConnected = res)
        .catch(err => this._isConnected = false);
    }

    async _disconnect() {
        if (!this._isConnected)
            return;

        await this._connection.end();
        this._isConnected = false;
    }

    async _executeQuery(sql, operation = '') {
        await this._connect();
        if (this._isConnected !== true) return null;

        return await new Promise((resolve, reject) => {
            this._connection.query(sql, (error, res) => {
                if (error) reject('Error');
                else resolve(JSON.stringify(res));
            });
        })
        .then(async res => {
            await this._disconnect();
            if (operation === 'select') return JSON.parse(res);
            return JSON.parse(res).affectedRows > 0;
        })
        .catch(async err => {
            await this._disconnect();
            return null;
        });
    }

    async insertRow(table, fields, values) {
        const sql = `INSERT INTO ${table} (${fields}) VALUES (${values})`;
        return await this._executeQuery(sql);
    }

    async deleteRow(table, condition) {
        const sql = `DELETE FROM ${table} WHERE ${condition}`;
        return await this._executeQuery(sql);
    }

    async updateRow(table, values, condition) {
        const sql = `UPDATE ${table} SET ${values} WHERE ${condition}`;
        return await this._executeQuery(sql);
    }

    async getRows(table, fields = '*', condition = 'TRUE', orderBy = null) {
        let sql = `SELECT ${fields} FROM ${table} WHERE ${condition}`;
        if (orderBy) sql += ` ORDER BY ${orderBy}`;
        return await this._executeQuery(sql, 'select');
    }
}

module.exports = MySql