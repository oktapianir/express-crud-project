  import { useState, useEffect } from "react";
  import axios from "axios";

  function App() {
    const [siswa, setSiswa] = useState([]);
    const [form, setForm] = useState({
      kode_siswa: "",
      nama_siswa: "",
      alamat_siswa: "",
      tgl_siswa: "",
      jurusan_siswa: ""
    });

    // 🔹 Ambil data siswa dari backend
    const getSiswa = async () => {
      const res = await axios.get("http://localhost:3001/siswa");
      setSiswa(res.data);
    };

    useEffect(() => {
      getSiswa();
    }, []);

    // 🔹 Tambah siswa
    const tambahSiswa = async (e) => {
      e.preventDefault();
      await axios.post("http://localhost:3001/siswa", form);
      setForm({ kode_siswa:"", nama_siswa:"", alamat_siswa:"", tgl_siswa:"", jurusan_siswa:"" });
      getSiswa();
    };

    // 🔹 Hapus siswa
    const hapusSiswa = async (id) => {
      await axios.delete(`http://localhost:3001/siswa/${id}`);
      getSiswa();
    };

    return (
      <div style={{padding:"20px"}}>
        <h1>📚 Data Siswa</h1>

        {/* Form Tambah */}
        <form onSubmit={tambahSiswa} style={{marginBottom:"20px"}}>
          <input placeholder="Kode" value={form.kode_siswa}
            onChange={(e)=>setForm({...form, kode_siswa:e.target.value})}/>
          <input placeholder="Nama" value={form.nama_siswa}
            onChange={(e)=>setForm({...form, nama_siswa:e.target.value})}/>
          <input placeholder="Alamat" value={form.alamat_siswa}
            onChange={(e)=>setForm({...form, alamat_siswa:e.target.value})}/>
          <input type="date" value={form.tgl_siswa}
            onChange={(e)=>setForm({...form, tgl_siswa:e.target.value})}/>
          <input placeholder="Jurusan" value={form.jurusan_siswa}
            onChange={(e)=>setForm({...form, jurusan_siswa:e.target.value})}/>
          <button type="submit">Tambah</button>
        </form>

        {/* Tabel Data */}
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Kode</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Tanggal</th>
              <th>Jurusan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {siswa.map((s) => (
              <tr key={s.kode_siswa}>
                <td>{s.kode_siswa}</td>
                <td>{s.nama_siswa}</td>
                <td>{s.alamat_siswa}</td>
                <td>{s.tgl_siswa?.substring(0,10)}</td>
                <td>{s.jurusan_siswa}</td>
                <td>
                  <button onClick={()=>hapusSiswa(s.kode_siswa)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  export default App