const fs = require('fs');

const filePath = 'C:/Users/22670/Desktop/wz4/src/components/Works.tsx';
let content = fs.readFileSync(filePath, 'utf8');

console.log('=== 修复双重前缀 ===\n');

// 修复双重前缀
let count = 0;
content = content.replace(/\/daijiaxuan2026\/daijiaxuan2026\//g, '/daijiaxuan2026/');
console.log('✓ 已修复双重前缀');

fs.writeFileSync(filePath, content, 'utf8');
console.log('\n文件已更新！');
