drop table instructors if exists;
drop table locations if exists;


CREATE TABLE locations(
    id serial primary key, 
    name text
);
CREATE TABLE instructors(
    id serial primary key, 
    name text,
    location_id integer FOREIGN KEY
)

INSERT INTO locations(name) VALUES('new work'), ('new jersey'), ('china')
