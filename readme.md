simple node js app built with

1. cassandra db - database
2. express.js - server
3. express-handlebars - for html templating ease
4. async.js - for async flow control
5. admin lte - the admin template for the ui


Aim is to build a small system that will be able to store a customers list , a list of products we offer and we should be able to assign a "buy" to store the list of things the user has bought and store that for him. then write an invoice for him and incase of a payment, tag the invoice number with a receipt and then keep record of the monet the client owes the company and if he has cleared.

Every record uses a timeuuid as the unique identifier to collect the time events of what happens when and where.

