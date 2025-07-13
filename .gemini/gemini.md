# Gemini Project - WebFont Metric Check

## 📌 프로젝트 개요

웹폰트를 시각적으로 비교하고, 정렬과 크기 차이를 확인할 수 있는 개발자용 툴입니다.  
디자이너와 프론트엔드 개발자가 웹폰트의 메트릭 중심선, normal/italic 스타일 정렬 문제, 패밀리 간 크기 차이 등을 빠르게 테스트할 수 있도록 설계되었습니다.  
[🔗 프로젝트 링크](https://webfont-metric-check.vercel.app/)

---

## 🚀 주요 기능

### 1. Alignment Check

- **설명:**  
  하나의 웹폰트를 다양한 weight(100~900), style(normal/italic)으로 시각화하며 baseline/center alignment 상태를 체크하는 도구.

- **입력 요소:**

  - `font-family` (입력)
  - `import URL` (웹폰트 CSS 주소)
  - `font-size`, `line-height` 조정
  - `clip to rect` 옵션 (글자 영역 클리핑)
  - `background color` 표시 여부
  - `italic 표시` on/off
  - `baseline 또는 centerline` 확인용 가이드 라인 표시

- **기능 요약:**
  - 폰트의 중심 정렬 상태 시각화
  - weight별 시각 비교
  - 스타일 일관성 테스트

---

### 2. Size Comparison

- **설명:**  
  서로 다른 두 폰트(예: `Noto Sans`, `Pretendard`)를 같은 `font-size`로 설정했을 때 시각적으로 크기가 얼마나 다른지를 비교.

- **입력 요소:**

  - `Font1`, `Font2`: 각 폰트의 CSS import URL
  - 각각의 `font-family`, `sample text` 지정
  - `font-size`, `line-height` 조정
  - `italic 보기`, `중앙선`, `배경` on/off 가능

- **기능 요약:**
  - 서로 다른 폰트 간의 시각적 크기 차이 확인
  - 실무에서 Sans 계열 혼용 시 시각 오차 점검

---

## 🔧 사용 기술

- **프론트엔드**: React, Tailwind CSS, Vite
- **배포**: Vercel
- **폰트 로딩**: `@import` 방식의 웹폰트 URL 처리
- **기타**: 중앙선 계산 및 CSS 메트릭 시각화 커스터마이징

---

## 🧠 향후 추가 고려사항

- 폰트 로딩 실패 시 fallback 메시지 또는 로딩 indicator
- 시스템 폰트도 비교할 수 있는 local font 지원
- 커스텀 텍스트 길이에 따른 auto resize 대응
- 이미지 export (png, svg) 기능
- URL 파라미터 기반 공유 기능

---

## 📝 테스트 시나리오

- [ ] 다양한 weight 조합으로 한눈에 시각 확인 가능한가?
- [ ] italic 스타일에서 baseline이 일치하는가?
- [ ] line-height가 다를 때 중심선이 안정적으로 보이는가?
- [ ] Font1/Font2를 바꿔서도 시각 오차가 정확히 드러나는가?
- [ ] import한 웹폰트가 실제 화면에 정확히 적용되는가?

---

## 🚀 Recent Updates (2025-07-13)

- **FontDisplay 컴포넌트:** 최상위 `div`에 `overflow-hidden` 클래스 추가하여 모바일 가로 스크롤 문제 해결.
- **Line Height 입력 필드:** `AlignmentCheckPage.jsx` 및 `SizeComparisonPage.jsx`에서 `lineHeight` 입력 필드의 `step` 속성을 `0.01`로 변경하여 0.01 단위 조절 가능하도록 개선.
- **Font URL 입력 필드 개선:**
  - `@import url(...)` 형식을 시각적으로 표시하여 사용자 이해도 향상.
  - 사용자가 입력하는 URL에서 따옴표(`'` 또는 `"`)를 자동으로 제거하도록 로직 추가.
  - `FontUrlInput.jsx` 컴포넌트로 분리하여 재사용성 및 유지보수성 개선.
  - `@import url()` 부분이 줄바꿈되지 않도록 `whitespace-nowrap` 스타일 적용.

---

## 🧭 관련 문서 / 링크

- [Google Fonts](https://fonts.google.com/)
- [Font Metrics 설명](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height)
- [Typography line metrics tool](https://capsize.dev/)

---

> Last updated: 2025-07-13
