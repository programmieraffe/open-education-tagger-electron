'use strict';

// this approach is needed because nodeIntegration = false
// selected node APIs are exposed here (e.g. https), but not all
// https://github.com/electron/electron/issues/8227

document.onreadystatechange = function() {
  if (document.readyState == "complete") {
    // 2DO: load via npm?
    // const $ = require('jquery');
    // Do things with $

    // loaded via index.html
    $(function() {
      console.log('hello jquery world');

      // 2DO: is this secure?
      window.https = require('https');
      window.tryjson = require('tryjson');

      const Store = require('electron-store');
      const configStore = new Store();

      const myOpenEducationTagger = new OpenEducationTagger();

      const configFormFields = [
        'oet_spreadsheet_id',
        'oet_spreadsheet_sheet_id',
        'oet_elasticsearch_hostname',
        'oet_elasticsearch_index',
        'oet_elasticsearch_auth_string_write'
      ];

      configFormFields.forEach(function(formFieldName) {
        // 2DO: load values
        console.log('check if value is in store', formFieldName, " = ", configStore.get(formFieldName));

        const valueInStore = configStore.get(formFieldName);

        // if value is already stored, apply it to form field
        if (valueInStore !== undefined) {
          $("input[name=" + formFieldName + "]").val(valueInStore);
        }

        // initiate jquery event
        $("input[name=" + formFieldName + "]").bind('change', function() {
          //$("input[name=" + formFieldName + "]").bind('input propertychange', function() {
          console.log('event - form field value was changed', this);
          console.log('save new value to config store', this.value);
          configStore.set(formFieldName, this.value);
        });

      }, this); // 2DO: is bind needed?



      $("#oetSyncSpreadsheet").on('click', function(e) {
        e.preventDefault();

        console.log('Try to sync spreadsheet...');
        // 2DO: start worker

        // 2DO: this is no good style I suppose ;-)
        console.log('Update config first, apply config to class ... ');

        // lazy way, just submit whole store values as object
        myOpenEducationTagger.setConfig(configStore.store);
        myOpenEducationTagger.syncSpreadsheetToIndex();
      }); // eo click

      // button actions
      $("#oetClearStore").on('click', function(e) {
        // 2DO: reload form/window?
        $("input").val('').trigger('change');
      });


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


    }); // eo jQuery

  } // eo readyState == complete
} // eo onReadstayte
