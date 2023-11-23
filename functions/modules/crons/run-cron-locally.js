const { updateStatsNewDay } = require("./methods/updateStatsNewDay");

const args = process.argv.slice(2);

if (args.includes('day') || args.includes('all')) {
    console.info('Periodic task "updateStatsNewDay" has been emulated.')
    updateStatsNewDay();
}
