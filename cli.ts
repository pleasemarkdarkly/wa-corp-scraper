#!/usr/bin/env node
import yargs from 'yargs'
import main from './index'
import testMain from './testMain'

yargs
  .command(
    "fetchAll",
    "fetch all business with keywords",
    yargs =>
      yargs.option("concurrency", {
        describe:
          "The number of concurrent fetch at a time.",
        type: "number"
      }),
    async argv => await main(argv.concurrency)
  )

  yargs
  .command(
    "fetchTest",
    "fetch 200 businesses with keywords",
    yargs =>
      yargs
      .option("concurrency", {
        describe:
          "The number of concurrent fetch at a time.",
        type: "number"
      }),
    async argv => await testMain(argv.concurrency)
  )

  .command({
    command: "$0",
    describe: "--help for help, <command> --help for command-specific help",
    handler: () => yargs.showHelp()
  })
  .help().argv;