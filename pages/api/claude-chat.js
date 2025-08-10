import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

// Mock 응답 데이터
const mockResponses = {
  'AI': `**🤖 AI/챗봇 서비스 IP 분석 결과**

**1. 핵심 분석 요약**
- 검색된 관련 특허: 2건
- 주요 위험 요소: 자연어 처리, 대화 관리 시스템
- 네이버, 삼성전자 등 대기업의 핵심 특허 존재

**2. 위험도 평가: 🔴 높음**
- 네이버의 "인공지능 기반 대화형 상담 시스템" 특허(HIGH)
- 유사한 기술 구현 시 침해 위험 존재

**3. 구체적인 전략 제안**
- 차별화된 접근 방식 개발 (예: 특정 도메인 특화)
- 기존 특허와 다른 알고리즘 방식 채택
- 오픈소스 기술 활용으로 개발 비용 절감

**4. 다음 단계 액션 아이템**
✅ 더 상세한 특허 청구범위 분석
✅ 변리사 상담을 통한 침해성 검토
✅ 자체 특허 출원 가능성 검토`,

  'fitness': `**💪 피트니스 앱 IP 분석 결과**

**1. 핵심 분석 요약**
- 검색된 관련 특허: 2건
- 주요 영역: AI 맞춤형 추천, 웨어러블 연동
- 한국스포츠과학원, LG전자의 관련 특허 존재

**2. 위험도 평가: 🟡 중간**
- 일반적인 운동 추천은 특허 위험 낮음
- 웨어러블 기기 연동 부분에서 주의 필요

**3. 구체적인 전략 제안**
- 기존과 다른 데이터 분석 방식 개발
- 소셜 기능, 게임화 요소로 차별화
- 공개된 헬스 API 적극 활용

**4. 다음 단계 액션 아이템**
✅ 웨어러블 기기 제조사와 파트너십 검토
✅ 개인정보보호 관련 법률 검토
✅ 사용자 데이터 수집 방식 특허 검토`,

  'delivery': `**🚚 음식 배달 서비스 IP 분석 결과**

**1. 핵심 분석 요약**
- 검색된 관련 특허: 1건
- 배달의민족의 "실시간 배달 경로 최적화" 특허 존재
- 경로 최적화 알고리즘이 핵심 쟁점

**2. 위험도 평가: 🔴 높음**
- 기존 플랫폼의 강력한 특허 포트폴리오
- 진입 장벽이 상당히 높은 분야

**3. 구체적인 전략 제안**
- 틈새 시장 공략 (예: 특수 음식, 지역 특화)
- B2B 솔루션으로 방향 전환 검토
- 다른 방식의 매칭 알고리즘 개발

**4. 다음 단계 액션 아이템**
✅ 기존 플레이어와의 차별점 명확화
✅ 라이선스 협상 가능성 검토
✅ 대안적 비즈니스 모델 검토`,

  'default': `**📋 IP 전략 컨설팅 결과**

**1. 핵심 분석 요약**
- 귀하의 창업 아이디어에 대한 초기 분석을 완료했습니다.
- 관련 특허 검색 및 위험도 평가를 진행했습니다.

**2. 위험도 평가: 🟡 중간**
- 일반적인 수준의 특허 위험이 예상됩니다.
- 추가적인 상세 분석이 필요합니다.

**3. 구체적인 전략 제안**
- 기존 기술과의 차별화 방안 모색
- 오픈소스 기술 활용 검토
- 단계적 개발 및 테스트 진행

**4. 다음 단계 액션 아이템**
✅ 더 구체적인 기술 스펙 정의
✅ 경쟁사 분석 심화
✅ IP 전문가 상담 예약`
};

function getMockResponse(userMessage, patents) {
  const message = userMessage.toLowerCase();
  
  if (message.includes('ai') || message.includes('챗봇') || message.includes('인공지능')) {
    return mockResponses['AI'];
  } else if (message.includes('운동') || message.includes('피트니스') || message.includes('헬스')) {
    return mockResponses['fitness'];
  } else if (message.includes('배달') || message.includes('음식')) {
    return mockResponses['delivery'];
  } else {
    return mockResponses['default'];
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userMessage, context } = req.body;
    
    // 컨텍스트에서 특허 정보 추출
    let patents = [];
    if (context) {
      try {
        const contextObj = JSON.parse(context.split('관련 특허 정보: ')[1] || '[]');
        patents = contextObj;
      } catch (e) {
        // 파싱 실패시 빈 배열
      }
    }

    // Claude API 대신 Mock 응답 사용
    const mockResponse = getMockResponse(userMessage, patents);
    
    res.status(200).json({ 
      response: mockResponse,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Mock API Error:', error);
    res.status(500).json({ 
      message: '죄송합니다. 일시적인 오류가 발생했습니다.',
      error: error.message 
    });
  }
}