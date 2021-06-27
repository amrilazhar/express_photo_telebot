require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});
const { Telegraf } = require("telegraf");

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

bot.on("text", (ctx) => {
	console.log("pesan masuk");
    console.log(ctx)
	ctx.replyWithHTML("<b>Hello im from server</b>");
});

// npm install -g localtunnel && lt --port 3000
bot.launch({
	webhook: {
		domain: "https://angry-sloth-12.loca.lt",
		port: 4000,
	},
});
