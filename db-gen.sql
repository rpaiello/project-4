create database p4logins;
use p4logins;

create table users (
	uid int auto_increment primary key,
    uname varchar(16) not null,
    upass varchar(20) not null
    );
    
insert into users (uname, upass) value
('admin', 'admin'),
('rpaiello', '2022lapland?'),
('jbissen', 'strahdscursed'),
('tbongo', 'hellswelcome'),
('terepy', 'F1XTH1S'),
('mwaterimp', 'slide!'),
('pdoobes', 'sweer');