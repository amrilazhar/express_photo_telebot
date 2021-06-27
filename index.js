require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

const { Telegraf } = require("telegraf");
const myHandler = require("./helpers/requestHandler");
const express = require('express');

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
				ctx.replyWithPhoto(el);
			});
		}
	} catch (error) {
		console.log(error);
	}
});

bot.telegram.setWebhook(process.env.DOMAIN);

const app = express();
app.get('/', (req, res) => res.send('Hello World!'))
// Set the bot API endpoint
app.use(bot.webhookCallback('/'))
app.listen(process.env.PORT, () => {
  console.log('Example app listening on port '+process.env.PORT)
})
