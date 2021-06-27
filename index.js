require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

const { Telegraf } = require("telegraf");
const myHandler = require("./helpers/requestHandler");

const token = process.env.BOT_TOKEN;
if (token === undefined) {
	throw new Error("BOT_TOKEN must be provided!");
}

const bot = new Telegraf(token);
// Set the bot response
bot.start((ctx) => {
	console.log("pesan start");
	ctx.replyWithHTML("<b>Hello it's started</b>");
});

bot.on("text", async (ctx) => {
	try {

		let link = await myHandler.processRequest(ctx.message.text);
		if (link.length == 0) {
			ctx.replyWithHTML("<b> Sorry  your request cannot be process </b>");
		} else {
			link.forEach((el) => {
				ctx.reply(el);
			});
		}
	} catch (error) {
		console.log(error);
	}
});

// npm install -g localtunnel && lt --port 3000
bot.launch({
	webhook: {
		domain: process.env.DOMAIN,
		port: process.env.PORT,
	},
});
