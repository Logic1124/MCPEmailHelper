# MCP Personal Assistant

这是一个基于 Node.js 的个人助手服务项目。

## 环境要求

- Node.js (建议使用最新的 LTS 版本)
- npm 或 yarn

## 安装步骤

1. 克隆项目到本地

```bash
git clone <项目地址>
cd <项目目录>
```

2. 安装依赖

```bash
npm install
# 或
yarn install
```

3. 配置环境变量
   在项目根目录创建 `.env` 文件，添加必要的环境变量：

```env
# 示例环境变量
PORT=3000
NODE_ENV=development
# 添加其他必要的环境变量
```

## 构建项目

```bash
npm run build
# 或
yarn build
```

构建后的文件将位于 `build` 目录下。

## 配置 MCP 服务器

```json
{
  "mcpServers": {
    "personal-assistant": {
      "command": "node",
      "args": ["<项目build目录的绝对路径>/index.js"]
    }
  }
}
```

请确保将上述配置中的路径替换为你实际的项目路径。

## 运行服务

配置完成后，服务将 MCP 客户端自启动和管理

## 注意事项

- 确保所有必要的环境变量都已正确配置
- 确保 build 目录下的文件具有正确的执行权限
- 如遇到权限相关问题，可能需要执行：
  ```bash
  chmod +x build/index.js
  ```

## 故障排除

如果遇到服务无法启动的问题，请检查：

1. 环境变量是否正确配置
2. json 文件中的路径是否正确
3. Node.js 是否正确安装
4. 项目依赖是否完整安装
