-- Add insert scripts here
create database salon_test;
create role postgres login password 'Jnisto9801';
grant all privileges on database salon_test to postgres;

-- Treatment

insert into treatment (type, code, price) values ('Pedicure', 'ped','R175');
insert into treatment (type, code, price) values ('Manicure', 'man','R215');
insert into treatment (type, code, price) values ('MakeUp', 'mak','R185');
insert into treatment (type, code, price) values ('Brows&Lashes', 'B&L','R240');


-- Clients

insert into client (first_name, last_name, phone_number) values ('Phumza', 'Grace','0786523472');
insert into client (first_name, last_name, phone_number) values ('Khazimla', 'Mahomana','0856457562');
insert into client (first_name, last_name, phone_number) values ('Zezethu', 'Topa','0856425828');
insert into client (first_name, last_name, phone_number) values ('Zeenat', 'Vontour','0723568493');
insert into client (first_name, last_name, phone_number) values ('Pelele', 'Paradium','0832456897');
insert into client (first_name, last_name, phone_number) values ('Khomana', 'Manana','0732658942');
insert into client (first_name, last_name, phone_number) values ('Manaka', 'Moe','0823654896');


-- stylists


insert into stylist (first_name, last_name, phone_number,commission_percentage) values ('Zeenat', 'Vontour','0836547953','0.13');
insert into stylist (first_name, last_name, phone_number,commission_percentage) values ('Pelele', 'Paradium', '0723654231','0.18');
insert into stylist (first_name, last_name, phone_number,commission_percentage) values ('Khomana', 'Manana','0836254631','0.08');
insert into stylist (first_name, last_name, phone_number,commission_percentage) values ('Manaka', 'Moe', '0723654231','0.11');