const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');

const db = require('./models');
const passportConfig = require('./passport');
const app = express();

db.sequelize.sync();
// db.sequelize.sync({ force: true });
passportConfig();

app.use(morgan('dev'));
app.use(cors('http://localhost:3000'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie('cookiesecret'));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'cookiesecret',
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.status(200).send('안녕');
});

app.post('/user', async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 12);
    const exUser = await db.User.findOne({
      email: req.body.email,
    });
    if (exUser) {
      // 이미 회원가입 되어있으면
      return res.status(403).json({
        errorCode: 1,
        message: '이미 회원가입 되어있습니다.',
      });
    }
    const newUser = await db.User.create({
      email: req.body.email,
      password: hash,
      nickname: req.body.nickname,
    }); // HTTP STATUS CODE
    return res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    return next(err); // 알아서 프론트에 에러 내용을 넘겨준다.
  }
});

app.post('/user/login', (req, res) => {
  // email이랑 password 검사
  db.User.findOne();
  // 세션에 저장
  user[cookie] = 유저정보;
  // 프론트에 쿠키 내려보내주기
});

app.listen(3085, () => {
  console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`);
});
