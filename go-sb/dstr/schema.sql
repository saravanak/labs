DROP TABLE  IF EXISTS  painting CASCADE; 
DROP TABLE  IF EXISTS  paint_matrix CASCADE; 
DROP TABLE  IF EXISTS  paint_templates CASCADE; 
create table painting (id SERIAL PRIMARY KEY, name text, UNIQUE (name)) ;
create table paint_matrix (
        id SERIAL PRIMARY KEY,
        paint_id integer references painting(id) , 
        x integer, 
        y integer, 
        color integer, 
        created_at date, 
        unique(paint_id, x, y));

create table paint_templates (
        id SERIAL PRIMARY KEY,
        paint_id integer references painting(id) NOT NULL, 
        x integer, 
        y integer, 
        color integer,
        unique(paint_id, x, y)
        );        