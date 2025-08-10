# KIPRIS IP 전략 컨설팅 봇

1인 창업자를 위한 AI 기반 지식재산권 전략 컨설팅 서비스입니다.

## 🚀 주요 기능

- **KIPRIS 데이터 기반 특허 검색**: 실시간으로 관련 특허를 검색하고 위험도를 분석
- **Claude AI 컨설팅**: AI가 제공하는 맞춤형 IP 전략 조언
- **대화형 인터페이스**: 직관적인 챗봇 형태의 컨설팅 경험
- **PDF 보고서 생성**: 상담 내용을 정리한 전문 보고서 다운로드
- **단계별 사용자 폼**: 창업 정보를 체계적으로 수집

## 🛠 기술 스택

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **AI**: Claude 3 Haiku (Anthropic API)
- **PDF 생성**: jsPDF
- **배포**: Vercel
- **데이터**: Mock KIPRIS 특허 데이터

## 📦 설치 및 실행

### 1. 저장소 클론
\`\`\`bash
git clone <repository-url>
cd kipris-ip-consulting-bot
\`\`\`

### 2. 의존성 설치
\`\`\`bash
npm install
\`\`\`

### 3. 환경변수 설정
\`.env.local\` 파일을 생성하고 다음 내용을 추가:

\`\`\`
CLAUDE_API_KEY=your_claude_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### 4. 개발 서버 실행
\`\`\`bash
npm run dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 🏗 프로젝트 구조

\`\`\`
kipris-ip-consulting-bot/
├── components/
│   ├── ChatBot/          # 채팅 인터페이스
│   ├── Forms/            # 사용자 입력 폼
│   └── UI/               # 공통 UI 컴포넌트
├── pages/
│   ├── api/              # API 라우트
│   ├── _app.js
│   ├── _document.js
│   └── index.js          # 메인 페이지
├── data/                 # Mock 데이터
├── utils/                # 유틸리티 함수
├── styles/               # 스타일시트
└── public/               # 정적 파일
\`\`\`

## 📝 주요 API

### `/api/claude-chat`
- Claude AI와의 대화 처리
- POST 요청으로 사용자 메시지 전송
- 컨텍스트 기반 맞춤형 응답 제공

### `/api/search-patents`
- KIPRIS 데이터에서 특허 검색
- 키워드 기반 매칭 및 위험도 분석
- 관련성 점수에 따른 정렬

## 🎯 사용 가이드

1. **홈페이지에서 시작**: "IP 컨설팅 시작하기" 또는 "바로 시작하기" 선택
2. **정보 입력**: 창업 분야, 아이디어, 개발 단계 등 입력 (선택사항)
3. **AI 상담**: 챗봇과 대화하며 IP 전략 상담 받기
4. **특허 분석**: 관련 특허 자동 검색 및 위험도 확인
5. **보고서 다운로드**: 상담 내용을 PDF로 저장

## 🚀 배포 (Vercel)

### 1. GitHub 연동
\`\`\`bash
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

### 2. Vercel 배포
1. [Vercel](https://vercel.com)에서 프로젝트 import
2. 환경변수 설정: `CLAUDE_API_KEY`
3. 자동 배포 완료

## 🏆 2025 KIPRIS 활용사례 공모전

이 프로젝트는 2025년 KIPRIS 활용사례 공모전을 위해 개발되었습니다.

### 어필 포인트
- **적합성**: KIPRIS 특허 데이터 200건+ 활용
- **충실성**: 실제 1인 창업자 페인포인트 해결
- **대중성**: 전문지식 없이도 사용 가능한 직관적 UI
- **표현성**: 대화형 인터페이스와 시각적 결과 제공

## 📄 라이선스

MIT License

## 🤝 기여하기

1. Fork the project
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📧 문의

프로젝트에 대한 문의나 제안사항이 있으시면 이슈를 생성해주세요.