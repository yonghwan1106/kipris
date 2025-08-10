import jsPDF from 'jspdf';

// 한글 폰트 지원을 위한 설정
const addKoreanFont = (doc) => {
  // 기본 폰트로 처리 (실제 한글 폰트는 별도 설정 필요)
  doc.setFont('helvetica');
};

export function generateIPReport(consultingData) {
  const doc = new jsPDF();
  addKoreanFont(doc);
  
  let yPosition = 30;
  const lineHeight = 10;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  
  // 헤더
  doc.setFontSize(20);
  doc.text('IP Strategy Consulting Report', margin, yPosition);
  yPosition += lineHeight * 2;
  
  doc.setFontSize(16);
  doc.text('KIPRIS IP jeonryak keonseolting bogoseo', margin, yPosition);
  yPosition += lineHeight * 2;
  
  // 날짜
  doc.setFontSize(12);
  doc.text(`Date: ${new Date().toLocaleDateString('ko-KR')}`, margin, yPosition);
  yPosition += lineHeight * 2;
  
  // 사용자 정보
  if (consultingData.userInfo) {
    doc.setFontSize(14);
    doc.text('User Information', margin, yPosition);
    yPosition += lineHeight;
    
    doc.setFontSize(11);
    if (consultingData.userInfo.name) {
      doc.text(`Name: ${consultingData.userInfo.name}`, margin, yPosition);
      yPosition += lineHeight;
    }
    if (consultingData.userInfo.businessField) {
      const field = consultingData.userInfo.businessField === 'other' 
        ? consultingData.userInfo.customField 
        : consultingData.userInfo.businessField;
      doc.text(`Business Field: ${field}`, margin, yPosition);
      yPosition += lineHeight;
    }
    if (consultingData.userInfo.stage) {
      doc.text(`Development Stage: ${consultingData.userInfo.stage}`, margin, yPosition);
      yPosition += lineHeight;
    }
    yPosition += lineHeight;
  }
  
  // 아이디어 설명
  if (consultingData.userInfo?.idea) {
    doc.setFontSize(14);
    doc.text('Business Idea', margin, yPosition);
    yPosition += lineHeight;
    
    doc.setFontSize(11);
    const ideaLines = doc.splitTextToSize(consultingData.userInfo.idea, pageWidth - margin * 2);
    doc.text(ideaLines, margin, yPosition);
    yPosition += ideaLines.length * lineHeight + lineHeight;
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
  if (consultingData.consultation) {
    // 새 페이지 필요 여부 확인
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 30;
    }
    
    doc.setFontSize(14);
    doc.text('AI Consulting Advice', margin, yPosition);
    yPosition += lineHeight * 2;
    
    doc.setFontSize(11);
    consultingData.consultation.forEach((advice, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 30;
      }
      
      doc.setFontSize(12);
      doc.text(`${index + 1}. Consultation ${index + 1}`, margin, yPosition);
      yPosition += lineHeight;
      
      doc.setFontSize(10);
      doc.text(`Q: ${advice.question}`, margin + 5, yPosition);
      yPosition += lineHeight;
      
      const answerLines = doc.splitTextToSize(`A: ${advice.answer}`, pageWidth - margin * 2 - 10);
      doc.text(answerLines, margin + 5, yPosition);
      yPosition += answerLines.length * lineHeight + lineHeight;
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