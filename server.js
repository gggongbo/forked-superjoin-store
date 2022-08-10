const express = require('express');
const next = require('next');

const port = 3000;
const dev = process.env.NODE_ENV;
const app = next({ dev });
const handle = app.getRequestHandler();
const url = require('url');
const lruCache = require('lru-cache');
const { query } = require('express');

// eslint-disable-next-line new-cap
const ssrCache = new lruCache({
  max: 100, // 최대 100개 항목 저장
  // maxAge: 1000 * 60, // 저장한 항목은 60초 동안 저장 (밀리세컨 단위인가봄) deprecated되어 주석처리
});

// 동적 페이지 정적페이지 동시 서비스를 위한 추가 소스 시작
const fs = require('fs');

const prerenderList = [
  { name: 'login', path: '/login' },
  { name: 'makeoffer', path: '/makeoffer' },
  { name: 'offer', path: '/offer' },
  { name: 'customer', path: '/customer' },
  { name: 'reward', path: '/reward' },
  { name: 'support', path: '/support' },
  // { name: 'page2-hello', path: '/page2?text=world' },
];

const prerenderCache = {};
if (dev) {
  // eslint-disable-next-line no-restricted-syntax
  for (const info of prerenderList) {
    const { name, path } = info;
    const html = fs.readFileSync(`./out/${name}.html`, 'utf8');
    prerenderCache[path] = html;
  }
}

// 동적 페이지 정적페이지 동시 서비스를 위한 추가 소스 끝

async function renderAndCache(req, res) {
  // 캐싱 기능 구현
  const parsedUrl = url.parse(req.url, true);
  const cacheKey = parsedUrl.path;
  if (ssrCache.has(cacheKey)) {
    // 캐시가 있으면 캐시에 저장된 값 사용
    console.log('캐시 사용');
    res.send(ssrCache.get(cacheKey));
    return;
  }
  // 동적 페이지 정적페이지 동시 서비스를 위한 추가 소스 시작
  // eslint-disable-next-line no-prototype-builtins
  if (prerenderCache.hasOwnProperty(cacheKey)) {
    console.log('미리 렌더링한 html 사용');
    res.send(prerenderCache[cacheKey]);
    return;
  }
  // 동적 페이지 정적페이지 동시 서비스를 위한 추가 소스 끝
  try {
    const { query: parsedQuery, pathname } = parsedUrl;
    const html = await app.renderToHTML(req, res, pathname, parsedQuery); // 캐시가 없으면 넥스트의 renderToHTML 메소드 호출. await 키워드 사용해서 처리 끝날때까지 기다림
    if (res.statusCode === 200) {
      ssrCache.set(cacheKey, html); // renderToHTML이 정상 처리되면 그 결과를 캐싱
    }
    res.send(html);
  } catch (err) {
    // app.renderError(err, req, res, pathname, query);
    app.renderError(err, req, res, query);
  }
}

app.prepare().then(() => {
  const server = express();
  server.get('/page/:id', (req, res) => {
    res.redirect(`/page${req.params.id}`); // page/1 요청 들어오면 page1으로 리다이렉트
  });
  server.get(/^\/page[1-9]/, (req, res) => {
    return renderAndCache(req, res);
  });
  server.get('*', (req, res) => {
    return handle(req, res); // 나머지 요청은 handle 함수가 처리
  });
  server.listen(port, err => {
    // 사용자 요청을 처리하기 위해 대기
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
  });
});
