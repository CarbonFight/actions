const { resetDailyStats } = require('./methods/reset-daily-stats');
const { addPeriodicActions } = require('./methods/add-periodic-actions');

const args = process.argv.slice(2);

async function runCron() {
    if (args.includes('day') || args.includes('all')) {
        await resetDailyStats();
        await addPeriodicActions();
    }
}

runCron();
