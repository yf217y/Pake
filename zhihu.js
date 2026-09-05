// 彻底杜绝调用外部 Chrome 浏览器：
// 动态捕获页面上所有的链接点击，移除 target="_blank"，强制在应用内处理
document.addEventListener('click', function (e) {
  const link = e.target.closest('a');
  if (link && link.href) {
    // 只要是知乎自己的链接（或者相对路径），强行去除 _blank
    if (link.hostname.includes('zhihu.com') || !link.hostname) {
      if (link.target === '_blank') {
        link.removeAttribute('target');
      }
    }
  }
}, true);

// 监听动态加载的内容（信息流滚动），自动把后续渲染出的卡片链接 _blank 全拔掉
const observer = new MutationObserver(mutations => {
  document.querySelectorAll('a[target="_blank"]').forEach(a => {
    if (a.hostname.includes('zhihu.com') || !a.hostname) {
      a.removeAttribute('target');
    }
  });
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});
