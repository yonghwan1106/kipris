import { useState } from 'react';
import Head from 'next/head';
import UserInfoForm from '../components/Forms/UserInfoForm';
import ChatInterface from '../components/ChatBot/ChatInterface';
import Navbar from '../components/UI/Navbar';

export default function Home() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'form', 'chat'
  const [userInfo, setUserInfo] = useState(null);

  return (
    <>
      <Head>
        <title>KIPRIS IP 전략 컨설팅 봇</title>
        <meta name="description" content="1인 창업자를 위한 AI 기반 IP 전략 컨설팅 서비스" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
        {currentView === 'landing' && (
          <>
            <Navbar currentPage="home" />
            
            {/* 히어로 섹션 */}
            <div className="container mx-auto px-4 py-16">
              <div className="text-center mb-16">
                {/* 공모전 배지 */}
                <div className="inline-block bg-primary-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
                  🏆 2025년 KIPRIS 활용사례 공모전 출품작
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
                  KIPRIS IP 전략<br />
                  <span className="text-primary-600">컨설팅 봇</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                  1인 창업자를 위한 AI 기반 지식재산권 전략 컨설팅 서비스<br />
                  <span className="text-primary-600 font-medium">24시간 언제든지, 무료로 이용하세요</span>
                </p>

                {/* CTA 버튼 */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <button 
                    onClick={() => setCurrentView('form')}
                    className="btn-primary text-xl px-10 py-4 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    🚀 IP 컨설팅 시작하기
                  </button>
                  
                  <button 
                    onClick={() => setCurrentView('chat')}
                    className="btn-secondary text-xl px-10 py-4 text-gray-700 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    ⚡ 바로 시작하기
                  </button>
                </div>

                {/* 통계 정보 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-16">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">200+</div>
                    <div className="text-sm text-gray-600">특허 데이터</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">24/7</div>
                    <div className="text-sm text-gray-600">서비스 운영</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">FREE</div>
                    <div className="text-sm text-gray-600">무료 이용</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">AI</div>
                    <div className="text-sm text-gray-600">Claude 분석</div>
                  </div>
                </div>
              </div>

              {/* 핵심 기능 */}
              <div className="max-w-6xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                  🔥 핵심 기능
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="card text-center group hover:scale-105 transition-transform duration-300">
                    <div className="text-primary-600 text-5xl mb-6 group-hover:animate-bounce">🔍</div>
                    <h3 className="text-xl font-bold mb-4">KIPRIS 특허 검색</h3>
                    <p className="text-gray-600 mb-4">실시간으로 관련 특허를 검색하고 위험도를 분석합니다</p>
                    <div className="text-sm text-primary-600 font-medium">• AI/챗봇 • 피트니스 • 배달서비스</div>
                  </div>
                  
                  <div className="card text-center group hover:scale-105 transition-transform duration-300">
                    <div className="text-primary-600 text-5xl mb-6 group-hover:animate-bounce">🤖</div>
                    <h3 className="text-xl font-bold mb-4">Claude AI 분석</h3>
                    <p className="text-gray-600 mb-4">전문가 수준의 맞춤형 IP 전략을 제안해드립니다</p>
                    <div className="text-sm text-primary-600 font-medium">• 위험도 평가 • 전략 제안 • 액션 가이드</div>
                  </div>
                  
                  <div className="card text-center group hover:scale-105 transition-transform duration-300">
                    <div className="text-primary-600 text-5xl mb-6 group-hover:animate-bounce">📋</div>
                    <h3 className="text-xl font-bold mb-4">전문 보고서</h3>
                    <p className="text-gray-600 mb-4">상담 내용을 정리한 PDF 보고서를 제공합니다</p>
                    <div className="text-sm text-primary-600 font-medium">• 분석 요약 • 특허 리스트 • 실행 계획</div>
                  </div>
                </div>
              </div>

              {/* 사용 사례 */}
              <div className="max-w-5xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                  💡 이런 분들께 추천합니다
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 타겟 사용자</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <span className="text-green-500 mr-3">✓</span>
                        <span className="text-gray-700">기술 아이디어를 가진 1인 창업자</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-3">✓</span>
                        <span className="text-gray-700">IP 전략 경험이 부족한 예비창업자</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-3">✓</span>
                        <span className="text-gray-700">변리사 상담 전 사전 검토가 필요한 분</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-3">✓</span>
                        <span className="text-gray-700">소규모 스타트업 팀</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 활용 시나리오</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-3 font-bold">1.</span>
                        <span className="text-gray-700">아이디어 검증 단계에서 특허 위험 확인</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-3 font-bold">2.</span>
                        <span className="text-gray-700">MVP 개발 전 IP 전략 수립</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-3 font-bold">3.</span>
                        <span className="text-gray-700">투자 유치 전 IP 포트폴리오 점검</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-3 font-bold">4.</span>
                        <span className="text-gray-700">경쟁사 특허 분석 및 회피 전략</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 공모전 어필 */}
              <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-2xl p-8 text-center">
                <h2 className="text-3xl font-bold mb-6">🏆 2025 KIPRIS 활용사례 공모전</h2>
                <p className="text-xl mb-8 text-blue-100">
                  실제 KIPRIS 데이터를 활용한 혁신적인 IP 컨설팅 서비스
                </p>
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold mb-2">적합성</div>
                    <div className="text-blue-200 text-sm">KIPRIS 데이터 200건+ 활용</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-2">충실성</div>
                    <div className="text-blue-200 text-sm">실제 페인포인트 해결</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-2">대중성</div>
                    <div className="text-blue-200 text-sm">24시간 무료 접근</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-2">표현성</div>
                    <div className="text-blue-200 text-sm">직관적 대화형 UI</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {currentView === 'form' && (
          <>
            <Navbar currentPage="consulting" />
            <div className="container mx-auto px-4 py-16">
              <UserInfoForm
                onSubmit={(data) => {
                  setUserInfo(data);
                  setCurrentView('chat');
                }}
                onSkip={() => setCurrentView('chat')}
              />
            </div>
          </>
        )}

        {currentView === 'chat' && (
          <>
            <Navbar currentPage="consulting" />
            <div className="container mx-auto px-4 py-8" style={{ height: 'calc(100vh - 4rem)' }}>
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setCurrentView('landing')}
                  className="text-gray-600 hover:text-gray-900 flex items-center font-medium"
                >
                  ← 홈으로 돌아가기
                </button>
                {userInfo && (
                  <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full shadow">
                    👤 {userInfo.name}님 | 📋 {userInfo.businessField === 'other' ? userInfo.customField : userInfo.businessField}
                  </div>
                )}
              </div>
              <ChatInterface userInfo={userInfo} />
            </div>
          </>
        )}
      </main>
    </>
  );
}