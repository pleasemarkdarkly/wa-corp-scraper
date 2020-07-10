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
      .option("pageId", {
        describe:
          "The page number",
        type: "number",
        default: 1,
      })
      .option("count", {
        describe:
          "The number on each page.",
        type: "number",
        default: 100,
      })
      .option("keywords", {
        describe:
          "The keywords json to search ",
        type: "string"
      }),
    async argv => await keywordsSearch(argv.c, argv.count, argv.pageId, argv.keywords,)
  )

  .command({
    command: "$0",
    describe: "--help for help, <command> --help for command-specific help",
    handler: () => yargs.showHelp()
  })
  .help().argv;