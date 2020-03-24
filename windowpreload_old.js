


window.https = require('https');
window.tryjson = require('tryjson');

// 2DO: how to access app inside?
// console.log('apppath', app.getAppPath());
// console.log('user data', app.getPath('userData'));

window.onload = function() {
  var script = document.createElement("script");
  script.src = "https://code.jquery.com/jquery-2.1.4.min.js";
  script.onload = script.onreadystatechange = function() {
    $(document).ready(function() {
      console.log('hello jquery world');


        const crypto = require('crypto')

        const Store = require('electron-store');

        const configStore = new Store();

        /*store.set('unicorn', '🦄');
        console.log(store.get('unicorn'));
        //=> '🦄'

        // Use dot-notation to access nested properties
        store.set('foo.bar', true);
        console.log(store.get('foo'));
        //=> {bar: true}

        store.delete('unicorn');
        console.log(store.get('unicorn'));
        //=> undefined*/

        const configFormFields = [
          'oet_spreadsheet_id',
          'oet_spreadsheet_sheet_id',
          'oet_elasticsearch_index',
          'oet_elasticsearch_auth_string_write'];

        configFormFields.forEach(function(formFieldName){
          // 2DO: load values
          console.log('check if value is in store', formFieldName, " = ", configStore.get(formFieldName));

          const valueInStore = configStore.get(formFieldName);

          // if value is already stored, apply it to form field
          if(valueInStore !== undefined){
            $("input[name="+formFieldName+"]").val(valueInStore);
          }

          // initiatie jquery event
          $("input[name="+formFieldName+"]").bind('input propertychange', function() {
            console.log('event - form field value was changed',this);
            console.log('save new value to config store',this.value);
            configStore.set(formFieldName,this.value);
          });

        }, this); // 2DO: is bind needed?


        $("#oetClearCache").click(function(){
          configStore.clear();
        },this);




        $('#text-input').bind('input propertychange', function() {
          const text = this.value

          configStore.set('apikey', text)
          console.log('configStore.get("apikey")', configStore.get('apikey'));

          const md5 = crypto.createHash('md5').update(text, 'utf8').digest('hex')
          $('#md5-output').text(md5)

          const sha1 = crypto.createHash('sha1').update(text, 'utf8').digest('hex')
          $('#sha1-output').text(sha1)

          const sha256 = crypto.createHash('sha256').update(text, 'utf8').digest('hex')
          $('#sha256-output').text(sha256)

          const sha512 = crypto.createHash('sha512').update(text, 'utf8').digest('hex')
          $('#sha512-output').text(sha512)
        })

      //  $('#text-input').focus() // focus input box

        $("#syncSpreadsheet").on('click', function(e) {
          e.preventDefault();

          console.log('Try to sync spreadsheet...');
          // 2DO: start worker


          // https://spreadsheets.google.com/feeds/list/1kntJWO9iP6rL6WFqKXNsINoa923LjoDfEz38_NA4-ao/od6/public/values?alt=json

          // https://www.electronjs.org/docs/api/client-request
          /*const stream = require('stream')
          const {net} = require('electron').remote

          const request = net.request({
            method: 'GET',
            protocol: 'https:',
            hostname: 'spreadsheets.google.com',
            port: 443,
            path: '/feeds/list/1kntJWO9iP6rL6WFqKXNsINoa923LjoDfEz38_NA4-ao/od6/public/values?alt=json'
          });

          request.on('response', (response) => {
            console.log(`STATUS electron request: ${response.statusCode}`);
            response.on('error', (error) => {
              console.log(`ERROR: ${JSON.stringify(error)}`)
            })
          })
          request.on('login', (authInfo, callback) => {
            callback()
          })*/

          // https://stackoverflow.com/questions/11826384/calling-a-json-api-with-node-js
          let https = require('https');
          // safer parsing
          let tryjson = require('tryjson');

          // our class

          let myOpenEducationTagger = new OpenEducationTagger();

          var options = {
            host: 'spreadsheets.google.com',
            path: '/feeds/list/1kntJWO9iP6rL6WFqKXNsINoa923LjoDfEz38_NA4-ao/od6/public/values?alt=json',
            headers: {
              'User-Agent': 'request'
            }
          };

          https.get(options, function(res) {
            var json = '';

            res.on('data', function(chunk) {
              //console.log('data',chunk);
              json += chunk;
            });

            res.on('end', function() {
              if (res.statusCode === 200) {
                console.log('Status:', res.statusCode);
                console.log('res', res);
                var data = tryjson.parse(json);
                console.log(data ? data : 'Error parsing JSON!');

                // tryjson will return undefined on parsing error
                if(data !== undefined){
                  myOpenEducationTagger.syncSpreadsheetJsonToIndex(data);
                }
              } else {
                console.log('Status:', res.statusCode);
              }
            });
          }).on('error', function(err) {
            console.log('Error:', err);
          }); // eo https get

          // 2DO: convert JSON
          // 2DO: put in class



          // 2DO: push it toe elasticsearch

        }); // eo click

    }); // doc ready
  };
  document.body.appendChild(script);
};
