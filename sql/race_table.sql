DROP DATABASE if EXISTS letour_db;
CREATE DATABASE letour_db;
USE letour_db;
CREATE TABLE race (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(30) NOT NULL,
  year INT,
  PRIMARY KEY (id)
);

INSERT INTO race (name, year)
VALUES ("Tour de France", 2018);

SELECT * FROM race;

