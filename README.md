# LINE Mini App Monorepo (React + Node.js + PostgreSQL + Redis)

这是一个面向 LINE Mini App 的现代化全家桶开发框架，采用：

- 前端：React + Vite + TypeScript
- 后端：Node.js + Express + TypeScript（MVC）
- 数据：PostgreSQL + Redis
- 部署：Vercel（前端）+ AWS（后端）

## 目录结构

```text
.
├── apps
│   ├── backend
│   │   ├── src
│   │   │   ├── config
│   │   │   ├── controllers
│   │   │   ├── models
│   │   │   ├── repositories
│   │   │   ├── routes
│   │   │   ├── services
│   │   │   ├── middlewares
│   │   │   ├── types
│   │   │   └── app.ts
│   │   └── server.ts
│   └── frontend
│       └── src
│           ├── components
│           ├── pages
│           ├── services
│           ├── hooks
│           └── main.tsx
├── infra
│   ├── docker-compose.yml
│   ├── vercel.json
│   └── aws
│       └── ecs-task-definition.sample.json
└── package.json
```

## 快速开始

1. 安装依赖

```bash
npm install
```

2. 启动数据库（PostgreSQL + Redis）

```bash
docker compose -f infra/docker-compose.yml up -d
```

3. 启动前后端开发服务

```bash
npm run dev
```

## 环境变量

- `apps/backend/.env.example`
- `apps/frontend/.env.example`

复制为 `.env` 后填写对应配置。

## 说明

- 本项目已提供 LINE 登录 token 基础校验流程示例（服务端验证）。
- 你可以在此基础上继续扩展订单、会员、预约等业务模块。
