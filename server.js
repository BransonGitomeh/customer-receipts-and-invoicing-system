const express = require("express")
const express_handlebars = require("express-handlebars")
const async = require("async")
const assert = require("assert")

const cassandra = require('cassandra-driver');

// openshift or localhost
const contact = process.env.OPENSHIFT_CASSANDRA_DB_HOST + ":" + process.env.OPENSHIFT_CASSANDRA_NATIVE_TRANSPORT_PORT

var connectionOptions = {
	contactPoints: [(process.env.OPENSHIFT_CASSANDRA_DB_HOST ? contact : "localhost")],
	keyspace: 'system'
};


var client = new cassandra.Client(connectionOptions);


// connect the client to the db
client.connect((err) => {
	assert.ifError(err)
	// creating the application code
	if(!err) bot.sendMessage("21649399", "conencted to cassandra on: " + connectionOptions.contactPoints).then(log)
})


function log(argument) {
	console.log(argument)
	bot.sendMessage("21649399", argument).then(function (argument) {
		// body...
	})
}


var TelegramBot = require('node-telegram-bot-api');

var token = '290896795:AAGjxqsPiaMiAcgqnGoKtMuEqP6I-y2kcR0';
// Setup polling way
var bot = new TelegramBot(token, {polling: true});

// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var resp = match[1];
  console.log(fromId)
  bot.sendMessage(fromId, resp);
});

var os = require("os")

const startMessage  = `server started on: \n` + os.hostname() + " \n" + os.type() + " \n" +  os.platform() + " "

bot.sendMessage("21649399", startMessage).then(log)