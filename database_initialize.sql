CREATE DATABASE mf
    WITH
    OWNER = root
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE SCHEMA act
    AUTHORIZATION root;

    CREATE TABLE act.categories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
    );

    CREATE TABLE act.payers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
    );

    CREATE TABLE act.activities (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        date TIMESTAMP NOT NULL
    );

    CREATE TABLE act.transactions (
        id SERIAL PRIMARY KEY,
        amount DECIMAL(10, 2) NOT NULL,
        paid BOOLEAN NOT NULL,
        date TIMESTAMP NOT NULL,
        description VARCHAR(100) NOT NULL,
        activity_id INT NOT NULL,
        category_id INT NOT NULL,
        payer_id INT NOT NULL,
        FOREIGN KEY (activity_id) REFERENCES act.activities(id),
        FOREIGN KEY (category_id) REFERENCES act.categories(id),
        FOREIGN KEY (payer_id) REFERENCES act.payer(id)
    );
