-- Table create scripts here




create table client (
	id serial not null primary key,
	first_name text not null,
    last_name text not null,
    phone_number text not null
);



create table treatment (
	id serial not null primary key,
	type text not null,
    code text not null,
    price text not null
);



create table stylist (
	id serial not null primary key,
	first_name text not null,
    last_name text not null,
    phone_number text not null,
    commission_percentage float not null
);


create table booking (
	id serial not null primary key,
	booking_date date not null DEFAULT CURRENT_DATE,
    booking_time time,
    client_id int not null,
    treatment_id int not null,
    stylist_id int not null,
    FOREIGN KEY (client_id) REFERENCES client(id),
    FOREIGN KEY (treatment_id) REFERENCES treatment(id),
    FOREIGN KEY (stylist_id) REFERENCES stylist(id)

);
