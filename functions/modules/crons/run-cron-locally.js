const { resetDailyStats } = require('./methods/resetDailyStats');

const args = process.argv.slice(2);

if (args.includes('day') || args.includes('all')) {
    console.info('Periodic task "resetDailyStats" has been emulated.');
    resetDailyStats();
}
