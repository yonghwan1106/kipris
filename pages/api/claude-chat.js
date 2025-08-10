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
    
    // 컨텍스트에서 특허 정보 파싱
    let patentsInfo = '';
    if (context && context.includes('관련 특허 정보:')) {
      try {
        const patentsData = context.split('관련 특허 정보: ')[1];
        const patents = JSON.parse(patentsData || '[]');
        if (patents.length > 0) {
          patentsInfo = `\n\n검색된 관련 특허 정보:\n${patents.map(p => 
            `- ${p.title} (${p.applicant}, 위험도: ${p.riskLevel})`
          ).join('\n')}`;
        }
      } catch (e) {
        // 파싱 실패 시 무시
      }
    }
    
    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1500,
      messages: [{
        role: 'user',
        content: `당신은 KIPRIS 데이터를 활용한 1인 창업자 전용 IP 전략 컨설팅 전문가입니다.

**사용자 정보:**
${context && context.includes('사용자 정보:') ? context.split('관련 특허 정보:')[0] : '정보 없음'}

**사용자 질문:** ${userMessage}

${patentsInfo}

**답변 형식:**
다음 구조로 전문적이고 실용적인 조언을 제공해주세요:

**🔍 핵심 분석 요약**
- 검색된 특허 현황과 주요 위험 요소

**⚠️ 위험도 평가**
- 🔴 높음 / 🟡 중간 / 🟢 낮음 으로 표시
- 구체적인 위험 근거 설명

**💡 전략 제안**
- 실행 가능한 구체적 방안 3개 이상
- 비용 효율적 접근법 포함

**✅ 다음 단계 액션**
- 체크박스 형태의 실행 항목들

친근하면서도 전문적인 톤으로, 1인 창업자의 관점에서 실질적으로 도움이 되는 조언을 해주세요.`
      }]
    });

    res.status(200).json({ 
      response: message.content[0].text,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Claude API Error:', error);
    
    // API 에러 시 유용한 fallback 메시지 제공
    const fallbackMessage = `**⚠️ 일시적 오류 발생**

죄송합니다. 현재 AI 분석 서비스에 일시적인 문제가 발생했습니다.

**💡 임시 조언:**
- 관련 특허 검색은 정상적으로 완료되었습니다
- 검색된 특허들의 청구범위를 자세히 검토해보세요
- 변리사 상담을 통한 전문적 검토를 권장합니다

**✅ 추천 액션:**
- 특허청 KIPRIS 사이트에서 직접 검색
- 유사 기업의 특허 전략 벤치마킹
- IP 전문가와 상담 일정 잡기

잠시 후 다시 시도해주시거나, 더 구체적인 질문으로 다시 문의해주세요.`;

    res.status(200).json({ 
      response: fallbackMessage,
      timestamp: new Date().toISOString()
    });
  }
}