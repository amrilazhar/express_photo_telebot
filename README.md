# Express Photo Telegram Bot
Simple photo explorer using telegram bot and express which harness the API of unsplash and flicker 

## __Usage__

To Install the API there is some requirement that we need to meet,

1. NodeJS Server
2. Flickr API Key (it can be access here [Flicker](https://www.flickr.com/services/api/), but need register first)
3. Unsplash API Key (it can be access here [Unsplash](https://unsplash.com/developers), but need register first)

To install the App just clone it, and run `npm install` inside the project folder, then we need to create file `.env.production` / `.env.development`  with format like this :

```
UNSPLASH_ACCESS_KEY = <key> 
UNSPLASH_SECRET_KEY = <key> 
BOT_TOKEN = <telegram bot token> 
DOMAIN = <https://....>
PORT = <port ex : 3001> 
FLICKR_API_KEY = <key> 
FLICKR_SECRET_KEY = <key>
```

in the development stage, you can use [localtunnel](https://www.npmjs.com/package/localtunnel) library for testing. Just install and run the localtunnel in port 3001 and copy the https domain that show up to env file.