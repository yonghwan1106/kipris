import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // 제목들
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-primary-200 pb-2">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">
            {children}
          </h3>
        ),
        
        // 문단
        p: ({ children }) => (
          <p className="text-gray-700 mb-4 leading-relaxed">
            {children}
          </p>
        ),
        
        // 목록
        ul: ({ children }) => (
          <ul className="list-none space-y-2 mb-4 ml-4">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
            {children}
          </ol>
        ),
        li: ({ children, ordered }) => (
          <li className={`flex items-start ${ordered ? '' : 'before:content-["•"] before:text-primary-600 before:font-bold before:mr-2'}`}>
            <span>{children}</span>
          </li>
        ),
        
        // 강조
        strong: ({ children }) => (
          <strong className="font-bold text-gray-900">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-gray-800">
            {children}
          </em>
        ),
        
        // 코드
        code: ({ inline, children }) => (
          inline ? (
            <code className="bg-gray-100 text-primary-700 px-2 py-1 rounded text-sm font-mono">
              {children}
            </code>
          ) : (
            <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto mb-4">
              <code className="text-sm font-mono text-gray-800">
                {children}
              </code>
            </pre>
          )
        ),
        
        // 인용문
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-600 mb-4 bg-primary-50 py-2">
            {children}
          </blockquote>
        ),
        
        // 링크
        a: ({ href, children }) => (
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800 underline"
          >
            {children}
          </a>
        ),
        
        // 구분선
        hr: () => (
          <hr className="border-0 h-px bg-gray-300 my-6" />
        ),
        
        // 표
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-50">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-gray-200">
            {children}
          </tbody>
        ),
        tr: ({ children }) => (
          <tr className="hover:bg-gray-50">
            {children}
          </tr>
        ),
        th: ({ children }) => (
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border-b">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-2 text-sm text-gray-700">
            {children}
          </td>
        ),
      }}
      className="prose prose-lg max-w-none"
    >
      {content}
    </ReactMarkdown>
  );
}