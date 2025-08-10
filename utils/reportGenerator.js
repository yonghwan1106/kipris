import jsPDF from 'jspdf';

// 한글 지원을 위한 유틸리티 함수들
const convertToEnglish = (koreanText) => {
  const translations = {
    // 사용자 정보
    '이름': 'Name',
    '닉네임': 'Nickname', 
    '창업 분야': 'Business Field',
    '개발 단계': 'Development Stage',
    '아이디어': 'Business Idea',
    '예산': 'Budget',
    
    // 특허 정보
    '특허번호': 'Patent No',
    '출원인': 'Applicant',
    '상태': 'Status', 
    '위험도': 'Risk Level',
    '요약': 'Summary',
    '등록': 'Registered',
    '심사중': 'Under Review',
    
    // 위험도
    'HIGH': 'HIGH RISK',
    'MEDIUM': 'MEDIUM RISK', 
    'LOW': 'LOW RISK',
    
    // 기타
    '날짜': 'Date',
    '특허 분석 결과': 'Patent Analysis Results',
    '총 특허 수': 'Total Patents Found',
    'AI 컨설팅 조언': 'AI Consulting Advice',
    '추천 전략 요약': 'Recommended IP Strategy',
    '질문': 'Question',
    '답변': 'Answer'
  };
  
  let result = koreanText;
  Object.entries(translations).forEach(([korean, english]) => {
    result = result.replace(new RegExp(korean, 'g'), english);
  });
  
  return result;
};

const extractKeyContent = (text) => {
  // 마크다운 문법 제거
  let cleaned = text
    .replace(/\*\*(.*?)\*\*/g, '$1')  // **bold** 제거
    .replace(/\*(.*?)\*/g, '$1')     // *italic* 제거
    .replace(/#{1,6}\s/g, '')        // # 제거
    .replace(/- /g, '• ')            // 리스트 마커 변경
    .replace(/✅/g, '√')             // 체크 마크
    .replace(/🔍|🤖|💡|⚠️|📋|🚀|💪|🚚/g, '') // 이모지 제거
    .replace(/\n\n+/g, '\n\n');      // 여러 줄바꿈 정리
  
  return cleaned.trim();
};

export function generateIPReport(consultingData) {
  const doc = new jsPDF();
  doc.setFont('helvetica');
  
  let yPosition = 30;
  const lineHeight = 8;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  
  // 헤더
  doc.setFontSize(22);
  doc.setTextColor(59, 130, 246); // primary-600
  doc.text('KIPRIS IP Strategy Consulting Report', margin, yPosition);
  yPosition += lineHeight * 3;
  
  doc.setFontSize(14);
  doc.setTextColor(75, 85, 99); // gray-600
  doc.text('AI-Powered Intellectual Property Analysis & Strategy', margin, yPosition);
  yPosition += lineHeight * 2;
  
  // 구분선
  doc.setDrawColor(229, 231, 235); // gray-200
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += lineHeight * 2;
  
  // 날짜 및 생성 정보
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128); // gray-500
  doc.text(`Generated: ${new Date().toLocaleDateString('en-US')} ${new Date().toLocaleTimeString('en-US')}`, margin, yPosition);
  doc.text('Powered by KIPRIS Data & Claude AI', pageWidth - margin - 50, yPosition);
  yPosition += lineHeight * 3;
  
  // 사용자 정보
  if (consultingData.userInfo) {
    doc.setFontSize(16);
    doc.setTextColor(17, 24, 39); // gray-900
    doc.text('1. Client Information', margin, yPosition);
    yPosition += lineHeight * 1.5;
    
    // 배경 박스
    doc.setFillColor(249, 250, 251); // gray-50
    doc.rect(margin, yPosition - 5, pageWidth - margin * 2, lineHeight * 4 + 10, 'F');
    
    doc.setFontSize(11);
    doc.setTextColor(55, 65, 81); // gray-700
    if (consultingData.userInfo.name) {
      doc.text(`Name: ${convertToEnglish(consultingData.userInfo.name)}`, margin + 5, yPosition + 5);
      yPosition += lineHeight;
    }
    if (consultingData.userInfo.businessField) {
      const field = consultingData.userInfo.businessField === 'other' 
        ? consultingData.userInfo.customField 
        : consultingData.userInfo.businessField;
      doc.text(`Business Field: ${convertToEnglish(field)}`, margin + 5, yPosition + 5);
      yPosition += lineHeight;
    }
    if (consultingData.userInfo.stage) {
      doc.text(`Development Stage: ${convertToEnglish(consultingData.userInfo.stage)}`, margin + 5, yPosition + 5);
      yPosition += lineHeight;
    }
    yPosition += lineHeight * 2;
  }
  
  // 아이디어 설명
  if (consultingData.userInfo?.idea) {
    doc.setFontSize(16);
    doc.setTextColor(17, 24, 39);
    doc.text('2. Business Idea Overview', margin, yPosition);
    yPosition += lineHeight * 1.5;
    
    doc.setFontSize(11);
    doc.setTextColor(55, 65, 81);
    const ideaText = extractKeyContent(consultingData.userInfo.idea);
    const ideaLines = doc.splitTextToSize(ideaText, pageWidth - margin * 2 - 10);
    
    // 배경 박스
    const boxHeight = ideaLines.length * lineHeight + 10;
    doc.setFillColor(239, 246, 255); // blue-50
    doc.rect(margin, yPosition - 5, pageWidth - margin * 2, boxHeight, 'F');
    
    doc.text(ideaLines, margin + 5, yPosition + 5);
    yPosition += boxHeight + lineHeight;
  }
  
  // 특허 분석 결과
  if (consultingData.patents && consultingData.patents.length > 0) {
    doc.setFontSize(14);
    doc.text('Patent Analysis Results', margin, yPosition);
    yPosition += lineHeight;
    
    doc.setFontSize(11);
    doc.text(`Total Patents Found: ${consultingData.patents.length}`, margin, yPosition);
    yPosition += lineHeight * 2;
    
    consultingData.patents.slice(0, 5).forEach((patent, index) => {
      // 새 페이지 필요 여부 확인
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 30;
      }
      
      doc.setFontSize(12);
      doc.text(`${index + 1}. ${patent.title}`, margin, yPosition);
      yPosition += lineHeight;
      
      doc.setFontSize(10);
      doc.text(`Applicant: ${patent.applicant}`, margin + 5, yPosition);
      yPosition += lineHeight;
      
      doc.text(`Patent No: ${patent.patentNo}`, margin + 5, yPosition);
      yPosition += lineHeight;
      
      doc.text(`Status: ${patent.status}`, margin + 5, yPosition);
      yPosition += lineHeight;
      
      doc.text(`Risk Level: ${patent.riskLevel}`, margin + 5, yPosition);
      yPosition += lineHeight;
      
      if (patent.summary) {
        const summaryLines = doc.splitTextToSize(patent.summary, pageWidth - margin * 2 - 10);
        doc.text(summaryLines, margin + 5, yPosition);
        yPosition += summaryLines.length * lineHeight;
      }
      
      yPosition += lineHeight;
    });
  }
  
  // AI 컨설팅 조언
  if (consultingData.consultation && consultingData.consultation.length > 0) {
    // 새 페이지 필요 여부 확인
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 30;
    }
    
    doc.setFontSize(16);
    doc.setTextColor(17, 24, 39);
    doc.text('4. AI Consulting Analysis', margin, yPosition);
    yPosition += lineHeight * 2;
    
    consultingData.consultation.forEach((advice, index) => {
      if (yPosition > 220) {
        doc.addPage();
        yPosition = 30;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(59, 130, 246); // primary-600
      doc.text(`Session ${index + 1}`, margin, yPosition);
      yPosition += lineHeight * 1.5;
      
      // 질문
      doc.setFontSize(12);
      doc.setTextColor(75, 85, 99); // gray-600
      doc.text('Question:', margin, yPosition);
      yPosition += lineHeight;
      
      doc.setFontSize(10);
      doc.setTextColor(55, 65, 81); // gray-700
      const questionText = extractKeyContent(advice.question);
      const questionLines = doc.splitTextToSize(questionText, pageWidth - margin * 2 - 10);
      doc.text(questionLines, margin + 5, yPosition);
      yPosition += questionLines.length * lineHeight + 5;
      
      // 답변
      doc.setFontSize(12);
      doc.setTextColor(75, 85, 99);
      doc.text('AI Analysis & Recommendations:', margin, yPosition);
      yPosition += lineHeight;
      
      doc.setFontSize(10);
      doc.setTextColor(55, 65, 81);
      const answerText = extractKeyContent(advice.answer);
      const answerLines = doc.splitTextToSize(answerText, pageWidth - margin * 2 - 10);
      
      // 답변 배경
      const answerBoxHeight = answerLines.length * lineHeight + 10;
      doc.setFillColor(254, 249, 195); // yellow-100
      doc.rect(margin, yPosition - 2, pageWidth - margin * 2, answerBoxHeight, 'F');
      
      doc.text(answerLines, margin + 5, yPosition + 5);
      yPosition += answerBoxHeight + lineHeight * 1.5;
    });
  }
  
  // 추천 전략 요약
  if (consultingData.recommendations) {
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 30;
    }
    
    doc.setFontSize(14);
    doc.text('Recommended IP Strategy', margin, yPosition);
    yPosition += lineHeight * 2;
    
    doc.setFontSize(11);
    const recLines = doc.splitTextToSize(consultingData.recommendations, pageWidth - margin * 2);
    doc.text(recLines, margin, yPosition);
  }
  
  // 푸터
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(`Generated by KIPRIS IP Consulting Bot - Page ${i}/${pageCount}`, 
             margin, doc.internal.pageSize.height - 10);
  }
  
  return doc;
}

export function downloadReport(consultingData, filename = 'IP-Strategy-Report.pdf') {
  const doc = generateIPReport(consultingData);
  doc.save(filename);
}

export function getReportBlob(consultingData) {
  const doc = generateIPReport(consultingData);
  return doc.output('blob');
}