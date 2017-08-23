const express = require('express');
const uuid = require('uuid/v4');
const mocks = require('../mocks');

const router = express.Router();

/**
 *  example of return value
 *  [error] res.send({ status: 'error', message: 'error message or error object and so on', data: Array || Object || String || Number })
 *  [ok] res.send({ status: 'ok', data: Array || Object || String || Number })
 */

router.use((req, res, next) => {
  console.log(`request ${req.originalUrl}`);
  setTimeout(next, 1000);
});

const users = {
  admin: 'admin',
  guest: 'guest',
};

const token = 'gwLTE1MDMyODI0MTUtMGM3ZWY2ZGFkMmMzNGYxNDk1ZmUwOTc1MGQ1MTM1YTc';

// 登陆相关请求
router.post('/login', (req, res) => {
  const {
    name,
    password,
  } = req.body;

  if (users[name] === password) {
    res.send({
      code: 0,
      msg: '用户登陆成功',
      data: {
        user: {
          id: 1,
          name,
        },
        token,
      },
    });
  } else {
    res.send({
      code: 10113,
      msg: '用户名或者密码不正确',
    });
  }
});

// 属性相关请求
router.get('/attrs', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: mocks.attrs,
      msg: '全部产品属性',
      count: mocks.attrs.length,
    });
  } else {
    res.send({
      code: 10113,
      msg: 'token无效',
    });
  }
});

router.post('/attrs', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: {
        key: uuid(),
        name: req.body.name,
        description: req.body.description,
      },
    });
  } else {
    res.send({
      code: 10111,
      msg: 'token无效',
    });
  }
});

router.post('/attrs/:key', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: {
        key: req.params.key,
        name: req.body.name,
        description: req.body.description,
      },
    });
  } else {
    res.send({
      code: 10110,
      msg: 'token无效',
    });
  }
});

router.delete('/attrs/:key', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: {
        key: req.params.key,
      },
    });
  } else {
    res.send({
      code: 10000,
      msg: 'token无效',
    });
  }
});

// 参数相关请求
router.get('/params', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: mocks.params,
      msg: '全部产品参数',
      count: mocks.params.length,
    });
  } else {
    res.send({
      code: 10113,
      msg: 'token无效',
    });
  }
});

router.post('/params', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: {
        key: uuid(),
        name: req.body.name,
        description: req.body.description,
      },
    });
  } else {
    res.send({
      code: 10111,
      msg: 'token无效',
    });
  }
});

router.post('/params/:key', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: {
        key: req.params.key,
        name: req.body.name,
        description: req.body.description,
      },
    });
  } else {
    res.send({
      code: 10110,
      msg: 'token无效',
    });
  }
});

router.delete('/params/:key', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: {
        key: req.params.key,
      },
    });
  } else {
    res.send({
      code: 10000,
      msg: 'token无效',
    });
  }
});

// 产品相关请求
router.get('/products/:pos/:count', (req, res) => {
  const pos = req.params.pos;
  const count = req.params.count;

  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: mocks.products.slice(pos, pos + count),
      count: mocks.products.length,
      msg: '获取产品成功',
    });
  } else {
    res.send({
      code: 10001,
      msg: 'token无效',
    });
  }
});

module.exports = router;
