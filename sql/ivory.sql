--* DEFINITION
--*     SETUP "" --> "1.1"
--*     UPGRADE "" --> "1.1.1"
--* /DEFINITION



--* SETUP "" --> "1.1"

--* SECTION "Creating SolidBase control tables"

CREATE TABLE DBVERSION
(
    SPEC VARCHAR(5),
    VERSION VARCHAR(20),
    TARGET VARCHAR(20),
    STATEMENTS DECIMAL(4) NOT NULL
);

CREATE TABLE DBVERSIONLOG
(
    TYPE VARCHAR(1) NOT NULL,
    SOURCE VARCHAR(20),
    TARGET VARCHAR(20) NOT NULL,
    STATEMENT DECIMAL(4) NOT NULL,
    STAMP TIMESTAMP NOT NULL,
    COMMAND VARCHAR(4000),
    RESULT VARCHAR(4000)
);

CREATE INDEX DBVERSIONLOG_INDEX1 ON DBVERSIONLOG ( TYPE, TARGET );

--* /SETUP



--* UPGRADE "" --> "1.1.1"

--* SECTION "Creating table USERS"
DROP TABLE IF EXISTS PATIENTS;
CREATE TABLE PATIENTS (
  ID int(10) unsigned NOT NULL AUTO_INCREMENT,
  FIRST_NAME VARCHAR(20) NOT NULL,
  LAST_NAME VARCHAR(20) DEFAULT NULL,
  EMAIL VARCHAR(64) DEFAULT NULL,
  DOB DATE DEFAULT '0000-00-00',
  ADDRESS VARCHAR(128) DEFAULT NULL,
  GENDER CHAR(1) DEFAULT NULL,
  PHONE        varchar(20),
  MOBILE       varchar(14),
  PRIMARY KEY (`ID`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;
ALTER TABLE patients ADD KEY indx_mobile (`mobile`);
ALTER TABLE patients ADD KEY indx_email (`email`);
ALTER TABLE patients ADD KEY indx_name (`first_name`, `last_name`);

--* SECTION "Creating table medical_history_questions"
DROP TABLE IF EXISTS medical_history_questions;
CREATE TABLE `medical_history_questions` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `QUESTION` varchar(100) NOT NULL,
  `IS_CHECKBOX` bit(1) NOT NULL,
  `IS_TEXT` bit(1) NOT NULL,
  `IS_RADIOBUTTON` bit(1) NOT NULL,
  `IS_LIST_ITEM` bit(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;


--* SECTION "Insert the default questions"
INSERT INTO `medical_history_questions`(`ID`,
                                        `QUESTION`,
                                        `IS_CHECKBOX`,
                                        `IS_TEXT`,
                                        `IS_RADIOBUTTON`,
                                        `IS_LIST_ITEM`)
VALUES (1, 'Reactions to local or general anaesthesia', 1, 0, 0, 0),
       (2, 'Anaemia', 1, 0, 0, 0),
       (3, 'Asthma', 1, 0, 0, 0),
       (4, 'Dizziness', 1, 0, 0, 0),
       (5, 'Diabetes', 1, 0, 0, 0),
       (6, 'Excessive Bleeding', 1, 0, 0, 0),
       (7, 'Fainting', 1, 0, 0, 0),
       (8, 'Heart Disease', 1, 0, 0, 0),
       (9, 'Pacemaker', 1, 0, 0, 0),
       (10, 'Respiratory problems', 1, 0, 0, 0),
       (11, 'Allergies to Medicines', 0, 1, 0, 0);

/* Creates the table to save medical history of patients*/
DROP TABLE IF EXISTS patient_medical_history;       
CREATE TABLE patient_medical_history
(
   id            int(10) UNSIGNED,
   patient_id    int(10) UNSIGNED,
   question_id   int(10) UNSIGNED,
   answer        varchar(50)
);
ALTER TABLE patient_medical_history ADD KEY unique_indx1 (patient_id, question_id);

--* /UPGRADE
