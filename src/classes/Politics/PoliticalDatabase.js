const MySql = require('../Database/MySql');

require('dotenv').config();

class PoliticalDatabase {
    static #db = new MySql(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME);

    static async getAccounts() {
        return await PoliticalDatabase.#db.getRows('accounts', '*', 'TRUE', 'political_coalition, handle');
    }

    static async getCoalitions() {
        return await PoliticalDatabase.#db.getRows('coalitions', '*', 'TRUE', 'name');
    }

    static async getCoalitionsRelatedAccounts(name) {
        return await PoliticalDatabase.#db.getRows(
            'coalitions c JOIN accounts a ON c.name = a.political_coalition',
            'handle, political_coalition',
            `name = '${name}'`,
            'political_coalition, handle'
        );
    }

    static async insertAccount(handle, coalition) {
        if (handle === '' || coalition === '') return null;
        return await PoliticalDatabase.#db.insertRow('accounts', 'handle, political_coalition', `'${handle}', '${coalition}'`);
    }

    static async insertCoalition(name, color) {
        if (name === '' || color === '') return null;
        return await PoliticalDatabase.#db.insertRow('coalitions', 'name, logo_color', `'${name}', '${color}'`);
    }

    static async updateAccount(handle, coalition) {
        if (handle === '' || coalition === '') return null;
        return await PoliticalDatabase.#db.updateRow('accounts', `political_coalition = '${coalition}'`, `handle = '${handle}'`);
    }

    static async updateCoalition(name, color) {
        if (name === '' || color === '') return null;
        return await PoliticalDatabase.#db.updateRow('coalitions', `logo_color = '${color}'`, `name = '${name}'`);
    }

    static async deleteAccount(handle) {
        if (handle === '') return null;
        return await PoliticalDatabase.#db.deleteRow('accounts', `handle = '${handle}'`);
    }

    static async deleteCoalition(name) {
        if (name === '') return null;
        return await PoliticalDatabase.#db.deleteRow('coalitions', `name = '${name}'`);
    }
}

module.exports = PoliticalDatabase;