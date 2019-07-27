# COIN ROCKET 🚀 
### worlds fastest cryptocurrency portfolio tracker

no features, no download, fast loadtimes. [SEE ALL COINS](https://www.coinrocketapp.com)

<img src="https://user-images.githubusercontent.com/44790691/60259784-52249d80-98d8-11e9-963a-313142b01c57.PNG" width="250">

The app is in the making. Its a cryptocurrency portfolio tracker designed for mobile usage that does not require you to download an app or to create an accout, simply track your crypto portfolio by submitting your holdings on the landing page, which will then generate a link for you where you can directly see your portfolio! No download, no registration, fast loadtimes!
- landing page is still in the making. Current state here: http://coinrocketapp.com/landing.html
- crypto portfolio tracker is working, but the holdings have to be entered in the URL as params! So for example, if you want to track `3 BTC` and `15 ETH`, just append `?BTC=3&ETH=15` to the following base URL: `http://CoinRocketApp.com/`. 
- [example 1:](http://CoinRocketApp.com/?BTC=1&ETH=12&XMR=20&MIOTA=1000) `http://CoinRocketApp.com/?BTC=1&ETH=12&XMR=20&MIOTA=1000`
- [example 2:](http://CoinRocketApp.com/?BTC=1&HOT=1000000&NANO=1000&NEO=50) `http://CoinRocketApp.com/?BTC=1&HOT=1000000&NANO=1000&NEO=50`
- [example 3 (list all coins)](http://CoinRocketApp.com/): `http://CoinRocketApp.com/`

by dcts / v0.0

### ToDo List / Bugs (in development)
- [x] Total Portfolio Value is not working (hardcoded)
- [x] refactor card creatiion code
- [ ] landing page where user can input his holdings and gets redirected to his portfolio link
- [ ] Coin Rocket Logo design
- [ ] improve coin cards (add 24h/7d % changes)
- [ ] responsiveness: designs for tablets and desktop usage
- [ ] support for different currencies (€ and $)
- [ ] refactor app as react app
- [ ] create firebase database with conjobs (each 5 mins update crypto prices and keep track of price history to be able to display a chart of the last 7 days)
- [ ] expandable cards (show price chart with option to select between 1d, 7d, 1m, 3m) -> link to coinmarketcap
- [ ] sortableJS -> make cards sortable and adapt url (if such a functionality is possible) -> indicate to user that link has changes
- [ ] store user settings tied to link in a database maybe? That way the view becomes customizable without being forced to create an account and log in. Linktoken = "fake authentication"! 
- [ ] (dark mode)
- [ ] write an own deterministic URL shortener to avoid url's that are extremely long. Store them as key-value pairs in the database! Interesting [YOUTUBE TUTORIAL by Traversy Media](https://youtu.be/Z57566JBaZQ).

### Contribute

if you want to contribute in any way, feel free write me (thomas.starzynski@unibas.ch), I'd love to work on this more intensively! CoinRocket needs to be ready for the next crypto bullrun when the market gets flooded with new shitcoins.
