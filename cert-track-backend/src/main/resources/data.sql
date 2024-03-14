SET FOREIGN_KEY_CHECKS = 0; 
truncate table own_cert;
truncate table certificate;
truncate table issuer;
truncate table vendor;
truncate table employee;
truncate table organization;
truncate table user_roles;
truncate table role;
truncate table `user`;
SET FOREIGN_KEY_CHECKS = 1; 

INSERT INTO organization (bu, divn, dept, sect) VALUES
('GABLE','CEO','CPS',''),
('GABLE','CEO','CSO',''),
('GABLE','CEO','IA',''),
('GABLE','CEO','PCL','LOG'),
('GABLE','CEO','PCL','PCM'),
('GABLE','CFSO','',''),
('GABLE','CFSO','CFI',''),
('GABLE','CFSO','CFI','FPA'),
('GABLE','CFSO','CFI','LCM'),
('GABLE','CFSO','CFI','SFI'),
('GABLE','CFSO','CLC',''),
('GABLE','CFSO','CSBD','BD'),
('GABLE','CFSO','CSBD','CS'),
('GABLE','CFSO','F&A',''),
('GABLE','CFSO','F&A','ACC1'),
('GABLE','CFSO','F&A','ACC2'),
('GABLE','CFSO','F&A','ACC3'),
('GABLE','CFSO','F&A','ACC4'),
('GABLE','CFSO','F&A','OA'),
('GABLE','CFSO','F&A','TRS1'),
('GABLE','CFSO','F&A','TRS2'),
('GABLE','CFSO','F&A','TRS3'),
('GABLE','CFSO','IRSD',''),
('GABLE','COO','',''),
('GABLE','COO','CTR',''),
('GABLE','GTM','',''),
('GABLE','GTM','BPE',''),
('GABLE','GTM','CMS',''),
('GABLE','GTM','CMS','CM'),
('GABLE','GTM','CMS','SALEC'),
('GABLE','GTM','ENB',''),
('GABLE','GTM','MA','MA1'),
('GABLE','GTM','MA','MA2'),
('GABLE','GTM','SI',''),
('GABLE','GTM','SI','ASC1'),
('GABLE','GTM','SI','ASC2'),
('GABLE','GTM','SI','ASC3'),
('GABLE','GTM','SI','ASC4'),
('GABLE','GTM','SI','DIG'),
('GABLE','GTM','SI','ASM'),
('GABLE','GTM','SI','ASM1'),
('GABLE','GTM','SI','ASM2'),
('GABLE','GTM','SI','ASM3'),
('GABLE','GTM','SI','ASM4'),
('GABLE','GTM','SI','PSS'),
('GABLE','GTM','SI','TEC'),
('GABLE','GTM','SL1','EDHT'),
('GABLE','GTM','SL1','SA1'),
('GABLE','GTM','SL2',''),
('GABLE','GTM','SL2','FSI1'),
('GABLE','GTM','SL2','FSI2'),
('GABLE','GTM','SL2','SA2'),
('GABLE','GTM','SL3',''),
('GABLE','GTM','SL3','AUTO'),
('GABLE','GTM','SL3','E&P'),
('GABLE','GTM','SL3','SA3'),
('GABLE','GTM','SL4',''),
('GABLE','GTM','SL4','LOT'),
('GABLE','GTM','SL4','RSMA'),
('GABLE','GTM','SSM',''),
('GABLE','HR','',''),
('GABLE','HR','C&B',''),
('GABLE','HR','ECC',''),
('GABLE','HR','IC',''),
('GABLE','HR','OCD',''),
('GABLE','HR','PBP',''),
('GABLE','HR','TAR',''),
('GABLE','ITS','',''),
('GABLE','ITS','DAS',''),
('GABLE','ITS','EAD',''),
('GABLE','ITS','SIE',''),
('GABLE','MKT','BRD',''),
('GABLE','MKT','MKC',''),
('GABLE','MKT','PR',''),
('MVG','','',''),
('GABLE','OET','',''),
('GABLE','OET','PD',''),
('GABLE','OET','QM',''),
('MVG','SBS','',''),
('FIRST','SCS','',''),
('MVG','SCS','DPA',''),
('MVG','SCS','DPF',''),
('FIRST','SCS','MSI',''),
('FIRST','SCS','PSM',''),
('FIRST','SCS','SC',''),
('MVG','SD','',''),
('FIRST','SMD','',''),
('GABLE','SMT','AAPP',''),
('GABLE','SMT','AAPP','DB1'),
('GABLE','SMT','AAPP','DB2'),
('GABLE','SMT','AAPP','DB3'),
('GABLE','SMT','AAPP','DB4'),
('GABLE','SMT','AAPP','DB5'),
('GABLE','SMT','AAPP','DB6'),
('GABLE','SMT','AAPP','DB7'),
('GABLE','SMT','AAPP','DB8'),
('GABLE','SMT','AAPP','DB9'),
('GABLE','SMT','AAPP','DI1'),
('GABLE','SMT','AAPP','DI2'),
('GABLE','SMT','AAPP','DI3'),
('GABLE','SMT','AAPP','DL1'),
('GABLE','SMT','AAPP','DL2'),
('GABLE','SMT','AAPP','DL3'),
('GABLE','SMT','AAPP','DL4'),
('GABLE','SMT','AAPP','DTD1'),
('GABLE','SMT','AAPP','DTD2'),
('GABLE','SMT','AAPP','DTD3'),
('GABLE','SMT','AAPP','DTD4'),
('GABLE','SMT','AAPP','DTD5'),
('GABLE','SMT','AAPP','QAA1'),
('GABLE','SMT','AAPP','QAA2'),
('GABLE','SMT','AAPP','QAA3'),
('GABLE','SMT','AAPP','QAA4'),
('GABLE','SMT','AAPP','TDD1'),
('GABLE','SMT','AAPP','TDD2'),
('GABLE','SMT','AAPP','TDD3'),
('GABLE','SMT','AAPP','TDD4'),
('GABLE','SMT','AAPP','TDD5'),
('GABLE','SMT','AAPP','TDD6'),
('GABLE','SMT','AAPP','TDD7'),
('GABLE','SMT','AAPP','TDD8'),
('GABLE','SMT','AAPP','TDD9'),
('GABLE','SMT','AAPP','TDD10'),
('GABLE','SMT','BND',''),
('GABLE','SMT','CNHP','CCS1'),
('GABLE','SMT','MTS','SBS'),
('GABLE','SMT','CNHP','CCS2'),
('GABLE','SMT','CNHP','CCS3'),
('GABLE','SMT','CNHP','CTS4'),
('GABLE','SMT','CNHP','CTS5'),
('GABLE','SMT','CNHP','CTS6'),
('GABLE','SMT','CNHP','CTS7'),
('GABLE','SMT','CNHP','CTS8'),
('GABLE','SMT','CNHP','CTS9'),
('GABLE','SMT','CNHP','DCT1'),
('GABLE','SMT','CNHP','DCT2'),
('GABLE','SMT','CNHP','DCT3'),
('GABLE','SMT','CNHP','DCT4'),
('GABLE','SMT','CNHP','DCT5'),
('GABLE','SMT','CNHP','DCT6'),
('GABLE','SMT','CNHP','DCT7'),
('GABLE','SMT','CNHP','DCT8'),
('GABLE','SMT','CNHP','DCT9'),
('GABLE','SMT','CNHP','DCT10'),
('GABLE','SMT','CNHP','DCT11'),
('GABLE','SMT','CNHP','PMO1'),
('GABLE','SMT','CNHP','PMO2'),
('GABLE','SMT','CNHP','PMO3'),
('GABLE','SMT','CNHP','PMO4'),
('GABLE','SMT','DNA',''),
('GABLE','SMT','DNA','BSC'),
('GABLE','SMT','DNA','DAP'),
('GABLE','SMT','DNA','DEM'),
('GABLE','SMT','MTS',''),
('GABLE','SMT','MTS','BSM1'),
('GABLE','SMT','MTS','BSM2'),
('GABLE','SMT','MTS','BSM3'),
('GABLE','SMT','MTS','BSM4'),
('GABLE','SMT','MTS','BSM5'),
('GABLE','SMT','MTS','MSA1'),
('GABLE','SMT','MTS','MSA2'),
('GABLE','SMT','MTS','MSA3'),
('GABLE','SMT','MTS','MSA4'),
('GABLE','SMT','MTS','MSA5'),
('GABLE','SMT','MTS','MSA6'),
('GABLE','SMT','MTS','MSA7'),
('GABLE','SMT','MTS','MST8'),
('GABLE','SMT','MTS','MST9'),
('GABLE','SMT','MTS','OSS1'),
('GABLE','SMT','MTS','OSS2'),
('GABLE','SMT','MTS','SBS1');

INSERT INTO issuer (name) VALUES('Issuer 1'), ('Issuer 2'), ('Issuer 3'), ('Issuer 4'), ('Issuer 5') ;
INSERT INTO vendor (name) VALUES('Vendor 1'), ('Vendor 2'), ('Vendor 3') ;
INSERT INTO `role` (name) VALUES('ROLE_USER'), ('ROLE_HR'), ('ROLE_MANAGER'), ('ROLE_HRMANAGER'), ('ROLE_ADMIN');

INSERT INTO `user` (email, password, username) VALUES
('user1@abc.com', 'password', 'user1'), 
('user2@abc.com', 'password', 'user2'), 
('user3@abc.com', 'password', 'user3'),
('user4@abc.com', 'password', 'user4');

INSERT INTO user_roles (user_id, role_id) VALUES(2, 1), (2 ,2) ,(3,1), (3,2) , (3,3), (4, 4);

INSERT INTO employee (employee_id, first_name,  last_name, import_date, organization_id, user_id) VALUES
('0001', 'employee1', 'goodfam', '2024-02-20', 1, 1),
('0002', 'employee2', 'normfam', '2024-02-20', 20, 2),
('0003', 'employee3', 'bestfam', '2024-02-20', 30, 3);
('0004', 'hrmanager1', 'hrmng', '2024-02-20', 1, 4);

UPDATE organization SET  manager_id=1 WHERE id=1;

INSERT INTO certificate (cert_demand, demand, incentive_type,is_active, is_official, is_paid, level, logo, name, note, proposed,  status, issuer_id, vendor_id) VALUES
('Create_Business', 'Medium', 'High' , true, true, true, 'Foundation','file:certificate_20240223123509.jpg' ,'Cert 1' , 'Note 1' , 3000, 0 , 1, 1),
('Create_Business', 'Medium', 'High' , true, true, true, 'Foundation','file:certificate_20240223123509.jpg' ,'Cert 2' , 'Note 2' , 3000, 0 , 2, 1),
('Create_Business', 'Medium', 'High' , true, true, true, 'Foundation','file:certificate_20240223123509.jpg' ,'Cert 3' , 'Note 3' , 3000, 0 , 3, 2);