    const express = require('express');
    const cors = require('cors');
    const connection = require('./db');
    const bodyParser = require('body-parser');
    const app = express();
    const port = 3001;

    app.use(cors());
    app.use(express.json());

    let siswa = [];

    // CREATE
    app.post('/siswa', (req, res) => {
        const data = {
            kode_siswa: req.body.kode_siswa,
            nama_siswa: req.body.nama_siswa,
            alamat_siswa: req.body.alamat_siswa,
            tgl_siswa: req.body.tgl_siswa,
            jurusan_siswa: req.body.jurusan_siswa
        };

        connection.query('INSERT INTO dt_siswa SET ?', data, (err, results) => {
            if (err) return res.status(500).send(err);
            res.send({ message: 'Data siswa ditambahkan!', id: results.insertId });
        });
    });



    // READ
    app.get('/siswa', (req, res) => {
        connection.query('SELECT * FROM dt_siswa', (err, results) => {
            if (err) return res.status(500).send(err);
            res.send(results);
        });
    });

    // UPDATE
    app.put('/siswa/:kode_siswa', (req, res) => {
        const { kode_siswa } = req.params;
        const { nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;

        const sql = `UPDATE dt_siswa 
                    SET nama_siswa = ?, alamat_siswa = ?, tgl_siswa = ?, jurusan_siswa = ? 
                    WHERE kode_siswa = ?`;

        connection.query(sql, [nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa, kode_siswa], (err, result) => {
            if (err) {
                console.error("Gagal update:", err);
                res.status(500).send({ message: "Gagal update" });
            } else {
                res.send({ message: "Berhasil update!" });
            }
        });
    });

    // DELETE
    app.delete('/siswa/:kode', (req, res) => {
        const kode = req.params.kode; 

        connection.query('DELETE FROM dt_siswa WHERE kode_siswa = ?', [kode], (err, results) => {
            if (err) return res.status(500).send(err);

            if (results.affectedRows === 0) {
                return res.status(404).send({ message: 'Data tidak ditemukan' });
            }

            res.send({ message: 'Data siswa dihapus!' });
        });
    });

    app.listen(port, () => {
        console.log(`Server berjalan di http://localhost:${port}`);
    });

