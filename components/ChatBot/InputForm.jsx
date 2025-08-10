import { useState } from 'react';

export default function InputForm({ onSend, disabled }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
      <div className="flex space-x-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="IP 전략에 대해 궁금한 것을 물어보세요..."
          className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          rows="1"
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={disabled || !message.trim()}
          className="btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {disabled ? '처리중...' : '전송'}
        </button>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        💡 예시: "AI 챗봇 서비스를 만들려는데 특허 위험이 있나요?", "운동 추천 앱 관련 특허를 검색해주세요"
      </div>
    </form>
  );
}