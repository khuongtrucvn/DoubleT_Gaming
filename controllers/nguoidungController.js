const Category = require('../models/theloai');
const User = require('../models/nguoidung');
const nodemailer = require('nodemailer');

exports.index = async (req, res) => {
    //important data
    const categories = await Category.findAll({raw:true});
    const logined = req.isAuthenticated();

    res.render('nguoi-dung/dang-nhap-dang-ki', {title: 'Đăng nhập - Đăng kí', categories, logined});
};

exports.thongtin = async (req, res) => {
    //important data
    const categories = await Category.findAll({raw:true});
    const logined = req.isAuthenticated();

    //usual data
    const user = req.user;

    res.render('nguoi-dung/chi-tiet', {title: 'Thông tin cá nhân', categories, logined, user});
};

exports.chinhsua_post = async (req, res) => {
    const nameText = await req.body.Name;
    const phoneText = await req.body.PhoneNumber;
    const addressText = await req.body.Address;

    const user = req.user;
    user.update({
        name:nameText,
        phonenumber:phoneText,
        address:addressText,
    });
    res.redirect('/nguoi-dung/thong-tin');
};

exports.doimatkhau_post = async (req, res) => {
    const oldPass = await req.body.OldPass;
    const newPass = await req.body.NewPass;
    const retypePass = await req.body.RetypePass;

    const user = req.user;
    if(user.password === oldPass){
        if(newPass === retypePass){
            user.update({
                password:newPass,
            });
            res.redirect('/');
        }
    }
    res.redirect('/nguoi-dung/thong-tin');
};

exports.dangki_post = async (req, res) => {
    const nameText = await req.body.Name.trim();
    const usernameText = await req.body.Username.trim();
    const passwordText = await req.body.Password;
    const retypeText = await req.body.RetypePassword;
    const emailText = await req.body.Email.trim();

    const emailDuplicate = await User.findAndCountAll({raw:true, where:{email:emailText}});
    const usernameDuplicate = await User.findAndCountAll({raw:true, where:{username:usernameText}});
    if(nameText !== "" && usernameText !== "" && passwordText !== "" && retypeText !== "" && emailText !== ""){
        if(passwordText === retypeText){
            if(usernameDuplicate.count === 0){
                if(emailDuplicate.count === 0){
                    User.create({
                        username:usernameText,
                        password:passwordText,
                        name:nameText,
                        email:emailText,
                    });

                    res.redirect('/');
                }
            }
        }
    }

    res.redirect('/nguoi-dung/dang-nhap-dang-ki');
};

exports.quenmatkhau = async (req, res) => {
    //important data
    const categories = await Category.findAll({raw:true});
    const logined = req.isAuthenticated();

    res.render('nguoi-dung/quen-mat-khau', {title: 'Quên mật khẩu', categories, logined, });
}

exports.quenmatkhau_post = async (req, res) => {
    const emailText = await req.body.Email.trim();

    const email = await User.findOne({raw:true, where:{email:emailText}});
    console.log(emailText);
    console.log(email);
    if(emailText !== ""){
        if(email !== null){
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'supertruc2102@gmail.com',
                    pass: 'khuongtrucvn'
                }
            });

            var mailOptions = {
                from: 'supertruc2102@gmail.com',
                to: emailText,
                subject: 'Quên mật khẩu',
                text: 'Mật khẩu của bạn đã được thiết lập lại. Mật khẩu mới của bạn là 123456. Vui lòng đăng nhập để đổi mật khẩu.'
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    email.update({
                        password:123456,
                    })

                }
            });

            res.redirect('/nguoi-dung/dang-nhap-dang-ki');
        }
    }
    
    res.redirect('/nguoi-dung/quen-mat-khau');
};


