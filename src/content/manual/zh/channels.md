此选项卡管理连接到应用的各种消息通道（Discord、Slack、Google Chat、Telegram 等）。

![Channels Tab](channels-tab.png)

## 查看通道列表
您可以一目了然地查看所有已连接的通道和每个账户的状态。

- **状态徽章**：显示 `connected`、`disconnected` 或 `error` 等状态。
- **刷新**：点击右上角的刷新按钮以获取最新状态。

## 通道登录（二维码）
您可以启动网页登录以连接特定通道。
在聊天中告诉 AI 形象“Start Discord web login”，它将显示一个二维码，或者在需要时进入身份验证等待状态。

## Discord 机器人集成

在 [naia.nextain.io](https://naia.nextain.io) 使用您的 Discord 账户登录，即可自动关联您的账户。关联后，您可以直接在 Discord 上与 AI 形象聊天。

### 如何使用
1. 在 naia.nextain.io **使用 Discord 登录**
2. 在**设置 > 集成**页面点击机器人邀请链接
3. **选择一个服务器**添加机器人 → 批准权限
4. 在服务器中**@提及机器人**或**开始私聊**进行对话
5. 积分将自动从您的 naia.nextain.io 账户中扣除

### 功能
- **提及/私聊检测**：当您提及机器人或发送私聊时，AI 会做出响应
- **积分集成**：您的 naia.nextain.io 账户中的积分将自动使用
- **未注册用户引导**：未关联账户的用户将收到设置说明
- **速率限制**：每分钟 10 条消息的限制以保护您的积分

## Google Chat 集成

在 naia.nextain.io 使用您的 Google 账户登录，即可通过 Google Chat 与 AI 形象聊天。

### 如何使用
1. 在 naia.nextain.io **使用 Google 登录**
2. Google Workspace 管理员**注册 naia Chat 应用**
3. 在 Google Chat 中添加应用并开始聊天
4. 积分将自动从您的 naia.nextain.io 账户中扣除

## 消息通知（Webhooks）
Naia OS 继承了 OpenClaw 强大的通道系统。
通过在**设置 > 工具 > Webhooks**菜单或初始引导屏幕中输入您的 Slack、Discord 或 Google Chat Webhook URL，AI 形象可以向您发送重要任务结果的消息。

> **提示**：“当此文件备份完全完成时，请在 Discord 上通知我！”

## 高级：构建 24/7 全天候自主机器人
通过利用终端命令工具（`execute_command`），您可以将 AI 形象转变为一个 24/7 全天候自主代理，它不仅存在于您的桌面，还可以驻留在 Telegram 或 Discord 中。

在聊天中这样命令 AI 形象：
> “我的 Telegram 机器人令牌是 `1234:ABC...`。运行 `openclaw channels add --channel telegram --token 1234:ABC...` 来启动我的 Telegram 机器人。”

现在，即使您关闭桌面应用，您也可以随时通过手机上的 Telegram 经由后台 OpenClaw Gateway 与 AI 形象聊天并分配任务。