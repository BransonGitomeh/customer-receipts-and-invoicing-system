#Tables and feilds

1. clients
...* id timeuuid
...* name text
...* company text
...* contact text

2. products
...* id timeuuid
...* name text
...* price decimal

3. invoices_for_client
...* id timeuuid
...* client timeuuid

4. products_in_invoices
...* id timeuuid
...* invoice timeuuid
...* product timeuuid

5. client_payments
...* id timeuuid
...* ammount decimal

