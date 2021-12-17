const express = require('express');
const { check, validationResult } = require('express-validator')
const router = express.Router();

const NofiticationsModel = require('../models/NofiticationsModel');

router.get('/', function (req, res, next) {
    res.json({ code: 0, message: 'Tải thành công trang thông báo phòng/khoa!' });
});

const checkNotification = [
    check('title')
        .exists().withMessage('Chưa có tiêu đề bài viết, tiêu đề cần được gửi với key là title!')
        .notEmpty().withMessage('Vui lòng nhập tiêu đề bài viết!'),
    check('content')
        .exists().withMessage('Chưa có nội dung bài viết, nội dung cần được gửi với key là content!')
        .notEmpty().withMessage('Vui lòng nhập nội dung bài viết!'),
    check('department')
        .exists().withMessage('Chưa có phòng/khoa, phòng/khoa cần được gửi với key là department!')
        .notEmpty().withMessage('Vui lòng nhập phòng/khoa!'),
]

router.get('/nofitications', async (req, res, next) => {
    try {
        let result = await NofiticationsModel.find().exec();
        res.json({ code: 0, message: 'Tải dữ liệu thành công!', result });
    } catch (error) {
        res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
    }
});

router.get('/nofitications/:id', async (req, res, next) => {
    try {
        let result = await NofiticationsModel.findById(req.params.id).exec();
        res.json({ code: 0, message: 'Tải dữ liệu thành công!', result });
    } catch (error) {
        res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
    }
});

router.post('/nofitications', checkNotification, async (req, res, next) => {
    try {
        let result = validationResult(req);
        if (result.errors.length === 0) {
            let { title, content, department } = req.body;
            let result = await NofiticationsModel.create({ title, content, department });
            return res.json({ code: 0, message: 'Thêm thông báo thành công!', result });
        }
        result = result.mapped();
        for (fields in result) {
            return res.json({ code: 2, message: result[fields].msg });
        }
    } catch (error) {
        return res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
    }
});

router.put("/nofitications/:id", async (req, res, next) => {
    try {
        let result = await NofiticationsModel.findOneAndUpdate({ _id: req.params.id }, req.body)
        res.json({ code: 0, message: 'Cập nhật dữ liệu thành công!', result });
    } catch (error) {
        res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
    }
});

router.delete('/nofitications/:id', async (req, res, next) => {
    try {
        let result = await NofiticationsModel.deleteOne({ _id: req.params.id }).exec();
        res.json({ code: 0, message: 'Xóa thông báo thành công!', result });
    } catch (error) {
        res.status(500).json({ code: 1, message: 'Lỗi kết nối tới database!' });
    }
});

module.exports = router;