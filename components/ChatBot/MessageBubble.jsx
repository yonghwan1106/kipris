import { useState } from 'react';
import MarkdownRenderer from '../UI/MarkdownRenderer';

export default function MessageBubble({ message, isUser, timestamp, patents }) {
  const [showPatents, setShowPatents] = useState(false);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`max-w-xs lg:max-w-3xl px-6 py-4 rounded-lg ${
        isUser 
          ? 'bg-primary-600 text-white' 
          : 'bg-white border border-gray-200 shadow-sm'
      }`}>
        {isUser ? (
          <div className="text-sm text-white">{message}</div>
        ) : (
          <div className="text-sm">
            <MarkdownRenderer content={message} />
          </div>
        )}
        
        {/* 특허 정보가 있는 경우 표시 */}
        {patents && patents.length > 0 && (
          <div className="mt-3">
            <button
              onClick={() => setShowPatents(!showPatents)}
              className="text-xs underline hover:no-underline"
            >
              관련 특허 {patents.length}건 {showPatents ? '숨기기' : '보기'}
            </button>
            
            {showPatents && (
              <div className="mt-2 space-y-2">
                {patents.map((patent, index) => (
                  <div key={index} className="text-xs bg-white bg-opacity-20 p-2 rounded">
                    <div className="font-medium">{patent.title}</div>
                    <div className="text-gray-600">{patent.applicant}</div>
                    <div className={`inline-block px-1 py-0.5 rounded text-xs mt-1 ${
                      patent.riskLevel === 'HIGH' ? 'bg-red-100 text-red-800' :
                      patent.riskLevel === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      위험도: {patent.riskLevel}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {timestamp && (
          <div className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
            {new Date(timestamp).toLocaleTimeString('ko-KR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        )}
      </div>
    </div>
  );
}