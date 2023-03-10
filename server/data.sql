CREATE DATABASE todoapp;

CREATE TABLE todos (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    completed BOOLEAN,
    notes VARCHAR(255),
    list_id VARCHAR(255),
    date VARCHAR(300)
);

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255),
    user_name VARCHAR(255)
);

CREATE TABlE lists (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255),
    user_email VARCHAR(255),
    date VARCHAR(300)
);


