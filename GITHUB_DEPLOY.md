# GitHub 部署指南

## 问题说明
您的项目中有大视频文件：
- `eater/eater.mp4` - 310MB
- `eater/sp.mp4` - 65MB

GitHub 单个文件限制为 100MB，超过会被拒绝。

---

## 方案一：使用 Git LFS（推荐，最简单）

Git LFS (Large File Storage) 是 GitHub 官方的大文件管理方案。

### 步骤 1：安装 Git LFS
1. 下载并安装 Git LFS：https://git-lfs.com/
2. 安装后，在项目目录运行：
```bash
git lfs install
```

### 步骤 2：跟踪大文件
```bash
git lfs track "*.mp4"
git lfs track "*.zip"
git lfs track "*.pdf"
```

### 步骤 3：初始化 Git 仓库
```bash
git init
git add .
git commit -m "Initial commit with Git LFS"
```

### 步骤 4：创建 GitHub 仓库
1. 访问 https://github.com/new
2. 创建一个新仓库（不要初始化 README）
3. 复制仓库地址

### 步骤 5：推送到 GitHub
```bash
git remote add origin https://github.com/你的用户名/仓库名.git
git branch -M main
git push -u origin main
```

### 步骤 6：启用 GitHub Pages
1. 进入 GitHub 仓库的 `Settings`
2. 点击左侧的 `Pages`
3. 在 `Build and deployment` 下：
   - Source: 选择 `Deploy from a branch`
   - Branch: 选择 `main` 分支，文件夹选择 `/ (root)`
4. 点击 `Save`
5. 几分钟后，您的网站就可以通过 `https://你的用户名.github.io/仓库名/` 访问了！

---

## 方案二：大文件外置（如果 LFS 不适用）

将大视频文件放在阿里云 OSS 或其他云存储上，只上传代码到 GitHub。

### 修改代码
在 [Works.tsx](src/components/Works.tsx) 中，将视频路径改为云存储地址：
```typescript
// 从：
'/eater/sp.mp4'
// 改为：
'https://your-oss-url.com/eater/sp.mp4'
```

### 更新 .gitignore
在 `.gitignore` 中添加：
```
*.mp4
```

---

## 方案三：使用 Vercel（最简单，推荐！）

Vercel 对大文件更友好，部署也更简单。

### 步骤：
1. 按照方案一的步骤 1-5 推送到 GitHub
2. 访问 https://vercel.com 并登录
3. 点击 "New Project"
4. 导入您的 GitHub 仓库
5. 保持默认设置，点击 "Deploy"
6. 完成！您会获得一个类似 `https://项目名.vercel.app` 的链接

---

## 注意事项

⚠️ **Git LFS 注意事项：**
- GitHub 免费版有 1GB LFS 存储和 1GB/月带宽限制
- 超出需要付费：https://github.com/pricing

💡 **建议：**
- 如果视频不是必须的，可以考虑压缩或移除
- 或者使用方案三（Vercel），它更适合这种项目
- 如果一定要用 GitHub Pages，确保配置正确

---

## 需要帮助？
如果遇到问题，随时问我！
