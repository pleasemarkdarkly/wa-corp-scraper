#!/usr/bin/env node

const yargs = require('yargs');
const main = require ('./index')
const testMain = require ('./testMain')
yargs
  .command(
    "fetchAll",
    "fetch all business with keywords",
    (    yargs: { option: (arg0: string, arg1: { describe: string; type: string; }) => any; }) =>
      yargs.option("concurrency", {
        describe:
          "The number of concurrent fetch at a time.",
        type: "number"
      }),
    async (argv: { concurrency: number; }) => await main(argv.concurrency)
  )

  yargs
  .command(
    "fetchTest",
    "fetch 200 businesses with keywords",
    (    yargs: { option: (arg0: string, arg1: { describe: string; type: string; }) => any; }) =>
      yargs
      .option("concurrency", {
        describe:
          "The number of concurrent fetch at a time.",
        type: "number"
      }),
      // .option("pageCount", {
      //   describe:
      //     "The number of concurrent fetch at a time.",
      //   type: "number"
      // }),
    async (argv: { concurrency: number; }) => await testMain(argv.concurrency)
  )

  .command({
    command: "$0",
    describe: "--help for help, <command> --help for command-specific help",
    handler: () => yargs.showHelp()
  })
  .help().argv;