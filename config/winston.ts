import appRoot from "app-root-path";
// import winston from "winston";
import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf, prettyPrint } = format;



// define the custom settings for each transport (file, console)
const options = {
	file: {
		level: "info",
		filename: `${appRoot}/logs/app.log`,
		handleExceptions: true,
		json: true,
		// maxsize: 5242880, // 5MB
		// maxFiles: 5,
		colorize: false,
	},
	console: {
		level: "debug",
		handleExceptions: true,
		json: false,
		colorize: true,
	},
};


// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
	format: combine(
		// label({ label: "wa-corp-scrapper" }),
		timestamp(),
		prettyPrint()
	  ),
	transports: [
		new transports.File(options.file),
		new transports.Console(options.console),
	],
	exitOnError: false, // do not exit on handled exceptions
});



export default logger;
