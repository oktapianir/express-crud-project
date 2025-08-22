drop database data_siswa;
CREATE DATABASE Data_siswa;
use Data_siswa;

-- drop table dt_siswa;
create table dt_siswa(
	kode_siswa INT auto_increment primary key,
    nama_siswa VARCHAR (30),
    alamat_siswa TEXT,
    tgl_siswa DATE,
    jurusan_siswa VARCHAR (20)
);

insert into dt_siswa(nama_siswa,alamat_siswa,tgl_siswa,jurusan_siswa) values 
('nana','bandung','2012-01-01','perkantoran'),
('wini','cimahi','2013-04-06','akuntansi'),
('wina','jawa tengah','2019-05-01','DKV'),
('weni','bali','2011-03-11','pemasaran');

select * from dt_siswa;