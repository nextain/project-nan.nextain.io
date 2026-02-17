# 로컬 Gateway 개발 환경

## 사전 요구

```bash
# Bazzite/Fedora Atomic
rpm-ostree install docker-ce docker-compose-plugin
# 또는
sudo dnf install podman podman-compose
```

## 시작

```bash
# 1. Gateway 시작
cd docker
docker compose up -d

# 2. Health check
curl http://localhost:8000/health
# {"status": "healthy"}

# 3. FREE budget 생성 (월 $1, 30일)
export GATEWAY_MASTER_KEY="dev-master-key-change-in-production"
curl -X POST http://localhost:8000/v1/budgets \
  -H "X-AnyLLM-Key: Bearer ${GATEWAY_MASTER_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"max_budget": 1.0, "budget_duration_sec": 2592000}'
# → budget_id를 .env.local의 FREE_BUDGET_ID에 설정

# 4. Next.js 개발 서버
cd ..
cp .env.local.example .env.local
# .env.local 편집 (OAuth 키, FREE_BUDGET_ID 등)
npm run dev
```

## 테스트 순서

1. `http://localhost:3000` → 로그인 → Google OAuth
2. 대시보드 → 크레딧 0 / 사용 내역 없음 확인
3. 설정 → 데스크톱 키 발급 테스트
4. Gateway에서 직접 chat completions 테스트:
   ```bash
   curl -X POST http://localhost:8000/v1/chat/completions \
     -H "X-AnyLLM-Key: Bearer ${GATEWAY_MASTER_KEY}" \
     -H "Content-Type: application/json" \
     -d '{"model": "google_genai:gemini-2.5-flash", "messages": [{"role": "user", "content": "hello"}], "user": "google:12345"}'
   ```
5. 대시보드에서 사용량 반영 확인

## 종료

```bash
cd docker
docker compose down
# 데이터 유지. 완전 삭제: docker compose down -v
```
