/* eslint-disable */
const express = require('express')
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware');

const apiProxy = createProxyMiddleware('/api', { target: 'http://www.example.org' });

const app = express()

app.use(express.static(path.join(__dirname, '../dist')))

app.use(createProxyMiddleware('/boss', {
  target: 'http://eduboss.lagou.com',
  changeOrigin: true
}))
app.use(createProxyMiddleware('/front', {
  target: 'http://edufront.lagou.com',
  changeOrigin: true
}))

app.listen(5000)

console.log('running: http://localhost:5000')
