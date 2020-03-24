'use strict';
class OpenEducationTagger {
  constructor() {
    this.id = 'id_1';
  }
  syncSpreadsheetJsonToIndex(spreadsheetJson) {

    console.log('convertSpreadsheetJson');
    console.log('this.id', this.id);
    // 2DO: check if feed.entry is set
    // important: set ,thisValue
    spreadsheetJson.feed.entry.forEach(function(item, index) {
      // 2DO: add debug option to just parse 1 item?
      if (index == 0) {

        console.log('converting item', item, index);

        let sanitizedObject = {};

        // 2DO: use config values for that later
        // 2DO: convert URL

        // access via bracket notation
        // example for json:
        /* "gsx$titel":{
                "$t":"Test-Titel"
             },*/
        sanitizedObject.title = item['gsx$titel']['$t'];
        console.log('sanitized object', sanitizedObject);

        this.sendObjectToIndex(sanitizedObject);

      } // 2DO: remove, only for testing

    }, this); // !important -> this binding!
  }
  sendObjectToIndex(objectToSend) {

    // 2DO: good style to do it here this way?
    const https = window.https;
    // safer parsing
    const tryjson = window.tryjson;

    console.log('sendObjectToIndex', objectToSend);

    // SxXGi7v3m:cc24f410-91dc-4bd5-8b84-1b19fe0dc567
    let userAndPass = 'SxXGi7v3m:cc24f410-91dc-4bd5-8b84-1b19fe0dc567';
    let authString = "Basic " + btoa(userAndPass); // base64 encoding
    console.log('authString', authString);

    // 2DO: index or update (Get it first by URL, see PHP code)

    const data = JSON.stringify(objectToSend);
    // see at bottom, will be send via req.write(data)

    const options = {
      host: 'scalr.api.appbase.io',
      path: '/openeducationtagger-playground/_doc', // 2DO: index or update
      method: 'POST',
      headers: {
        // 'User-Agent': 'request',
        'Authorization': authString,
        "Content-Type": "application/json",
         'Content-Length': data.length
      }
    };

    // post it
    const req = https.request(options, function(res) {
      var jsonResponse = '';

      console.log('send POST to index', res);

      res.on('data', function(chunk) {
        //console.log('data',chunk);
        jsonResponse += chunk;
      });

      res.on('end', function() {
        // 201 = created
        if (res.statusCode === 200 || res.statusCode === 201) {
          console.log('Status:', res.statusCode);
          console.log('res', res);
          var data = tryjson.parse(jsonResponse);
          console.log('data parsed', data ? data : 'Error parsing JSON!');

          // tryjson will return undefined on parsing error
          if (data !== undefined) {
            // new id will be _id: "kX9qDHEBtWjoDWKpNl2U",
            console.log('got data successful', data);
          }
        } else {
          console.log('Status:', res.statusCode);
        }
      });
    }).on('error', function(err) {
      console.log('Error:', err);
    }); // eo https get

    // 2DO: is this needed?
    req.on('error', (e) => {
      console.error(e);
    });

    req.write(data)
    req.end();

  }
  set name(name) {
    this._name = name.charAt(0).toUpperCase() + name.slice(1);
  }
  get name() {
    return this._name;
  }
  sayHello() {
    console.log('Hello, my name is ' + this.name + ', I have ID: ' + this.id);
  }
}
