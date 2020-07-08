#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const yargs = require('yargs');
const main = require('./index');
const testMain = require('./testMain');
yargs
    .command("fetchAll", "fetch all business with keywords", (yargs) => yargs.option("concurrency", {
    describe: "The number of concurrent fetch at a time.",
    type: "number"
}), (argv) => __awaiter(this, void 0, void 0, function* () { return yield main(argv.concurrency); }));
yargs
    .command("fetchTest", "fetch 200 businesses with keywords", (yargs) => yargs
    .option("concurrency", {
    describe: "The number of concurrent fetch at a time.",
    type: "number"
}), 
// .option("pageCount", {
//   describe:
//     "The number of concurrent fetch at a time.",
//   type: "number"
// }),
(argv) => __awaiter(this, void 0, void 0, function* () { return yield testMain(argv.concurrency); }))
    .command({
    command: "$0",
    describe: "--help for help, <command> --help for command-specific help",
    handler: () => yargs.showHelp()
})
    .help().argv;
//# sourceMappingURL=cli.js.map