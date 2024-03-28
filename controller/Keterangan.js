import Keterangan from "../models/KeteranganModels.js";
import User from "../models/UserModels.js";

export const getKeterangan = async (req, res)=> {
    try {
        const response = await Keterangan.findAll();
        res.status(201).json(response);
    } catch (error) {
        res.status(404).json({ msg: "Data Tidak ditemukan" });
    }
}

export const getKeteranganById = async (req, res) => {
    try {
        const response = await Keterangan.findAll({
            where : {
                id_keterangan : req.params.id
            },
            
        });
        res.status(201).json(response);
    } catch (error) {
        res.status(404).json({ msg: "Data Tidak Ditemukan" });
    }
}

export const getKeteranganByUser = async (req, res) => {
    try {
        const response = await Keterangan.findAll({
            where : {
                id_user : req.params.id
            }, 
            include : [
                {
                    model : User,
                    attributes : ["Nama", "usia", "nama_penyakit"]
                }
            ]
        });
        res.status(201).json(response);
    } catch (error) {
        res.status(404).json({ msg: "Data Tidak Ditemukan" });
    }
}

export const createKeternagan = async (req, res) => {
    const {id_user, tanggal, jam, keterangan} = req.body;
    try {
        await Keterangan.create({
            id_user : id_user,
            tanggal : tanggal,
            jam : jam,
            keterangan : keterangan
        })
        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(500).json({ msg: "Register Gagall !!" });
    }
}

export const deleteKeterangan = async (req, res) => {
    try {
        const ket = Keterangan.findOne({
            where : {
                id_keterangan : req.params.id
            }
        })
        if (!ket) res.status(404).json({ msg: "Data Tidak Ditemukan" });
        await ket.destroy();ran
        res.status(201).json({ msg: "Berhasil Dihapus" });
    } catch (error) {
        res.status(404).json({ msg: "Data Gagal DIhapus" });
    }
}