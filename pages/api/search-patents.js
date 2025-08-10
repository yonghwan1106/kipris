import mockKiprisData from '../../data/mockKiprisData.json';

// 키워드 매칭을 위한 유틸리티 함수
function extractKeywords(text) {
  const keywords = [];
  const lowerText = text.toLowerCase();
  
  // 기술 키워드 매핑
  const keywordMap = {
    'AI': ['ai', '인공지능', '머신러닝', '딥러닝', 'ml', '기계학습'],
    'chatbot': ['챗봇', '대화', '상담', 'chat', 'bot', '채팅'],
    'fitness': ['운동', '헬스', '피트니스', '건강', '웨어러블', '트래킹'],
    'delivery': ['배달', '물류', '경로', '최적화', '배송'],
    'fintech': ['금융', '결제', '투자', '보험', '대출', '핀테크'],
    'ecommerce': ['쇼핑', '이커머스', '온라인몰', '상거래', '결제'],
    'education': ['교육', '학습', '이러닝', '강의', '온라인교육'],
    'healthcare': ['의료', '헬스케어', '진료', '병원', '건강관리'],
    'iot': ['iot', '사물인터넷', '스마트홈', '센서', '연결'],
    'mobility': ['모빌리티', '교통', '자율주행', '차량', '운송']
  };

  // 키워드 매칭
  Object.entries(keywordMap).forEach(([category, synonyms]) => {
    if (synonyms.some(keyword => lowerText.includes(keyword))) {
      keywords.push(category);
    }
  });

  return keywords;
}

// 특허 검색 및 매칭 로직
function searchPatents(query) {
  const keywords = extractKeywords(query);
  let relevantPatents = [];

  // 각 카테고리에서 매칭되는 특허 찾기
  keywords.forEach(keyword => {
    if (keyword === 'AI' || keyword === 'chatbot') {
      relevantPatents.push(...(mockKiprisData.AI_chatbot || []));
    } else if (keyword === 'fitness') {
      relevantPatents.push(...(mockKiprisData.fitness_app || []));
    } else if (keyword === 'delivery') {
      relevantPatents.push(...(mockKiprisData.food_delivery || []));
    }
  });

  // 중복 제거
  const uniquePatents = relevantPatents.filter((patent, index, self) => 
    index === self.findIndex(p => p.patentNo === patent.patentNo)
  );

  // 관련성 점수 계산 및 정렬
  return uniquePatents.map(patent => {
    let relevanceScore = 0;
    const patentText = `${patent.title} ${patent.summary} ${patent.claims.join(' ')}`.toLowerCase();
    
    // 키워드 매칭 점수
    keywords.forEach(keyword => {
      const synonyms = {
        'AI': ['ai', '인공지능', '머신러닝'],
        'chatbot': ['챗봇', '대화', '상담'],
        'fitness': ['운동', '헬스', '피트니스'],
        'delivery': ['배달', '물류', '경로']
      }[keyword] || [keyword];
      
      synonyms.forEach(synonym => {
        if (patentText.includes(synonym)) {
          relevanceScore += 1;
        }
      });
    });

    return { ...patent, relevanceScore };
  }).sort((a, b) => b.relevanceScore - a.relevanceScore);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { query } = req.body;
    
    if (!query || query.trim() === '') {
      return res.status(400).json({ 
        message: '검색어를 입력해주세요.',
        patents: []
      });
    }

    // 특허 검색 실행
    const patents = searchPatents(query);
    
    // 검색 결과 통계
    const stats = {
      total: patents.length,
      highRisk: patents.filter(p => p.riskLevel === 'HIGH').length,
      mediumRisk: patents.filter(p => p.riskLevel === 'MEDIUM').length,
      lowRisk: patents.filter(p => p.riskLevel === 'LOW').length
    };

    res.status(200).json({
      patents: patents.slice(0, 10), // 최대 10개까지만 반환
      stats,
      query,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Patent search error:', error);
    res.status(500).json({ 
      message: '특허 검색 중 오류가 발생했습니다.',
      error: error.message 
    });
  }
}