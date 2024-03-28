import argon2, { hash } from "argon2";
import User from "../models/UserModels.js"

export const getUser = async (req, res)=> {
    try {
        const response = await User.findAll()
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg : "Data Tidak ditemukan"})        
    }
}

export const getUserbyId = async (req, res)=> {
    try {
        const response = await User.findAll({
            where : {
                id_user : req.params.id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg : "Data Tidak ditemukan"})        
    }
}

export const createUser = async (req, res) => {
  const { Nama, Username, nama_penyakit, usia, Password, confPassword } = req.body;
  if (Password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan confirm password tidak sama" });
  try {
    const hashPassword = await argon2.hash(Password); // Hash password
    await User.create({
      Nama: Nama,
      nama_penyakit : nama_penyakit,
      usia : usia,
      Username: Username,
      Password: hashPassword,
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    console.log(Nama, Username, Password);
    res.status(400).json({ msg: "Harap Masukan Semua Field" });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id_user: req.params.id,
      },
    });
    if (!user) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    await user.destroy(); // Hapus data User dengan model Sequelize
    res.status(200).json({ msg: "Data telah dihapus" });
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan dalam menghapus data" });
  }
};