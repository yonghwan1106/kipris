# PRD: 1인 창업자용 IP 전략 컨설팅 봇

## 1. 프로젝트 개요

### 1.1 프로젝트 목적
- KIPRIS 데이터를 활용한 AI 기반 지식재산권 전략 컨설팅 서비스 개발
- 1인 창업자들이 쉽게 접근할 수 있는 IP 전략 가이드 제공
- 2025년 KIPRIS 활용사례 공모전 출품작

### 1.2 타겟 사용자
- **주 타겟**: 1인 창업자, 예비창업자
- **부 타겟**: 소규모 스타트업, 학생 창업팀
- **페르소나**: 기술적 아이디어는 있지만 IP 전략 경험이 부족한 개인

### 1.3 핵심 가치 제안
- **24시간 접근 가능한 IP 컨설팅**
- **KIPRIS 데이터 기반 객관적 분석**
- **개인 맞춤형 전략 수립**
- **비용 효율적인 솔루션**

## 2. 기술 아키텍처 (Vercel 배포 최적화)

### 2.1 프론트엔드
```
- Framework: Next.js 14 (App Router)
- UI Library: Tailwind CSS + shadcn/ui
- 상태관리: Zustand
- 채팅 UI: react-chat-elements
- 애니메이션: Framer Motion
```

### 2.2 백엔드 (Serverless)
```
- API Routes: Next.js API routes (/api/)
- Runtime: Node.js 18.x (Vercel Functions)
- Claude API 연동: Anthropic SDK
- 파일 생성: jsPDF (클라이언트 사이드)
- 데이터 저장: 로컬 스토리지 + JSON 파일
```

### 2.3 배포 환경
```
- 호스팅: Vercel
- 레포지토리: GitHub
- 자동배포: Git push → Vercel 자동 배포
- 도메인: vercel.app 기본 도메인 사용
- HTTPS: Vercel 자동 제공
```

### 2.4 환경변수 설정
```bash
# .env.local (로컬 개발)
CLAUDE_API_KEY=sk-ant-api03....
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Vercel 환경변수 (프로덕션)
CLAUDE_API_KEY=sk-ant-api03-... (Vercel 대시보드에서 설정)
NEXT_PUBLIC_APP_URL=https://ip-consulting-bot.vercel.app
```

## 3. 프로젝트 구조

### 3.1 폴더 구조
```
ip-consulting-bot/
├── pages/
│   ├── api/
│   │   ├── claude-chat.js        # Claude API 호출
│   │   ├── search-patents.js     # KIPRIS 시뮬레이션
│   │   └── generate-report.js    # PDF 생성
│   ├── _app.js
│   ├── _document.js
│   └── index.js                  # 메인 페이지
├── components/
│   ├── ChatBot/
│   │   ├── ChatInterface.jsx
│   │   ├── MessageBubble.jsx
│   │   └── InputForm.jsx
│   ├── Forms/
│   │   ├── UserInfoForm.jsx
│   │   └── BusinessInfoForm.jsx
│   └── UI/
│       ├── LoadingSpinner.jsx
│       └── ProgressBar.jsx
├── data/
│   ├── mockKiprisData.json       # Mock 특허 데이터
│   └── businessCategories.json   # 업종 분류
├── utils/
│   ├── claudeAPI.js              # Claude API 헬퍼
│   ├── patentMatcher.js          # 특허 매칭 로직
│   └── reportGenerator.js       # PDF 생성 유틸
├── styles/
│   └── globals.css               # Tailwind CSS
├── public/
│   ├── favicon.ico
│   └── assets/
├── .env.local
├── .env.example
├── package.json
├── next.config.js
├── tailwind.config.js
├── vercel.json
└── README.md
```

### 3.2 핵심 컴포넌트 설계

#### 3.2.1 ChatBot Interface
```jsx
// components/ChatBot/ChatInterface.jsx
import { useState, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';

export default function ChatInterface() {
  const { messages, sendMessage, isLoading } = useChat();
  
  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      <ChatHeader />
      <MessageList messages={messages} />
      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
}
```

#### 3.2.2 API Routes
```javascript
// pages/api/claude-chat.js
import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userMessage, context } = req.body;
    
    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: `${context}\n\n사용자 질문: ${userMessage}`
      }]
    });

    res.status(200).json({ 
      response: message.content[0].text,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Claude API Error:', error);
    res.status(500).json({ 
      message: '죄송합니다. 일시적인 오류가 발생했습니다.',
      error: error.message 
    });
  }
}
```

## 4. 기능 요구사항

### 4.1 핵심 기능 (MVP)

#### 4.1.1 사용자 정보 수집
- 창업 분야 선택 (드롭다운)
- 아이디어 설명 (텍스트 에리어)
- 개발 단계 선택 (라디오 버튼)
- 예산 범위 선택 (슬라이더)

#### 4.1.2 KIPRIS 데이터 시뮬레이션
```javascript
// data/mockKiprisData.json 구조
{
  "AI_chatbot": [
    {
      "patentNo": "10-2023-0123456",
      "title": "인공지능 기반 대화형 상담 시스템",
      "applicant": "네이버 주식회사",
      "status": "등록",
      "applicationDate": "2023-03-15",
      "claims": ["자연어 처리", "대화 관리", "학습 알고리즘"],
      "riskLevel": "HIGH",
      "summary": "챗봇 인터페이스를 통한 고객 상담 자동화 시스템"
    }
  ]
}
```

#### 4.1.3 대화형 컨설팅
- 단계별 질문 플로우
- 실시간 AI 응답
- 관련 특허 정보 표시
- 맞춤형 전략 제안

### 4.2 부가 기능

#### 4.2.1 보고서 생성 (클라이언트 사이드)
```javascript
// utils/reportGenerator.js
import jsPDF from 'jspdf';

export function generateIPReport(consultingData) {
  const doc = new jsPDF();
  
  // 헤더
  doc.setFontSize(20);
  doc.text('IP 전략 컨설팅 보고서', 20, 30);
  
  // 사용자 정보
  doc.setFontSize(12);
  doc.text(`창업 분야: ${consultingData.businessField}`, 20, 50);
  doc.text(`아이디어: ${consultingData.idea}`, 20, 60);
  
  // 특허 분석 결과
  doc.text('관련 특허 분석:', 20, 80);
  consultingData.patents.forEach((patent, index) => {
    doc.text(`${index + 1}. ${patent.title}`, 25, 90 + (index * 10));
  });
  
  // AI 조언
  doc.text('AI 컨설팅 조언:', 20, 140);
  const advice = doc.splitTextToSize(consultingData.advice, 170);
  doc.text(advice, 20, 150);
  
  return doc.save('IP전략보고서.pdf');
}
```

## 5. 개발 일정

### 5.1 Phase 1 (1주차): 기반 구축
- [ ] Next.js 프로젝트 생성 및 GitHub 레포 설정
- [ ] Vercel 연동 및 초기 배포 테스트
- [ ] Claude API 연동 테스트
- [ ] 기본 UI 컴포넌트 개발
- [ ] Mock 데이터 50건 수집 및 구조화

### 5.2 Phase 2 (2주차): 핵심 기능 개발
- [ ] 챗봇 인터페이스 완성
- [ ] 특허 검색 및 매칭 로직 구현
- [ ] Claude API 컨설팅 엔진 개발
- [ ] 사용자 플로우 구현
- [ ] 반응형 UI 최적화

### 5.3 Phase 3 (3주차): 완성도 향상
- [ ] PDF 보고서 생성 기능
- [ ] 에러 핸들링 및 로딩 상태 개선
- [ ] SEO 최적화 (메타 태그, OG 이미지)
- [ ] 성능 최적화 및 테스트
- [ ] 프로덕션 배포 및 도메인 설정

## 6. Vercel 배포 최적화

### 6.1 next.config.js 설정
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Vercel 최적화
  experimental: {
    serverComponentsExternalPackages: ['@anthropic-ai/sdk']
  },
  // 환경변수 런타임 체크
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // 정적 자원 최적화
  images: {
    domains: ['example.com'],
    optimized: true
  }
};

module.exports = nextConfig;
```

### 6.2 vercel.json 설정
```json
{
  "functions": {
    "pages/api/*.js": {
      "maxDuration": 30
    }
  },
  "regions": ["icn1"],
  "framework": "nextjs"
}
```

### 6.3 배포 체크리스트
- [ ] GitHub 레포지토리 생성
- [ ] Vercel 계정 연동
- [ ] 환경변수 설정 (CLAUDE_API_KEY)
- [ ] 도메인 연결 (선택사항)
- [ ] SSL 인증서 확인
- [ ] 성능 모니터링 설정

## 7. 사용자 플로우

### 7.1 메인 플로우
```
1. 랜딩 페이지 접속 (/)
2. 시작하기 버튼 클릭
3. 창업 정보 입력 (4단계 폼)
4. 챗봇 상담 시작
5. KIPRIS 데이터 검색 결과 표시
6. Claude AI 맞춤 조언 제공
7. 보고서 생성 및 다운로드
8. 결과 공유 (선택사항)
```

### 7.2 대화 시나리오
```
봇: "안녕하세요! IP 전략 컨설팅 봇입니다. 
    입력해주신 정보를 바탕으로 도움을 드리겠습니다."

사용자: "AI 운동 추천 앱 관련해서 특허 위험이 있을까요?"

봇: "AI 운동 추천 분야의 특허를 검색해보니 15건의 관련 특허가 있네요.
    주요 위험 요소를 분석해드리겠습니다..."

[특허 리스트 표시]

봇: "분석 결과, 중간 수준의 위험도가 예상됩니다. 
    다음과 같은 회피 전략을 추천드립니다..."
```

## 8. 공모전 어필 포인트

### 8.1 KIPRIS 활용도 (적합성 20%)
- 실제 KIPRIS에서 200건의 특허 데이터 수집
- 업종별/기술별 체계적 분류
- 실시간 특허 검색 시뮬레이션
- 특허 데이터 시각화

### 8.2 실제 경험 기반 (충실성 30%)
- 박용환님의 공모전 경험을 AI 프롬프트에 반영
- 실제 1인 창업자 페인 포인트 해결
- 구체적인 활용 전후 비교 사례
- 실무에서 바로 적용 가능한 전략

### 8.3 대중적 접근성 (대중성 30%)
- 전문 지식 없이도 사용 가능한 직관적 UI
- 모바일 반응형 디자인
- 24시간 언제든 접근 가능
- 무료 이용 가능

### 8.4 명확한 표현 (표현성 20%)
- 챗봇 형태의 친숙한 대화형 인터페이스
- 단계별 가이드와 진행 상황 표시
- 시각적 차트 및 인포그래픽
- PDF 보고서로 결과 정리

## 9. 위험 요소 및 대응

### 9.1 기술적 위험
- **Claude API 장애**: 캐시된 응답 및 오프라인 모드 제공
- **Vercel 빌드 실패**: 빌드 로그 모니터링 및 롤백 계획
- **대용량 데이터**: JSON 파일 분할 및 지연 로딩

### 9.2 사용자 경험 위험
- **느린 응답 속도**: 로딩 상태 표시 및 스트리밍 응답
- **모바일 최적화**: 반응형 디자인 우선 개발

### 9.3 공모전 위험
- **차별화 부족**: 1인 창업자 특화 기능으로 포지셔닝
- **기술 시연 실패**: 오프라인 데모 모드 준비

## 10. 성공 지표

### 10.1 개발 완성도
- [ ] 실제 동작하는 프로토타입 (vercel.app 배포)
- [ ] 5개 이상 창업 분야 지원
- [ ] 평균 3분 이내 상담 완료
- [ ] 모바일/데스크톱 호환성 100%

### 10.2 공모전 경쟁력
- [ ] KIPRIS 데이터 200건 이상 활용
- [ ] 실제 사용 가능한 서비스 수준
- [ ] 명확한 사용자 가치 제시
- [ ] 기술적 완성도 및 안정성

## 11. 배포 및 운영

### 11.1 배포 URL
- **개발**: https://ip-consulting-bot-dev.vercel.app
- **프로덕션**: https://ip-consulting-bot.vercel.app

### 11.2 모니터링
- Vercel Analytics 연동
- 에러 로깅 (Sentry 선택사항)
- API 응답 시간 모니터링

### 11.3 유지보수
- GitHub Actions를 통한 자동 테스트
- 정기적인 Claude API 응답 품질 체크
- 사용자 피드백 수집 및 개선

이 PRD를 기반으로 개발을 진행하면 공모전에서 높은 평가를 받을 수 있는 완성도 높은 서비스를 만들 수 있을 것입니다.