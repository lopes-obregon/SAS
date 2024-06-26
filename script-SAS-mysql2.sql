-- MySQL Script generated by MySQL Workbench
-- Sun Apr 14 10:55:21 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`paciente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`paciente` (
  `cpf` INT NOT NULL,
  `nome` VARCHAR(250) NULL,
  `data_de_nascimento` VARCHAR(45) NULL,
  `cadastro_sus` VARCHAR(250) NULL,
  `endereco` VARCHAR(250) NULL,
  `unidade_de_saude` VARCHAR(250) NULL,
  PRIMARY KEY (`cpf`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`usuario` (
  `idusuario` INT NOT NULL,
  `login` VARCHAR(250) NULL,
  `senha` VARCHAR(250) NULL,
  `permissoes` VARCHAR(45) NULL,
  `paciente_cpf` INT NOT NULL,
  PRIMARY KEY (`idusuario`),
  INDEX `fk_usuario_paciente_idx` (`paciente_cpf` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_paciente`
    FOREIGN KEY (`paciente_cpf`)
    REFERENCES `mydb`.`paciente` (`cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
