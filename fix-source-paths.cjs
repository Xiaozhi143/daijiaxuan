const fs = require('fs');

const srcDir = 'C:/Users/22670/Desktop/wz4/src';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  const replacements = [
    { from: '"/photo.png"', to: '"/daijiaxuan2026/photo.png"' },
    { from: '"/mori/', to: '"/daijiaxuan2026/mori/' },
    { from: '"/kid/', to: '"/daijiaxuan2026/kid/' },
    { from: '"/car/', to: '"/daijiaxuan2026/car/' },
    { from: '"/mf/', to: '"/daijiaxuan2026/mf/' },
    { from: '"/eater/', to: '"/daijiaxuan2026/eater/' },
    { from: '"/xiang/', to: '"/daijiaxuan2026/xiang/' },
    { from: 'src="/', to: 'src="/daijiaxuan2026/' },
    { from: "src='/", to: "src='/daijiaxuan2026/" },
    { from: 'poster="/', to: 'poster="/daijiaxuan2026/' },
  ];
  
  replacements.forEach(r => {
    const count = (content.match(new RegExp(r.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    if (count > 0) {
      content = content.replace(new RegExp(r.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), r.to);
      console.log(`  ✓ ${r.from} -> ${r.to} (${count}个)`);
      modified = true;
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = `${dir}/${file}`;
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
      console.log(`处理文件: ${filePath}`);
      if (processFile(filePath)) {
        console.log(`  ✓ 已更新`);
      }
    }
  });
}

console.log('=== 批量修复源代码中的资源路径 ===\n');
walkDir(srcDir);
console.log('\n=== 完成 ===');
