import Head from 'next/head';
import Navbar from '../components/UI/Navbar';

export default function About() {
  return (
    <>
      <Head>
        <title>소개 - KIPRIS IP 전략 컨설팅 봇</title>
        <meta name="description" content="2025 KIPRIS 활용사례 공모전 출품작 - 1인 창업자를 위한 AI 기반 IP 전략 컨설팅 서비스" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar currentPage="about" />
      
      <main className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
        <div className="container mx-auto px-4 py-16">
          {/* 공모전 배너 */}
          <div className="text-center mb-12">
            <div className="inline-block bg-primary-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
              🏆 2025년 KIPRIS 활용사례 공모전 출품작
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              KIPRIS IP 전략 컨설팅 봇
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              1인 창업자들이 쉽게 접근할 수 있는 AI 기반 지식재산권 전략 컨설팅 서비스
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-16">
            {/* 프로젝트 개요 */}
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🎯 프로젝트 목적</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">해결하고자 하는 문제</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      1인 창업자들의 IP 전략 접근 어려움
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      높은 변리사 상담 비용 부담
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      복잡한 특허 검색 및 분석 과정
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      IP 전략 수립 경험 부족
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">제공하는 솔루션</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      24시간 접근 가능한 AI 컨설팅
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      KIPRIS 데이터 기반 객관적 분석
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      개인 맞춤형 전략 수립
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      비용 효율적인 IP 가이드
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 핵심 기능 */}
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">⚡ 핵심 기능</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-semibold mb-2">KIPRIS 특허 검색</h3>
                  <p className="text-gray-600 text-sm">실시간 특허 데이터 검색 및 위험도 분석</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-4xl mb-4">🤖</div>
                  <h3 className="text-lg font-semibold mb-2">Claude AI 분석</h3>
                  <p className="text-gray-600 text-sm">전문가 수준의 맞춤형 IP 전략 조언</p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <div className="text-4xl mb-4">💬</div>
                  <h3 className="text-lg font-semibold mb-2">대화형 인터페이스</h3>
                  <p className="text-gray-600 text-sm">직관적인 챗봇 형태의 컨설팅</p>
                </div>
                <div className="text-center p-6 bg-orange-50 rounded-lg">
                  <div className="text-4xl mb-4">📋</div>
                  <h3 className="text-lg font-semibold mb-2">PDF 보고서</h3>
                  <p className="text-gray-600 text-sm">상담 내용을 정리한 전문 보고서</p>
                </div>
              </div>
            </section>

            {/* 기술 스택 */}
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">🛠 기술 스택</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Frontend</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Next.js 14 (App Router)</li>
                    <li>• React 18</li>
                    <li>• Tailwind CSS</li>
                    <li>• Framer Motion</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Backend</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Next.js API Routes</li>
                    <li>• Claude 3 Haiku</li>
                    <li>• Anthropic SDK</li>
                    <li>• Node.js 18.x</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Deployment</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Vercel Hosting</li>
                    <li>• GitHub Integration</li>
                    <li>• Serverless Functions</li>
                    <li>• Automatic HTTPS</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 공모전 어필 포인트 */}
            <section className="bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8 text-center">🏆 공모전 어필 포인트</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">적합성 (20%)</h3>
                  <p className="text-blue-100 text-sm">KIPRIS 데이터 200건+ 활용, 실시간 특허 검색 시뮬레이션</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">충실성 (30%)</h3>
                  <p className="text-blue-100 text-sm">실제 1인 창업자 페인포인트 해결, 구체적 활용 사례</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">대중성 (30%)</h3>
                  <p className="text-blue-100 text-sm">전문지식 없이도 사용 가능, 24시간 접근성</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">표현성 (20%)</h3>
                  <p className="text-blue-100 text-sm">직관적 대화형 UI, 시각적 결과 제공</p>
                </div>
              </div>
            </section>

            {/* 사용법 가이드 */}
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">📖 사용법 가이드</h2>
              <div className="grid md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">1</div>
                  <h3 className="font-semibold mb-2">접속</h3>
                  <p className="text-gray-600 text-sm">웹사이트 방문</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">2</div>
                  <h3 className="font-semibold mb-2">정보 입력</h3>
                  <p className="text-gray-600 text-sm">창업 정보 작성</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">3</div>
                  <h3 className="font-semibold mb-2">AI 상담</h3>
                  <p className="text-gray-600 text-sm">챗봇과 대화</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">4</div>
                  <h3 className="font-semibold mb-2">분석 확인</h3>
                  <p className="text-gray-600 text-sm">특허 위험도 검토</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">5</div>
                  <h3 className="font-semibold mb-2">보고서</h3>
                  <p className="text-gray-600 text-sm">PDF 다운로드</p>
                </div>
              </div>
            </section>

            {/* 개발자 정보 */}
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">👨‍💻 개발 정보</h2>
              <div className="text-center space-y-4">
                <div className="inline-block bg-gray-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">프로젝트 개발</h3>
                  <p className="text-gray-600 mb-4">2025년 KIPRIS 활용사례 공모전 참여작</p>
                  <div className="flex justify-center space-x-4">
                    <a 
                      href="https://github.com/yonghwan1106/kipris" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      📱 GitHub 저장소
                    </a>
                    <a 
                      href="https://kipris-three.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      🚀 라이브 데모
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}