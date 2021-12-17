const express = require('express');
const { check, validationResult } = require('express-validator')
const router = express.Router();

const AccountsModel = require('../models/AccountsModel');
const DepartmentsModel = require('../models/DepartmentsModel');

// link: /admin
router.get('/', async (req, res, next) => {
    res.json({ code: 0, message: 'Tải thành công trang thông báo admin!' });
});

// link : /admin/accounts
const checkAccount = [
    check('name')
        .exists().withMessage('Chưa có tên người dùng, tên người dùng cần được gửi với key là name!')
        .notEmpty().withMessage('Vui lòng nhập tên người dùng!'),
    check('email')
        .exists().withMessage('Chưa có địa chỉ Email, Email cần được gửi với key là email!')
        .notEmpty().withMessage('Vui lòng nhập địa chỉ Email!')
        .isEmail().withMessage('Địa chỉ Email không hợp lệ!'),
    check('department')
        .exists().withMessage('Chưa có phòng/khoa, phòng/khoa cần được gửi với key là department!')
        .notEmpty().withMessage('Vui lòng chọn phòng/khoa!'),
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
    try {
        let result = validationResult(req);
        if (result.errors.length === 0) {
            let { name, email, department } = req.body;
            let user = await AccountsModel.findOne({ email: email }).exec();
            if (!user) {
                let data = { email, password: email, name, image: '', role: 1, department, post: 0 };
                let result = await AccountsModel.create(data);
                return res.json({ code: 0, message: 'Thêm tài khoản thành công!', result });
            }
            return res.json({ code: 2, message: 'Tài khoản đã tồn tại trước đó!' });
        }
        result = result.mapped();
        for (fields in result) {
            return res.json({ code: 2, message: result[fields].msg });
        }
    } catch (error) {
        return res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
    }
});

router.put("/accounts/:id", async (req, res, next) => {
    try {
        let result = await AccountsModel.findOneAndUpdate({ _id: req.params.id }, req.body)
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

// link: admin/departments
const checkDepartment = [
    check('department')
        .exists().withMessage('Chưa có phòng/khoa, phòng/khoa cần được gửi với key là department!')
        .notEmpty().withMessage('Vui lòng nhập tên phòng/khoa!'),
    check('description')
        .exists().withMessage('Chưa có mô tả, mô tả cần được gửi với key là description!')
        .notEmpty().withMessage('Vui lòng nhập mô tả!'),
]

router.get('/departments', async (req, res, next) => {
    try {
        let result = await DepartmentsModel.find().exec();
        res.json({ code: 0, message: 'Tải dữ liệu thành công!', result });
    } catch (error) {
        res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
    }
});

router.get('/departments/:id', async (req, res, next) => {
    try {
        let result = await DepartmentsModel.findById(req.params.id).exec();
        res.json({ code: 0, message: 'Tải dữ liệu thành công!', result });
    } catch (error) {
        res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
    }
});

router.post('/departments', checkDepartment, async (req, res, next) => {
    try {
        let result = validationResult(req);
        if (result.errors.length === 0) {
            let { department, description } = req.body;
            let descriptions = await DepartmentsModel.findOne({ department: department }).exec();
            if (!descriptions) {
                let result = await DepartmentsModel.create({ department, description });
                return res.json({ code: 0, message: 'Thêm phòng/khoa thành công!', result });
            }
            return res.json({ code: 2, message: 'Phòng/khoa đã tồn tại trước đó!' });
        }
        result = result.mapped();
        for (fields in result) {
            return res.json({ code: 2, message: result[fields].msg });
        }
    } catch (error) {
        return res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
    }
});

router.put("/departments/:id", async (req, res, next) => {
    try {
        let result = await DepartmentsModel.findOneAndUpdate({ _id: req.params.id }, req.body)
        res.json({ code: 0, message: 'Cập nhật dữ liệu thành công!', result });
    } catch (error) {
        res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
    }
});

router.delete('/departments/:id', async (req, res, next) => {
    try {
        let result = await DepartmentsModel.deleteOne({ _id: req.params.id }).exec();
        res.json({ code: 0, message: 'Xóa phòng/khoa thành công!', result });
    } catch (error) {
        res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
    }
});

module.exports = router;
