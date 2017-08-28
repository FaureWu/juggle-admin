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
  next();
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
router.get('/attrs/:pos', (req, res) => {
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
        uuid: uuid(),
        name: req.body.name,
        intro: req.body.intro,
      },
    });
  } else {
    res.send({
      code: 10111,
      msg: 'token无效',
    });
  }
});

router.post('/attrs/:uuid', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: {
        uuid: req.params.uuid,
        name: req.body.name,
        intro: req.body.intro,
      },
    });
  } else {
    res.send({
      code: 10110,
      msg: 'token无效',
    });
  }
});

router.delete('/attrs/:uuid', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: {
        uuid: req.params.uuid,
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
router.get('/params/:pos', (req, res) => {
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
        uuid: uuid(),
        name: req.body.name,
        intro: req.body.intro,
      },
    });
  } else {
    res.send({
      code: 10111,
      msg: 'token无效',
    });
  }
});

router.post('/params/:uuid', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: {
        uuid: req.params.uuid,
        name: req.body.name,
        intro: req.body.intro,
      },
    });
  } else {
    res.send({
      code: 10110,
      msg: 'token无效',
    });
  }
});

router.delete('/params/:uuid', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: {
        uuid: req.params.uuid,
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

router.post('/products', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: {
        uuid: uuid(),
        name: req.body.name,
        code: req.body.code,
        attrs: req.body.attrs,
        params: req.body.params,
        alias: req.body.alias,
        picture: req.body.picture,
        url: req.body.url,
        detail: req.body.detail,
        status: req.body.status,
      },
    });
  } else {
    res.send({
      code: 10111,
      msg: 'token无效',
    });
  }
});

router.post('/products/:uuid', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: {
        uuid: req.params.uuid,
        name: req.body.name,
        code: req.body.code,
        attrs: req.body.attrs,
        params: req.body.params,
        alias: req.body.alias,
        picture: req.body.picture,
        url: req.body.url,
        detail: req.body.detail,
        status: req.body.status,
      },
    });
  } else {
    res.send({
      code: 10110,
      msg: 'token无效',
    });
  }
});


router.delete('/products/:uuid', (req, res) => {
  if (token === req.get('token')) {
    const key = req.params.uuid;
    mocks.products = mocks.products
      .filter(product => product.uuid !== key);
    res.send({
      code: 0,
      data: {
        uuid: key,
      },
    });
  } else {
    res.send({
      code: 10000,
      msg: 'token无效',
    });
  }
});

// 文章分类相关请求
router.get('/cates/:pos', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: mocks.cates,
      msg: '全部产品参数',
      count: mocks.cates.length,
    });
  } else {
    res.send({
      code: 10113,
      msg: 'token无效',
    });
  }
});

router.post('/cates', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: {
        uuid: uuid(),
        name: req.body.name,
        intro: req.body.intro,
      },
    });
  } else {
    res.send({
      code: 10111,
      msg: 'token无效',
    });
  }
});

router.post('/cates/:uuid', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: {
        uuid: req.params.uuid,
        name: req.body.name,
        intro: req.body.intro,
      },
    });
  } else {
    res.send({
      code: 10110,
      msg: 'token无效',
    });
  }
});

router.delete('/cates/:uuid', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: {
        uuid: req.params.uuid,
      },
    });
  } else {
    res.send({
      code: 10000,
      msg: 'token无效',
    });
  }
});

// 文章标签相关请求
router.get('/tags/:pos', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: mocks.tags,
      msg: '全部产品参数',
      count: mocks.tags.length,
    });
  } else {
    res.send({
      code: 10113,
      msg: 'token无效',
    });
  }
});

router.post('/tags', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: {
        uuid: uuid(),
        name: req.body.name,
        intro: req.body.intro,
      },
    });
  } else {
    res.send({
      code: 10111,
      msg: 'token无效',
    });
  }
});

router.post('/tags/:uuid', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: {
        uuid: req.params.uuid,
        name: req.body.name,
        intro: req.body.intro,
      },
    });
  } else {
    res.send({
      code: 10110,
      msg: 'token无效',
    });
  }
});

router.delete('/tags/:uuid', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: {
        uuid: req.params.uuid,
      },
    });
  } else {
    res.send({
      code: 10000,
      msg: 'token无效',
    });
  }
});

// 文章相关请求
router.get('/articles/:pos/:count', (req, res) => {
  const pos = req.params.pos;
  const count = req.params.count;

  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: mocks.articles.slice(pos, pos + count),
      count: mocks.articles.length,
      msg: '获取产品成功',
    });
  } else {
    res.send({
      code: 10001,
      msg: 'token无效',
    });
  }
});

router.post('/articles', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: {
        uuid: uuid(),
        name: req.body.name,
        alias: req.body.alias,
        cate: req.body.cate,
        tags: req.body.tags,
        picture: req.body.picture,
        detail: req.body.detail,
        status: req.body.status,
      },
    });
  } else {
    res.send({
      code: 10111,
      msg: 'token无效',
    });
  }
});

router.post('/articles/:uuid', (req, res) => {
  if (token === req.get('token')) {
    res.send({
      code: 0,
      data: {
        uuid: req.params.uuid,
        name: req.params.name,
        alias: req.params.alias,
        cate: req.params.cate,
        tags: req.params.tags,
        picture: req.params.picture,
        detail: req.params.detail,
        status: req.params.status,
      },
    });
  } else {
    res.send({
      code: 10110,
      msg: 'token无效',
    });
  }
});


router.delete('/articles/:uuid', (req, res) => {
  if (token === req.get('token')) {
    const key = req.params.uuid;
    mocks.articles = mocks.articles
      .filter(article => article.uuid !== key);
    res.send({
      code: 0,
      data: {
        uuid: key,
      },
    });
  } else {
    res.send({
      code: 10000,
      msg: 'token无效',
    });
  }
});


module.exports = router;
