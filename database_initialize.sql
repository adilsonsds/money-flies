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

    CREATE TABLE act.accounts (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
    );

    CREATE TABLE act.activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        date TIMESTAMP NOT NULL
    );

    CREATE TABLE act.transactions (
        id SERIAL PRIMARY KEY,
        amount DECIMAL(10, 2) NOT NULL,
        paid BOOLEAN NOT NULL,
        date TIMESTAMP NOT NULL,
        description VARCHAR(100) NOT NULL,
        activity_id INT NULL,
        category_id INT NOT NULL,
        account_id_from INT NOT NULL,
        account_id_to INT NOT NULL,
        FOREIGN KEY (activity_id) REFERENCES act.activities(id),
        FOREIGN KEY (category_id) REFERENCES act.categories(id),
        FOREIGN KEY (account_id_from) REFERENCES act.accounts(id),
        FOREIGN KEY (account_id_to) REFERENCES act.accounts(id)
    );
