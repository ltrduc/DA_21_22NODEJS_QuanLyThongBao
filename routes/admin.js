const express = require('express');
const { check, validationResult } = require('express-validator')
const router = express.Router();

const AccountsModel = require('../models/AccountsModel');
const RoomsModel = require('../models/RoomsModel');

router.get('/', function (req, res, next) {
    res.json('Trang admin');
});

// ---------------------------
// ------/admin/accounts------
// ---------------------------
const checkAccount = [
    check('name')
        .exists().withMessage('Chưa có tên người dùng, tên người dùng cần được gửi với key là name!')
        .notEmpty().withMessage('Vui lòng nhập tên người dùng!'),
    check('email')
        .exists().withMessage('Chưa có địa chỉ Email, Email cần được gửi với key là email!')
        .notEmpty().withMessage('Vui lòng nhập địa chỉ Email!')
        .isEmail().withMessage('Địa chỉ Email không hợp lệ!'),
]

router.get('/accounts', async (req, res, next) => {
    try {
        let result = await AccountsModel.find().exec();
        res.json({ code: 0, message: 'Tải dữ liệu thành công!', result });
    } catch (error) {
        res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
    }
});

router.get('/accounts/:id', async (req, res, next) => {
    try {
        let result = await AccountsModel.findById(req.params.id).exec();
        res.json({ code: 0, message: 'Tải dữ liệu thành công!', result });
    } catch (error) {
        res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
    }
});

router.post('/accounts', checkAccount, async (req, res, next) => {
    let result = validationResult(req);
    let { name, email } = req.body;
    let message;

    if (result.errors.length === 0) {
        try {
            let account = await AccountsModel.findOne({ email: email }).exec();
            if (account === null) {
                let data = { email: email, password: email, name: name, rooms: '', image: '', role: 1 };
                let result = await AccountsModel.create(data);
                return res.json({ code: 0, message: 'Thêm tài khoản thành công!', result });
            } else {
                return res.json({ code: 2, message: 'Tài khoản đã tồn tại trước đó!' });
            }
        } catch (error) {
            return res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
        }
    }

    result = result.mapped();
    for (fields in result) {
        message = result[fields].msg
        req.flash('error', message);
        break;
    }
    res.json({ code: 2, message, name, email });
});

router.put("/accounts/:id", async (req, res, next) => {
    try {
        var result = await AccountsModel.findOneAndUpdate({ _id: req.params.id }, req.body)
        res.json({ code: 0, message: 'Cập nhật dữ liệu thành công!', result });
    } catch (error) {
        res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
    }
});

router.delete('/accounts/:id', async (req, res, next) => {
    try {
        let result = await AccountsModel.deleteOne({ _id: req.params.id }).exec();
        res.json({ code: 0, message: 'Xóa tài khoản thành công!', result });
    } catch (error) {
        res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
    }
});

// ---------------------------
// -------/admin/rooms--------
// ---------------------------
const checkRooms = [
    check('rooms')
        .exists().withMessage('Chưa có tên phòng/khoa, tên phòng/khoa cần được gửi với key là rooms!')
        .notEmpty().withMessage('Vui lòng nhập tên phòng/khoa!'),
    check('description')
        .exists().withMessage('Chưa có mô tả, mô tả cần được gửi với key là description!')
        .notEmpty().withMessage('Vui lòng nhập mô tả!'),
]

router.get('/rooms', async (req, res, next) => {
    try {
        let result = await RoomsModel.find().exec();
        res.json({ code: 0, message: 'Tải dữ liệu thành công!', result });
    } catch (error) {
        res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
    }
});

router.get('/rooms/:id', async (req, res, next) => {
    try {
        let result = await RoomsModel.findById(req.params.id).exec();
        res.json({ code: 0, message: 'Tải dữ liệu thành công!', result });
    } catch (error) {
        res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
    }
});

router.post('/rooms', checkRooms, async (req, res, next) => {
    let result = validationResult(req);
    let { rooms, description } = req.body;
    let message;

    if (result.errors.length === 0) {
        try {
            let room = await RoomsModel.findOne({ rooms: rooms }).exec();
            if (room === null) {
                let data = { rooms: rooms, description: description };
                let result = await RoomsModel.create(data);
                return res.json({ code: 0, message: 'Thêm phòng/khoa thành công!', result });
            } else {
                return res.json({ code: 2, message: 'Phòng/khoa đã tồn tại trước đó!' });
            }
        } catch (error) {
            return res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
        }
    }

    result = result.mapped();
    for (fields in result) {
        message = result[fields].msg
        req.flash('error', message);
        break;
    }
    res.json({ code: 2, message, rooms, description });
});

router.put("/rooms/:id", async (req, res, next) => {
    try {
        var result = await RoomsModel.findOneAndUpdate({ _id: req.params.id }, req.body)
        res.json({ code: 0, message: 'Cập nhật dữ liệu thành công!', result });
    } catch (error) {
        res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
    }
});

router.delete('/rooms/:id', async (req, res, next) => {
    try {
        let result = await RoomsModel.deleteOne({ _id: req.params.id }).exec();
        res.json({ code: 0, message: 'Xóa phòng/khoa thành công!', result });
    } catch (error) {
        res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
    }
});

module.exports = router;
