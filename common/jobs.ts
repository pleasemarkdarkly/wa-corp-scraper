const cron = require("node-cron");
const { run_all_business, run_200_business } = require("../index");

cron.schedule("* * * * *", () => {
  let right_now = Date.now();
  console.log("(" + right_now + ") running a task every minute");
  //   run_all_business()
  if (right_now % 2 == 0) {
    process.kill(process.pid, "SIGINT");
  }
});
