DROP DATABASE IF EXISTS risingTidedb;
CREATE DATABASE risingTidedb;

CREATE TABLE moviesList;
(
	id int NOT NULL AUTO_INCREMENT,
	author varchar(255) NOT NULL,
	quote TEXT NOT NULL,
	PRIMARY KEY (id)
);