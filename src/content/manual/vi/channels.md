Tab này quản lý các kênh nhắn tin khác nhau được kết nối với ứng dụng (Discord, Slack, Google Chat, Telegram, v.v.).

![Channels Tab](channels-tab.png)

## Xem Danh Sách Kênh
Bạn có thể xem tất cả các kênh đã kết nối và trạng thái của từng tài khoản một cách nhanh chóng.

- **Thẻ Trạng Thái**: Hiển thị các trạng thái như `connected`, `disconnected`, hoặc `error`.
- **Làm Mới**: Nhấp vào nút làm mới ở trên cùng bên phải để nhận trạng thái mới nhất.

## Đăng Nhập Kênh (Mã QR)
Bạn có thể bắt đầu đăng nhập web để kết nối một kênh cụ thể.
Bằng cách nói với hình đại diện AI trong cuộc trò chuyện, "Start Discord web login," nó sẽ hiển thị mã QR hoặc chuyển sang trạng thái chờ xác thực nếu được yêu cầu.

## Tích Hợp Bot Discord

Đăng nhập bằng tài khoản Discord của bạn tại [naia.nextain.io](https://naia.nextain.io) để tự động liên kết tài khoản của bạn. Sau khi liên kết, bạn có thể trò chuyện trực tiếp với hình đại diện AI trên Discord.

### Cách Sử Dụng
1. **Đăng nhập bằng Discord** tại naia.nextain.io
2. Nhấp vào liên kết mời bot trên trang **Cài đặt > Tích hợp**
3. **Chọn một máy chủ** để thêm bot → phê duyệt quyền
4. **@tag bot** trong máy chủ hoặc **bắt đầu một cuộc trò chuyện riêng (DM)** để trò chuyện
5. Tín dụng sẽ tự động được trừ từ tài khoản naia.nextain.io của bạn

### Tính Năng
- **Phát hiện @tag/DM**: AI phản hồi khi bạn @tag bot hoặc gửi tin nhắn riêng (DM)
- **Tích hợp tín dụng**: Tín dụng từ tài khoản naia.nextain.io của bạn được sử dụng tự động
- **Hướng dẫn người dùng chưa đăng ký**: Người dùng chưa có tài khoản liên kết sẽ nhận được hướng dẫn thiết lập
- **Giới hạn tốc độ**: Giới hạn 10 tin nhắn mỗi phút để bảo vệ tín dụng của bạn

## Tích Hợp Google Chat

Đăng nhập bằng tài khoản Google của bạn tại naia.nextain.io để trò chuyện với hình đại diện AI thông qua Google Chat.

### Cách Sử Dụng
1. **Đăng nhập bằng Google** tại naia.nextain.io
2. Quản trị viên Google Workspace **đăng ký ứng dụng naia Chat**
3. Thêm ứng dụng vào Google Chat và bắt đầu trò chuyện
4. Tín dụng sẽ tự động được trừ từ tài khoản naia.nextain.io của bạn

## Thông Báo Messenger (Webhooks)
Naia OS kế thừa hệ thống kênh mạnh mẽ của OpenClaw.
Bằng cách nhập URL Webhook của Slack, Discord hoặc Google Chat của bạn vào menu **Cài đặt > Công cụ > Webhooks** hoặc trong màn hình giới thiệu ban đầu, hình đại diện AI có thể gửi cho bạn tin nhắn với kết quả của các tác vụ quan trọng.

> **Mẹo:** "Let me know on Discord when this file backup is completely finished!"

## Nâng Cao: Xây Dựng Bot Tự Trị 24/7
Bằng cách sử dụng công cụ lệnh terminal (`execute_command`), bạn có thể biến hình đại diện AI thành một tác nhân tự trị 24/7 cư trú trong Telegram hoặc Discord, vượt ra ngoài máy tính để bàn của bạn.

Ra lệnh cho hình đại diện AI trong cuộc trò chuyện như sau:
> "My Telegram bot token is `1234:ABC...`. Run `openclaw channels add --channel telegram --token 1234:ABC...` to start my Telegram bot."

Giờ đây, ngay cả khi bạn đóng ứng dụng máy tính để bàn, bạn vẫn có thể trò chuyện với hình đại diện AI và giao nhiệm vụ bất cứ lúc nào thông qua Telegram trên điện thoại của bạn qua OpenClaw Gateway chạy nền.