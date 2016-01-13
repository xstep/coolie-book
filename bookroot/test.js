var ret = coolie.buildCSSPath('./css/style.css', '/path/to/html/page.html');

if (!ret) {
    // 构建失败
}

// ret
// ret.url 构建之后的 url