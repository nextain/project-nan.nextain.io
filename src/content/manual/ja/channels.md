このタブでは、アプリに接続されている様々なメッセージングチャネル（Discord、Slack, Google Chat, Telegramなど）を管理します。

![Channels Tab](channels-tab.png)

## チャンネルリストの表示
接続されているすべてのチャンネルと、各アカウントのステータスを一目で確認できます。

- **ステータスバッジ**: `connected`、`disconnected`、`error` などの状態を表示します。
- **更新**: 右上にある更新ボタンをクリックして、最新のステータスを取得します。

## チャンネルログイン (QRコード)
特定のチャンネルに接続するためのウェブログインを開始できます。
チャットでAIアバターに「Discordウェブログインを開始して」と指示することで、必要に応じてQRコードを表示したり、認証待機状態に入ったりします。

## Discord Bot連携

[naia.nextain.io](https://naia.nextain.io)でDiscordアカウントにサインインすると、アカウントが自動的にリンクされます。リンクされると、Discord上でAIアバターと直接チャットできます。

### 使用方法
1. naia.nextain.ioで**Discordでサインイン**します
2. **Settings > Integrations**ページにあるボット招待リンクをクリックします
3. ボットを追加する**サーバーを選択** → 権限を承認します
4. サーバーで**ボットに@メンション**するか、**DMを開始**してチャットします
5. クレジットはnaia.nextain.ioアカウントから自動的に引き落とされます

### 機能
- **メンション/DM検出**: ボットにメンションするかDMを送信するとAIが応答します
- **クレジット統合**: naia.nextain.ioアカウントのクレジットが自動的に使用されます
- **未登録ユーザーへの案内**: リンクされていないアカウントのユーザーには設定手順が届きます
- **レート制限**: クレジットを保護するため、1分あたり10メッセージの制限があります

## Google Chat連携

naia.nextain.ioでGoogleアカウントにサインインすると、Google Chatを通じてAIアバターとチャットできます。

### 使用方法
1. naia.nextain.ioで**Googleでサインイン**します
2. Google Workspaceの管理者が**naia Chatアプリを登録**します
3. Google Chatでアプリを追加してチャットを開始します
4. クレジットはnaia.nextain.ioアカウントから自動的に引き落とされます

## メッセンジャー通知 (Webhooks)
Naia OSはOpenClawの強力なチャンネルシステムを継承しています。
Slack、Discord、またはGoogle ChatのWebhook URLを**Settings > Tools > Webhooks**メニュー、または初期オンボーディング画面で入力することで、AIアバターは重要なタスクの結果をメッセージとして送信できます。

> **ヒント:** 「このファイルバックアップが完全に完了したらDiscordで知らせて！」

## 高度な設定: 24時間365日自律ボットを構築する
ターミナルコマンドツール（`execute_command`）を利用することで、AIアバターをデスクトップ上だけでなく、TelegramやDiscordに常駐する24時間365日の自律エージェントに変えることができます。

チャットでAIアバターに次のようにコマンドします。
> 「私のTelegramボットトークンは`1234:ABC...`です。`openclaw channels add --channel telegram --token 1234:ABC...`を実行して私のTelegramボットを開始してください。」

これで、デスクトップアプリを閉じたとしても、バックグラウンドのOpenClaw Gatewayを通じて、いつでも携帯電話のTelegramからAIアバターとチャットしたり、タスクを割り当てたりすることができます。