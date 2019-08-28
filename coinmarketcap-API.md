# coinmarketcap-API.md

```bash
curl -H "X-CMC_PRO_API_KEY: 85dbca27-40b6-4d2c-8bd1-85bb728e19ae" -H "Accept: application/json" -d "start=1&limit=5000&convert=USD" -G https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest
```


```js
fetch('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5000&convert=USD&CMC_PRO_API_KEY=85dbca27-40b6-4d2c-8bd1-85bb728e19ae')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });

fetch('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, cors, *same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
      'Content-Type': 'application/json',
      'CMC_PRO_API_KEY': '85dbca27-40b6-4d2c-8bd1-85bb728e19ae',
      'Accept': 'application/json',
      'Accept-Encoding': 'deflate, gzip'
      'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: 'follow', // manual, *follow, error
  referrer: 'no-referrer', // no-referrer, *client
  // body: JSON.stringify(data), // body data type must match "Content-Type" header
}).then(function(response) {
  return response.json();
}).then(function(myJson) {
  console.log(JSON.stringify(myJson));
});
```
