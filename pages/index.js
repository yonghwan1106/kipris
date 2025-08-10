import { useState } from 'react';
import Head from 'next/head';
import UserInfoForm from '../components/Forms/UserInfoForm';
import ChatInterface from '../components/ChatBot/ChatInterface';

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
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                KIPRIS IP 전략 컨설팅 봇
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                1인 창업자를 위한 AI 기반 지식재산권 전략 컨설팅 서비스
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="card text-center">
                  <div className="text-primary-600 text-3xl mb-4">🔍</div>
                  <h3 className="text-lg font-semibold mb-2">특허 검색 분석</h3>
                  <p className="text-gray-600">KIPRIS 데이터를 활용한 실시간 특허 분석</p>
                </div>
                
                <div className="card text-center">
                  <div className="text-primary-600 text-3xl mb-4">🤖</div>
                  <h3 className="text-lg font-semibold mb-2">AI 컨설팅</h3>
                  <p className="text-gray-600">Claude AI 기반 맞춤형 IP 전략 제안</p>
                </div>
                
                <div className="card text-center">
                  <div className="text-primary-600 text-3xl mb-4">📋</div>
                  <h3 className="text-lg font-semibold mb-2">보고서 생성</h3>
                  <p className="text-gray-600">PDF 형태의 상세한 분석 보고서 제공</p>
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={() => setCurrentView('form')}
                  className="btn-primary text-lg px-8 py-4 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  IP 컨설팅 시작하기
                </button>
                
                <button 
                  onClick={() => setCurrentView('chat')}
                  className="ml-4 btn-secondary text-lg px-8 py-4 text-gray-700 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  바로 시작하기
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'form' && (
          <div className="container mx-auto px-4 py-16">
            <UserInfoForm
              onSubmit={(data) => {
                setUserInfo(data);
                setCurrentView('chat');
              }}
              onSkip={() => setCurrentView('chat')}
            />
          </div>
        )}

        {currentView === 'chat' && (
          <div className="container mx-auto px-4 py-8" style={{ height: '100vh' }}>
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setCurrentView('landing')}
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                ← 홈으로 돌아가기
              </button>
              {userInfo && (
                <div className="text-sm text-gray-600">
                  {userInfo.name}님 | {userInfo.businessField === 'other' ? userInfo.customField : userInfo.businessField}
                </div>
              )}
            </div>
            <ChatInterface userInfo={userInfo} />
          </div>
        )}
      </main>
    </>
  );
}