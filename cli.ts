#!/usr/bin/env node
import yargs from 'yargs'
import main from './index'
// import testMain from './testMain'
import keywordsSearch from './keywordsFetch'
import { businesTypeString } from './CorporationBasicRawStreams'


yargs
  .command(
    "company_info_scraper",
    "fetch all business with all single keywords",
    yargs =>
      yargs
      .option("concurency", {
        describe:
          "The number of concurrent fetch at a time.",
        type: "number"
      })
      .option("count", {
        describe:"The number of business to fetch",
        default: 'ALL',
      }) 
      .option("business_type", {
        describe:
          "The number of concurrent fetch at a time.",
          type: 'string'
      }),
    async argv => main(argv.concurency, argv.count, argv.business_type)
  )
  
  // yargs
  // .command(
  //   "company_info_scraper_test",
  //   "fetch some business with all single keywords",
  //   yargs =>
  //     yargs
  //     .option("c", {
  //       describe:
  //         "The number of concurrent fetch at a time.",
  //       type: "number"
  //     })
  //     .option("count", {
  //       describe:"The number of business to fetch",
  //       default: 100,
  //       type: "number"
  //     }),
  //   async argv => await testMain(argv.c, argv.count)
  // )
  yargs
  .command(
    "company_keyword_scraper",
    "fetch businesses with keywords",
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