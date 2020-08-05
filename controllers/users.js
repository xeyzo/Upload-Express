const UserModel = require("../models/todoModel");
class UserController {
  static async photoUpload(req, res) {
    const { params, file, body } = req;
    const user = new UserModel({ title: body.nama, photo: file.filename });
    await user.save() 
    res.json({ params, file, nama: body.nama });
  }
}

module.exports = UserController;
