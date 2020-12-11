-- create the databases
CREATE DATABASE IF NOT EXISTS userSystem;

-- create the users for each database
CREATE USER 'user'@'%' IDENTIFIED BY '123456';
GRANT CREATE, ALTER, INDEX, LOCK TABLES, REFERENCES, UPDATE, DELETE, DROP, SELECT, INSERT ON `userSystem`.* TO 'user'@'%';

FLUSH PRIVILEGES;