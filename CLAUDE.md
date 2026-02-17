# lab.cafelua.com

Cafelua 서비스 포털. OAuth 로그인 + 크레딧 대시보드 + any-llm gateway 연동.

## 필수 읽기 (세션 시작 시)

1. `.agents/context/agents-rules.json` — 프로젝트 핵심 규칙 (SoT)
2. `.agents/context/project-index.yaml` — 컨텍스트 인덱스 + 미러링 규칙

## Dual-directory (컨텍스트 구조)

```
.agents/                    # AI용 (영어, JSON/YAML, 토큰 최적화)
├── context/
│   ├── agents-rules.json   # SoT ← 필수 읽기
│   └── project-index.yaml  # 인덱스 ← 필수 읽기
└── workflows/
    └── development-cycle.yaml  # 코딩 전 필수

.users/                     # 사람용 (한국어, Markdown, 상세)
├── context/
│   └── agents-rules.md     # 규칙 상세 (미러)
└── workflows/
    └── development-cycle.md
```

## 프로젝트 구조

```
src/
├── app/                # Next.js App Router pages
│   ├── page.tsx        # Landing
│   ├── login/          # OAuth login
│   ├── dashboard/      # Credit dashboard
│   ├── settings/       # Profile, API keys
│   ├── callback/       # Desktop deep link redirect
│   └── api/            # API Routes (BFF)
│       └── auth/       # NextAuth + gateway sync
├── components/         # Shared UI components
├── lib/                # Utilities, gateway client, types
└── styles/             # Global styles
```

## 핵심 원칙

1. **얇은 클라이언트** — 실제 로직은 gateway(any-llm)에, 여기는 UI만
2. **BFF 패턴** — API Routes로 gateway 프록시 (클라이언트에 키 노출 방지)
3. **데스크톱 연동** — `/callback` 페이지로 cafelua-os에 토큰 전달

## 컨벤션 (요약)

- **한국어 응답**
- **커밋**: 영어, `<type>(<scope>): <description>`
- **TDD**: Integration-first (Vitest + React Testing Library)
- **패키지 매니저**: npm

## 개발 사이클

**코딩 전 반드시 읽기:** `.agents/workflows/development-cycle.yaml`

```
PLAN → CHECK → BUILD → VERIFY → CLEAN → COMMIT
```

## 작업 로그

- **위치**: `work-logs/`
- **형식**: `YYYYMMDD-{번호}-{주제}.md`
- **언어**: 한국어

## 주요 명령어

```bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드
npm run lint         # 린트
npm test             # 테스트
```
