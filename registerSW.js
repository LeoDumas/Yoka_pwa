if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/Yoka_pwa/sw.js', { scope: '/Yoka_pwa/' })})}