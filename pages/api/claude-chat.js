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
        content: `당신은 1인 창업자를 위한 IP 전략 컨설팅 전문가입니다. KIPRIS 데이터를 기반으로 지식재산권 전략을 제안해주세요.

${context ? `컨텍스트: ${context}` : ''}

사용자 질문: ${userMessage}

답변은 다음 형식으로 제공해주세요:
1. 핵심 분석 요약
2. 위험도 평가 (낮음/중간/높음)
3. 구체적인 전략 제안
4. 다음 단계 액션 아이템

친근하고 전문적인 톤으로 답변해주세요.`
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