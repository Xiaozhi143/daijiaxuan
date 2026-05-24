# Vercel 部署指南

## 步骤

### 1. 初始化 Git 仓库
在项目根目录运行：
```bash
git init
git add .
git commit -m "initial commit"
```

### 2. 推送到 GitHub
在 GitHub 上创建一个新的仓库，然后推送代码：
```bash
git remote add origin <你的 GitHub 仓库地址>
git branch -M main
git push -u origin main
```

### 3. 在 Vercel 上部署
1. 访问 [vercel.com](https://vercel.com) 并登录
2. 点击 "New Project"
3. 导入你的 GitHub 仓库
4. 保持默认设置，点击 "Deploy"

### 4. 完成！
部署成功后，你会获得一个链接，可以分享给任何人访问。

## 自动部署
之后每次推送到 main 分支，Vercel 都会自动重新部署！
