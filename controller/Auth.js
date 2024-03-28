import argon2, {hash} from "argon2";
import User from "../models/UserModels.js";


export const Login = async (req, res) => {
  try {
    let user = null;

    const admin = await User.findOne({
      where: {
        Username: req.body.Username,
      },
    });
    if (admin) {
      user = admin;
      const match = await argon2.verify(user.Password, req.body.Password);
      if (!match) {
        return res.status(400).json({ msg: "Password salah" });
      }
    } else {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }
    // Berhasil login
    req.session.userId = user.id_user;
    const { Username } = user;
    const nama = user.Nama;
    const id = user.id_user;
    res.status(200).json({ id, nama, Username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Terjadi kesalahan dalam proses login" });
  }
};

export const Me = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ msg: "Mohon login ke akun Anda" });
    }

    let user = null;

    const admin = await User.findOne({
        where: {
        id_user: req.session.userId,
      },
    });

    user = admin;

    if (user) {
      res.status(200).json(user);
    } else {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }
  } catch (error) {
    console.error("Terjadi Kesalahan:", error);
    res.status(500).json({
      msg: "Terjadi kesalahan",
    });
  }
};

export const Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "logout telah berhasil" });
  });
};
