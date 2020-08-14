# Things to do

## FEATURES

1. Add isSeeded information to parents for when the genes make up a seeded flower
2. Add a navbar at the top to control which screen someone is on (breeding flowers, seeded flower section, search section)
3. Build a component to allow the user to search for certain flowers from the db
4. Maybe make a section that gets all seeded flowers from the db and their genes?
   1. Possibly a sort functionality of some kind? Like by color, flower etc

## BUGS

1. Make storage persistent for db (- sql-persistence:/var/lib/mysql ???)
2. Figure out how to prevent econnreset
3. Add loading thingy while db is not available to prevent accidental no results when fetching from db
