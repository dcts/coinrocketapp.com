# SIMPL - fastest way to see if you're broke

no features, no download, fast loadtimes.

This repository is in the making. It cointains 3 parts
- SIMPL landing page: user lands on this page and inputs which currency he wants to track and how much he has of this currency. Landing page here: https://dcts.github.io/SIMPL/
- porftolio-generator: a static website that grabs data passed in the URL (after the `/index.html?`) and converts this URL suffix to an API call. Then the result is displayed on the screen. The URL must have the following syntax: `/index.html?COINNAME=QUANTITY;COINNAME=QUANTITY`. For example https://dcts.github.io/SIMPL/portfolio-generator/index.html?BTC=10;ETH=100;HOLO=1010
- api-call: a webpage that gets data from the free crpto api and displays all availible currencies: https://dcts.github.io/SIMPL/api/index.html

by dcts / v0.0
