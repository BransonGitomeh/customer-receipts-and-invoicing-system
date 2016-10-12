// this code creates the schema thats supposed to power the application

const async = require("async")
const assert = require("assert")
const cassandra = require('cassandra-driver');

// to help generate uuid values
var id = cassandra.types.Uuid; //new uuid v4 .random()
var timeId = cassandra.types.TimeUuid //new instance based on current date timeId.now


// openshift or localhost
const contact = process.env.OPENSHIFT_CASSANDRA_DB_HOST + ":" + process.env.OPENSHIFT_CASSANDRA_NATIVE_TRANSPORT_PORT

var connectionOptions = {
	contactPoints: [(process.env.OPENSHIFT_CASSANDRA_DB_HOST ? contactPoint2 : "localhost")],
	keyspace: 'system'
};


var client = new cassandra.Client(connectionOptions);

const keyspace = "company"

// connect the client to the db
client.connect((err) => {
	assert.ifError(err)

	var customer = timeId.now()
	var product = timeId.now()
	var invoice = timeId.now()
	var payment = timeId.now()

	// an array of the commands to create the tables that create the schema 
	// this is usefull for very easy on click deployments in new environments
	var testDataQueries = [{
		query: "insert into company.clients (id, company, contact, name) values (?, ?, ?, ?)",
		params: [customer, "sabek tech", "0711657108", "Branson Gitomeh"]
	}, {
		query: "insert into company.client_payments (id,client, ammount ) values (?, ?, ?)",
		params: [timeId.now(), customer, 200]
	},{
		query: "insert into company.invoices_for_client (id,client ) values (?, ?)",
		params: [timeId.now(), customer]
	}, {
		query: "insert into company.products (id,name, price) values (?, ?, ?)",
		params: [product, "web development", "400"]
	}, {
		query: "insert into company.products_in_invoices (id, invoice, product ) values (?, ?, ?)",
		params: [timeId.now(), invoice, product]
	}]

	// run the queries all in batch and they akll have to succeed or fail #transactions
	client.batch(testDataQueries,{ prepare: true }, (err, results) => {
		assert.ifError(err)
		if (!err) console.log("the data was updated to the cluster successfully")
			// disconnect the client and close the node process
		client.shutdown()
		process.exit()
	})
})