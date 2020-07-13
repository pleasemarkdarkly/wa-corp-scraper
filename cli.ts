#!/usr/bin/env node
import yargs from 'yargs'
import main from './index'
import testMain from './testMain'
import keywordsSearch from './keywordsFetch'

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
    "fetchAll",
    "fetch business by certain keywords",
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
    "company_keyword_scraper",
    "fetch 200 businesses with keywords",
    yargs =>
      yargs
      .option("c", {
        describe:
          "The number of concurrent fetch at a time.",
        type: "number",
        default: 1,
      })
      .option("id", {
        describe:
          "The page number",
        type: "number",
        default: 1,
      })
      .option("count", {
        describe:
          "The number of business on each page.",
        type: "number",
        default: 1,
      })
      .option("keyword", {
        describe:
          "The output directory ",
        type: "string"
      }),
    async argv => await keywordsSearch(argv.c, argv.id, argv.count, argv.keyword)
  )

  .command({
    command: "$0",
    describe: "--help for help, <command> --help for command-specific help",
    handler: () => yargs.showHelp()
  })
  .help().argv;