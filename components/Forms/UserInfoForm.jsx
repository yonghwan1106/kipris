import { useState } from 'react';

const businessFields = [
  { value: 'AI_chatbot', label: 'AI/챗봇 서비스' },
  { value: 'fitness_app', label: '헬스/피트니스 앱' },
  { value: 'food_delivery', label: '음식 배달 서비스' },
  { value: 'fintech', label: '핀테크/금융 서비스' },
  { value: 'ecommerce', label: '이커머스/쇼핑몰' },
  { value: 'education', label: '교육/이러닝' },
  { value: 'healthcare', label: '헬스케어/의료' },
  { value: 'iot', label: 'IoT/스마트홈' },
  { value: 'mobility', label: '모빌리티/교통' },
  { value: 'other', label: '기타' }
];

const developmentStages = [
  { value: 'idea', label: '아이디어 단계' },
  { value: 'planning', label: '기획 단계' },
  { value: 'mvp', label: 'MVP 개발 중' },
  { value: 'beta', label: '베타 테스트' },
  { value: 'launching', label: '런칭 준비' }
];

const budgetRanges = [
  { value: '0-100', label: '100만원 미만' },
  { value: '100-500', label: '100-500만원' },
  { value: '500-1000', label: '500만원-1천만원' },
  { value: '1000-5000', label: '1천만원-5천만원' },
  { value: '5000+', label: '5천만원 이상' }
];

export default function UserInfoForm({ onSubmit, onSkip }) {
  const [formData, setFormData] = useState({
    name: '',
    businessField: '',
    customField: '',
    idea: '',
    stage: '',
    budget: '',
    timeline: ''
  });

  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return formData.name.trim() !== '';
      case 1: return formData.businessField !== '' && 
                     (formData.businessField !== 'other' || formData.customField.trim() !== '');
      case 2: return formData.idea.trim() !== '';
      case 3: return formData.stage !== '';
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이름 또는 닉네임
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="홍길동"
                className="input-field"
              />
            </div>
          </div>
        );
      
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                창업 분야
              </label>
              <select
                value={formData.businessField}
                onChange={(e) => handleChange('businessField', e.target.value)}
                className="input-field"
              >
                <option value="">분야를 선택해주세요</option>
                {businessFields.map(field => (
                  <option key={field.value} value={field.value}>
                    {field.label}
                  </option>
                ))}
              </select>
            </div>
            
            {formData.businessField === 'other' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  기타 분야 상세
                </label>
                <input
                  type="text"
                  value={formData.customField}
                  onChange={(e) => handleChange('customField', e.target.value)}
                  placeholder="예: 블록체인, 게임, 소셜미디어 등"
                  className="input-field"
                />
              </div>
            )}
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                창업 아이디어 설명
              </label>
              <textarea
                value={formData.idea}
                onChange={(e) => handleChange('idea', e.target.value)}
                placeholder="어떤 서비스나 제품을 만들려고 하시나요? 핵심 기능과 차별점을 간단히 설명해주세요."
                rows="4"
                className="input-field resize-none"
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                현재 개발 단계
              </label>
              <div className="space-y-2">
                {developmentStages.map(stage => (
                  <label key={stage.value} className="flex items-center">
                    <input
                      type="radio"
                      name="stage"
                      value={stage.value}
                      checked={formData.stage === stage.value}
                      onChange={(e) => handleChange('stage', e.target.value)}
                      className="mr-3"
                    />
                    {stage.label}
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                예상 투자 예산 (선택사항)
              </label>
              <select
                value={formData.budget}
                onChange={(e) => handleChange('budget', e.target.value)}
                className="input-field"
              >
                <option value="">예산 범위 선택</option>
                {budgetRanges.map(budget => (
                  <option key={budget.value} value={budget.value}>
                    {budget.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const stepTitles = [
    '기본 정보',
    '창업 분야',
    '아이디어 설명',
    '개발 현황'
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      {/* 진행 상황 표시 */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>단계 {currentStep + 1} / {totalSteps}</span>
          <button 
            onClick={onSkip}
            className="text-gray-400 hover:text-gray-600"
          >
            건너뛰기
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* 단계별 내용 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">{stepTitles[currentStep]}</h2>
        {renderStep()}
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          이전
        </button>
        
        <button
          onClick={handleNext}
          disabled={!isStepValid()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentStep === totalSteps - 1 ? '시작하기' : '다음'}
        </button>
      </div>
    </div>
  );
}