const Lock = require('../Lock');
const PoliticalAccount = require('./PoliticalAccount');
const PoliticalCoalition = require('./PoliticalCoalition');
const PoliticalDatabase = require('./PoliticalDatabase');

class Manager {
    static #allowedAccounts = new Map();
    static #allowedCoalitions = new Map();

    static #accountsPool = new Map();
    static #coalitionsPool = new Map();


    static isAccountAllowed(handle) {
        return Manager.#allowedAccounts.has(handle);
    }

    static isCoalitionAllowed(name) {
        return Manager.#allowedCoalitions.has(name);
    }

    static getAccountByHandle(handle) {
        return Manager.#accountsPool.has(handle) ? Manager.#accountsPool.get(handle) : null;
    }

    static getCoalitionByName(name) {
        return Manager.#coalitionsPool.has(name) ? Manager.#coalitionsPool.get(name) : null;
    }

    static getAccounts() {
        return Array.from(Manager.#allowedAccounts, (item) => ({ handle: item[0], coalition: item[1] }));
    }

    static getCoalitions() {
        return Array.from(Manager.#allowedCoalitions, (item) => ({ name: item[0], logo_color: item[1] }));
    }


    static async getAccountsFromDatabase() {
        return await PoliticalDatabase.getAccounts();
    }

    static async getCoalitionsFromDatabase() {
        return await PoliticalDatabase.getCoalitions();
    }

    static async insertAccountIntoDatabase(handle, coalition) {
        return await PoliticalDatabase.insertAccount(handle, coalition);
    }

    static async insertCoalitionIntoDatabase(name, logo_color) {
        return await PoliticalDatabase.insertCoalition(name, logo_color);
    }

    static async updateAccountInDatabase(handle, coalition) {
        return await PoliticalDatabase.updateAccount(handle, coalition);
    }

    static async updateCoalitionInDatabase(name, logo_color) {
        return await PoliticalDatabase.updateCoalition(name, logo_color);
    }

    static async deleteAccountInDatabase(handle) {
        return await PoliticalDatabase.deleteAccount(handle);
    }

    static async deleteCoalitionInDatabase(name) {
        return await PoliticalDatabase.deleteCoalition(name);
    }


    static async loadData() {
        await Lock.wait();
        Lock.lock();

        const coalitions_data = await PoliticalDatabase.getCoalitions();

        for (let coalition_data of coalitions_data)
        {
            let related_accounts = [];
            const related_accounts_data = await PoliticalDatabase.getCoalitionsRelatedAccounts(coalition_data.name);

            for (const related_account of related_accounts_data) {
                let account = new PoliticalAccount(related_account.handle, related_account.political_coalition);
                await account.fetchData();

                Manager.#allowedAccounts.set(account.username, account.coalition);
                Manager.#accountsPool.set(account.username, account);

                related_accounts.push(account);
            }

            const coalition = new PoliticalCoalition(coalition_data.name, coalition_data.logo_color, related_accounts);
            Manager.#allowedCoalitions.set(coalition.name, coalition.color);
            Manager.#coalitionsPool.set(coalition.name, coalition);
        }

        Lock.unlock();
    }

    static async refreshData() {
        let tmpAllowedAccounts = new Map();
        let tmpAllowedCoalitions = new Map();

        let tmpAccountPool = new Map();
        let tmpCoalitionsPool = new Map();

        const coalitions_data = await PoliticalDatabase.getCoalitions();

        for (let coalition_data of coalitions_data)
        {
            let related_accounts = [];
            const related_accounts_data = await PoliticalDatabase.getCoalitionsRelatedAccounts(coalition_data.name);

            for (const related_account of related_accounts_data) {
                let account = new PoliticalAccount(related_account.handle, related_account.political_coalition);
                await account.fetchData();

                tmpAllowedAccounts.set(account.username, account.coalition);
                tmpAccountPool.set(account.username, account);

                related_accounts.push(account);
            }

            const coalition = new PoliticalCoalition(coalition_data.name, coalition_data.logo_color, related_accounts);
            tmpAllowedCoalitions.set(coalition.name, coalition.color);
            tmpCoalitionsPool.set(coalition.name, coalition);
        }
        
        Manager.#allowedAccounts = tmpAllowedAccounts;
        Manager.#allowedCoalitions = tmpAllowedCoalitions;
        Manager.#accountsPool = tmpAccountPool;
        Manager.#coalitionsPool = tmpCoalitionsPool;
    }
}

module.exports = Manager;