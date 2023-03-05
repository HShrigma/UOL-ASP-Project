Create the database file:

Sqlite3 pets.sqlite3

Then, in the sqlite prompt, load the test data:

sqlite> .read export.sql
sqlite> .read morepets1.sql
sqlite> .read morepets2.sql

And quit sqlite

sqlite> .quit
