# 작업 계획: Tailwind CSS 설정 오류 수정 및 Hero 배경 구현

## 1. 문제 분석

`globals.css` 파일 수정 후 `CssSyntaxError: Cannot apply unknown utility class 'border-border'` 오류가 발생했습니다. 이는 Tailwind CSS가 `border-border`와 같은 커스텀 유틸리티 클래스를 인식하지 못하기 때문입니다. 원인은 `tailwind.config.ts` 파일이 없거나, 있더라도 `shadcn/ui`에서 사용하는 CSS 변수(`--border` 등)를 Tailwind 테마 색상으로 확장하는 설정이 누락되었기 때문입니다.

## 2. 해결 전략

표준적인 `tailwind.config.ts` 파일을 생성하여 문제를 해결합니다.

1.  **`postcss.config.mjs` 확인**: 현재 Tailwind CSS 설정이 어떻게 되어있는지 확인하기 위해 `postcss.config.mjs` 파일을 읽습니다.
2.  **`tailwind.config.ts` 생성**: `shadcn/ui` 스타일에 맞는 표준 `tailwind.config.ts` 파일을 생성합니다. 이 파일에는 `globals.css`에 정의된 모든 CSS 변수(e.g., `--background`, `--foreground`, `--border`)를 Tailwind 테마로 확장하는 코드가 포함됩니다.
3.  **`postcss.config.mjs` 수정 (필요 시)**: `postcss.config.mjs`가 새로 생성된 `tailwind.config.ts` 파일을 참조하도록 수정합니다.
4.  **`globals.css` 재수정**: Tailwind 설정을 고친 후, 기존에 실패했던 `globals.css`의 v3 지시문을 v4 문법(`@import`)으로 다시 수정합니다.
5.  **Hero 컴포넌트 수정**: 원래 계획대로 `src/components/home/hero.tsx` 파일에 `globe.svg`를 사용한 애니메이션 배경을 추가합니다.
6.  **검증**: 개발 서버를 실행하여 로고, 배경 애니메이션, 그리고 전체적인 스타일이 정상적으로 표시되는지 확인합니다.

## 3. 작업 진행률

- [ ] `postcss.config.mjs` 파일 읽기
- [ ] `tailwind.config.ts` 파일 작성
- [ ] `postcss.config.mjs` 파일 수정 (필요 시)
- [ ] `globals.css` 파일 재수정
- [ ] `src/components/home/hero.tsx` 파일 수정
- [ ] 최종 결과 확인
