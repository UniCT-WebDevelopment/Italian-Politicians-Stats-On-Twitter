DROP DATABASE IF EXISTS `italian_politics`;
CREATE DATABASE `italian_politics`;
USE `italian_politics`;

CREATE TABLE IF NOT EXISTS `coalitions` (
    `name` VARCHAR(32) NOT NULL,
    `logo_color` VARCHAR(32) NOT NULL,
    PRIMARY KEY (`name`)
);

CREATE TABLE IF NOT EXISTS `accounts` (
    `handle` VARCHAR(255) NOT NULL,
    `political_coalition` VARCHAR(32) NOT NULL,
    PRIMARY KEY (`handle`),
    FOREIGN KEY (`political_coalition`) REFERENCES coalitions(`name`) ON DELETE CASCADE
);