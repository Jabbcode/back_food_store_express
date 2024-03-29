CREATE DATABASE IF NOT EXISTS STORAGE_SYSTEM;

USE STORAGE_SYSTEM;

CREATE TABLE CATEGORIES (
    ID_CATEGORY INT NOT NULL PRIMARY KEY,  
    NAME VARCHAR(30) NOT NULL
);

CREATE TABLE UNITS (
	 ID_UNIT INT NOT NULL PRIMARY KEY,
    NAME VARCHAR(30) NOT NULL,
    DESCRIPTION VARCHAR(100) NOT NULL
);

CREATE TABLE PRODUCTS (
    ID_PRODUCT INT AUTO_INCREMENT NOT NULL PRIMARY KEY,  
    NAME VARCHAR(30) NOT NULL,
    PRICE DECIMAL(3,2) NOT NULL,
    DATE TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ID_CATEGORY INT,
    ID_UNIT INT,
    CONSTRAINT FK_PRODUCTS_CATEGORIES FOREIGN KEY (ID_CATEGORY) REFERENCES CATEGORIES(ID_CATEGORY),
    CONSTRAINT FK_PRODUCTS_UNITS FOREIGN KEY (ID_UNIT) REFERENCES UNITS(ID_UNIT)
);

CREATE TABLE STORAGE (
    ID_STORAGE INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    QUANTITY INT NOT NULL,
    ISAVAILABLE BOOLEAN NOT NULL,
    ID_PRODUCT INT,
    CONSTRAINT FK_STORAGE_PRODUCTS FOREIGN KEY (ID_PRODUCT) REFERENCES PRODUCTS(ID_PRODUCT)
);
