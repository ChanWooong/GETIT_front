import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, Download, AlertTriangle } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Vite: 앱 코드에서 worker를 ?url로 불러와야 빌드 시 올바르게 포함됨
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/**
 * PDF 뷰어. URL로 PDF를 불러와 페이지 단위로 표시.
 * @param {string} file - PDF URL
 * @param {string} [className] - 컨테이너 클래스
 * @param {string} [downloadLabel] - 다운로드 링크 문구
 */
export default function PdfViewer({ file, className = '', downloadLabel = '새 탭에서 보기' }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadError, setLoadError] = useState(false);

  const onDocumentLoadSuccess = ({ numPages: n }) => {
    setNumPages(n);
    setPageNumber(1);
    setLoadError(false);
  };

  const onDocumentLoadError = () => {
    setLoadError(true);
  };

  if (!file) {
    return (
      <div className={`flex items-center justify-center bg-black/40 rounded-2xl ${className}`}>
        <p className="text-gray-500">PDF URL이 없습니다.</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className={`flex flex-col items-center justify-center bg-black/40 rounded-2xl p-8 ${className}`}>
        <AlertTriangle size={48} className="text-amber-400 mb-4" />
        <p className="text-gray-300 text-center mb-4">PDF를 불러올 수 없습니다. (외부 링크는 CORS 제한으로 실패할 수 있습니다.)</p>
        <a
          href={file}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium"
        >
          <Download size={18} />
          {downloadLabel}
        </a>
      </div>
    );
  }

  return (
    <div className={`flex flex-col bg-black/40 rounded-2xl overflow-hidden ${className}`}>
      <div className="flex items-center justify-between gap-4 p-2 border-b border-white/10 bg-black/30">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="이전 페이지"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm text-gray-300 min-w-[80px] text-center">
            {pageNumber} / {numPages ?? '-'}
          </span>
          <button
            type="button"
            onClick={() => setPageNumber((p) => Math.min(numPages ?? 1, p + 1))}
            disabled={!numPages || pageNumber >= numPages}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="다음 페이지"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <a
          href={file}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 font-medium"
        >
          <Download size={16} />
          {downloadLabel}
        </a>
      </div>
      <div className="flex-1 overflow-auto flex justify-center p-4 min-h-[400px]">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <div className="flex items-center justify-center py-16 text-gray-500">
              PDF 로딩 중...
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer
            renderAnnotationLayer
            className="!max-w-full"
          />
        </Document>
      </div>
    </div>
  );
}
