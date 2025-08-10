import { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import InputForm from './InputForm';
import ReportGenerator from '../UI/ReportGenerator';

export default function ChatInterface({ userInfo }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [consultingData, setConsultingData] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // 시작 메시지
    setMessages([{
      id: 'welcome',
      text: `안녕하세요! KIPRIS IP 전략 컨설팅 봇입니다. ${userInfo?.name || ''}님의 창업 아이디어에 대한 IP 전략을 도와드리겠습니다. 궁금한 것을 자유롭게 물어보세요!`,
      isUser: false,
      timestamp: new Date().toISOString()
    }]);
  }, [userInfo]);

  const handleSendMessage = async (messageText) => {
    const userMessage = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // KIPRIS 데이터 검색
      const patentResponse = await fetch('/api/search-patents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: messageText })
      });
      
      let patents = [];
      if (patentResponse.ok) {
        const patentData = await patentResponse.json();
        patents = patentData.patents || [];
      }

      // Claude API 호출
      const response = await fetch('/api/claude-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userMessage: messageText,
          context: `사용자 정보: ${JSON.stringify(userInfo)}\n관련 특허 정보: ${JSON.stringify(patents)}`
        })
      });

      if (!response.ok) {
        throw new Error('서버 오류가 발생했습니다.');
      }

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        isUser: false,
        timestamp: data.timestamp,
        patents: patents.length > 0 ? patents : null
      };

      setMessages(prev => [...prev, botMessage]);
      
      // 컨설팅 데이터 저장
      setConsultingData(prev => [...prev, {
        userMessage: messageText,
        botResponse: data.response,
        patents: patents,
        timestamp: data.timestamp
      }]);
    } catch (error) {
      console.error('메시지 전송 오류:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        isUser: false,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* 헤더 */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
            IP
          </div>
          <div>
            <h2 className="text-lg font-semibold">KIPRIS IP 컨설팅 봇</h2>
            <p className="text-sm text-gray-600">지식재산권 전략 상담</p>
          </div>
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ minHeight: '400px', maxHeight: '500px' }}>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
            patents={message.patents}
          />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <InputForm onSend={handleSendMessage} disabled={isLoading} />
      
      {/* 보고서 생성 영역 */}
      {consultingData.length > 0 && (
        <div className="border-t border-gray-200 p-4">
          <ReportGenerator consultingData={consultingData} userInfo={userInfo} />
        </div>
      )}
    </div>
  );
}