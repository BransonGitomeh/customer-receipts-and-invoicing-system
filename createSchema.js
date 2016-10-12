// this code creates the schema thats supposed to power the application

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

	// an array of the commands to create the tables that create the schema 
	// this is usefull for very easy on click deployments in new environments
	var schemaQueries = [
		`CREATE KEYSPACE if not exists company
			WITH durable_writes = true
			AND replication = {
				'class' : 'NetworkTopologyStrategy',
				'datacenter1' : 1
			};`,

		`CREATE TABLE if not exists company.clients (
			id timeuuid,
			company text,
			contact text,
			name text,
			PRIMARY KEY (id)
		)`,

		`CREATE TABLE if not exists company.client_payments (
			id timeuuid,
			ammount decimal,
			client timeuuid,
			PRIMARY KEY (id)
		)`,

		`CREATE TABLE if not exists company.products_in_invoices (
			id timeuuid,
			invoice timeuuid,
			product timeuuid,
			PRIMARY KEY (id)
		)`,

		`CREATE TABLE if not exists company.invoices_for_client (
			id timeuuid,
			client timeuuid,
			PRIMARY KEY (id)
		)`,

		`CREATE TABLE if not exists company.products (
			id timeuuid,
			name text,
			price text,
			PRIMARY KEY (id)
		)`

	]

	// create the keyspace first
	client.execute(schemaQueries[0], (err, results) => {
		// remove the keyspace command from the array
		schemaQueries.splice(schemaQueries[0], 1)
			// run the commands all at once 
		async.filter(schemaQueries, (command, nextCB) => {
			client.execute(command, (err, results) => {
				assert.ifError(err)
					// log the status of the schema creation
				const position = (schemaQueries.indexOf(command) + 1)
				if (!err) console.log(`completed, ${position} / ${schemaQueries.length}`)
				setTimeout(nextCB, 1000)
			})
		}, function(err) {
			console.log("completed creating the tables")
			//close connection and shut down the node process
			client.shutdown()
			process.exit()
		})
	})


})