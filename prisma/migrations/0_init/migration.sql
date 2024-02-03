-- CreateTable
CREATE TABLE `categories` (
    `ID_CATEGORY` INTEGER NOT NULL AUTO_INCREMENT,
    `NAME` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`ID_CATEGORY`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `ID_PRODUCT` INTEGER NOT NULL AUTO_INCREMENT,
    `NAME` VARCHAR(30) NOT NULL,
    `PRICE` FLOAT NOT NULL,
    `CREATION_DATE` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ID_UNIT` INTEGER NULL,

    INDEX `FK_501b79f4e7f1b9207c755b15ed6`(`ID_UNIT`),
    PRIMARY KEY (`ID_PRODUCT`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `storage` (
    `ID_STORAGE` INTEGER NOT NULL AUTO_INCREMENT,
    `QUANTITY` INTEGER NOT NULL,
    `ISAVAILABLE` TINYINT NOT NULL DEFAULT 0,
    `ID_PRODUCT` INTEGER NULL,

    INDEX `FK_7b13218813508c4d50550295c54`(`ID_PRODUCT`),
    PRIMARY KEY (`ID_STORAGE`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `units` (
    `ID_UNIT` INTEGER NOT NULL AUTO_INCREMENT,
    `NAME` VARCHAR(30) NOT NULL,
    `DESCRIPTION` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`ID_UNIT`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
