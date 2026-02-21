# 매뉴얼 및 문서 다국어 번역 워크플로우

이 문서는 `.agents/workflows/translation.yaml`의 1:1 한국어 미러링입니다.

## 개요
Gemini 2.5 Flash 모델을 활용하여 다국어 매뉴얼이나 문서를 대량으로 번역하기 위한 절차입니다. Gemini CLI의 내장 서브에이전트 기능은 특정 모델(`gemini-2.5-flash`)을 강제할 수 없으므로, **반드시 Node.js 스크립트를 작성하여 번역을 수행**해야 합니다.

## 단계별 실행 방법

1. **환경 설정 (Setup)**
   - `@google/generative-ai` 및 `dotenv` 패키지가 설치되어 있는지 확인합니다. 임시 작업일 경우 `npm install ... --no-save`로 설치합니다.
   - 프로젝트 `.env` 파일에 `GEMINI_API_KEY`가 올바르게 설정되어 있어야 합니다. (필요 시 `naia-os/shell/.env` 등에서 가져와 설정)

2. **스크립트 작성 (Create Script)**
   - `gemini-2.5-flash` 모델을 사용하는 Node.js 번역 스크립트를 작성합니다.
   - 대상 언어(Target Locales) 목록과 입력 폴더(en), 출력 폴더 구조를 지정합니다.

3. **프롬프트 정의 (Define Prompt)**
   - 전문 기술 번역가(professional technical translator)로 역할을 부여합니다.
   - 마크다운 양식(링크, 볼드체, 목록 등)을 엄격히 유지하도록 지시합니다.
   - 고유명사 (예: `Naia OS`, `Nextain`, `Next AI Networks`, `API Key`) 및 코드 블록 등은 번역하지 않도록 명시합니다.

4. **번역 실행 (Execute)**
   - 파일들을 순회하며 대상 언어별로 `model.generateContent()`를 호출합니다.
   - 응답 결과에 코드 블록(` ```markdown `) 래퍼가 포함되어 있다면, 이를 스크립트 단에서 제거(cleanMarkdown)하고 파일로 저장합니다.
   - 이미 파일이 존재하는 경우 스킵하도록 처리합니다.

5. **속도 제한 관리 (Rate Limit)**
   - 각 API 호출 사이에 적절한 지연 시간(예: 1~2초)을 두고, 오류 발생 시 재시도(Retry)하는 로직을 포함하여 API 호출 제한(Rate Limit)을 회피합니다.

## 주의 사항
- ⚠️ CLI에 내장된 서브에이전트(`codebase_investigator` 등)에게 대량 번역을 위임하지 마세요. 이들은 특정 모델로 강제 전환되지 않습니다.
- ⚠️ 대량 번역은 API 호출 비용과 횟수에 주의하여, 꼭 Node.js의 공식 SDK 스크립트를 통해서만 진행해야 합니다.
