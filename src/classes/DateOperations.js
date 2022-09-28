class DateOperations {
    static #goBack(dateMs, ms) {
        const delta = new Date(dateMs - ms);
        return delta.toISOString();
    }

    static goMinutesBackFromNow(nMinutes) {
        const milliseconds = nMinutes * 60 * 1000;
        return DateOperations.#goBack(Date.now(), milliseconds);
    }

    static goHoursBackFromNow(nHours) {
        const milliseconds = nHours * 60 * 60 * 1000;
        return DateOperations.#goBack(Date.now(), milliseconds);
    }

    static goDaysBackFromNow(nDays) {
        const milliseconds = nDays * 24 * 60 * 60 * 1000;
        return DateOperations.#goBack(Date.now(), milliseconds);
    }
    
    static goMonthsBackFromNow(nMonths) {
        const milliseconds = nMonths * 30 * 24 * 60 * 60 * 1000;
        return DateOperations.#goBack(Date.now(), milliseconds);
    }

    static goYearsBackFromNow(nYears) {
        const milliseconds = nYears * 365 * 24 * 60 * 60 * 1000;
        return DateOperations.#goBack(Date.now(), milliseconds);
    }

    static async sleep(ms) {
        await new Promise(r => setTimeout(r, ms));
    }
}

module.exports = DateOperations