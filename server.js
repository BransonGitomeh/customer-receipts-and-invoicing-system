const express = require("express")
const express_handlebars = require("express-handlebars")
const async = require("async")
const assert = require("assert")


console.log("let the games begin")

const async = require("async")
const assert = require("assert")
const cassandra = require('cassandra-driver');

// openshift or localhost
const contact = process.env.OPENSHIFT_CASSANDRA_DB_HOST + ":" + process.env.OPENSHIFT_CASSANDRA_NATIVE_TRANSPORT_PORT

var connectionOptions = {
	contactPoints: [(process.env.OPENSHIFT_CASSANDRA_DB_HOST ? contactPoint2 : "localhost")],
	keyspace: 'system'
};


var client = new cassandra.Client(connectionOptions);


// connect the client to the db
client.connect((err) => {
	assert.ifError(err)
	// creating the application code
	
})