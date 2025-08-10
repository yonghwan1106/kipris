import { useState } from 'react';
import { downloadReport } from '../../utils/reportGenerator';

export default function ReportGenerator({ consultingData, userInfo }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    if (!consultingData || consultingData.length === 0) {
      alert('보고서를 생성할 데이터가 없습니다. 먼저 컨설팅을 진행해주세요.');
      return;
    }

    setIsGenerating(true);
    
    try {
      // 컨설팅 데이터 정리
      const reportData = {
        userInfo: userInfo,
        patents: consultingData.flatMap(item => item.patents || []),
        consultation: consultingData.map(item => ({
          question: item.userMessage,
          answer: item.botResponse,
          timestamp: item.timestamp
        })),
        recommendations: generateRecommendations(consultingData, userInfo)
      };

      // PDF 생성 및 다운로드
      const filename = `IP-Strategy-Report-${new Date().toISOString().split('T')[0]}.pdf`;
      downloadReport(reportData, filename);
      
    } catch (error) {
      console.error('Report generation error:', error);
      alert('보고서 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateRecommendations = (consultingData, userInfo) => {
    const patents = consultingData.flatMap(item => item.patents || []);
    const highRiskPatents = patents.filter(p => p.riskLevel === 'HIGH');
    const mediumRiskPatents = patents.filter(p => p.riskLevel === 'MEDIUM');
    
    let recommendations = '';
    
    if (highRiskPatents.length > 0) {
      recommendations += `High Risk Alert: ${highRiskPatents.length} high-risk patents found. `;
      recommendations += 'Consider alternative approaches or seek legal consultation. ';
    }
    
    if (mediumRiskPatents.length > 0) {
      recommendations += `Moderate Risk: ${mediumRiskPatents.length} medium-risk patents identified. `;
      recommendations += 'Review patent claims carefully and consider differentiation strategies. ';
    }
    
    if (userInfo?.stage === 'idea') {
      recommendations += 'Recommendation: Conduct thorough prior art search before development. ';
    } else if (userInfo?.stage === 'mvp') {
      recommendations += 'Recommendation: Consider filing provisional patent application. ';
    }
    
    return recommendations || 'Continue monitoring patent landscape and consider IP protection strategies.';
  };

  return (
    <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">보고서 생성</h3>
          <p className="text-sm text-gray-600">
            컨설팅 내용을 PDF 보고서로 다운로드할 수 있습니다.
          </p>
        </div>
        
        <button
          onClick={handleGenerateReport}
          disabled={isGenerating || !consultingData || consultingData.length === 0}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              생성 중...
            </>
          ) : (
            <>
              📄 PDF 다운로드
            </>
          )}
        </button>
      </div>
      
      {consultingData && consultingData.length > 0 && (
        <div className="mt-3 text-xs text-gray-500">
          포함될 내용: 사용자 정보, {consultingData.flatMap(item => item.patents || []).length}개 특허 분석, {consultingData.length}개 컨설팅 대화
        </div>
      )}
    </div>
  );
}