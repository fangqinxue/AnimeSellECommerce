const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/start');


// 加载环境变量
dotenv.config({ path: './config.env' });

// 连接数据库
connectDB();

const app = express();



// 中间件
app.use(cors());
//需要解决跨域问题
app.use(cors({
  origin: 'http://localhost:5173', // 或 origin: true 表示允许任意
  credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//注册静态资源，比如图片
app.use('/static', express.static('static'));



// 路由

app.use('/api/auth', require('./routes/auth'));
app.use('/api/product', require('./routes/product'))
app.use('/api/order',require('./routes/order'))


const PORT = process.env.PORT ;
// || 3000

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

