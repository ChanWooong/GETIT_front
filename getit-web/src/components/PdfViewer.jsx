import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, Download, AlertTriangle } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import api from '../api/axios';
import { LECTURE_PAGE_MESSAGES } from '../constants';

// Vite: 앱 코드에서 worker를 ?url로 불러와야 빌드 시 올바르게 포함됨
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/**
 * PDF 뷰어. URL로 PDF를 불러와 페이지 단위로 표시.
 * @param {string} file - PDF URL (외부 URL) 또는 authFetch 시 API 경로(예: /api/lecture/files/1/view)
 * @param {boolean} [authFetch] - true면 axios로 blob 로드(JWT 필요한 API용)
 * @param {string} [className]
 * @param {string} [downloadLabel]
 */
export default function PdfViewer({
  file,
  authFetch = false,
  className = '',
  downloadLabel = LECTURE_PAGE_MESSAGES.MATERIAL_VIEW_NEW_TAB,
}) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadError, setLoadError] = useState(false);
  const [authBlobUrl, setAuthBlobUrl] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const authBlobRef = useRef(null);

  useEffect(() => {
    if (!authFetch || !file) {
      if (authBlobRef.current) {
        URL.revokeObjectURL(authBlobRef.current);
        authBlobRef.current = null;
      }
      setAuthBlobUrl(null);
      setAuthLoading(false);
      setLoadError(false);
      return undefined;
    }
    let cancelled = false;
    setAuthLoading(true);
    setLoadError(false);
    api
      .get(file, { responseType: 'blob' })
      .then((res) => {
        if (cancelled) return;
        if (authBlobRef.current) {
          URL.revokeObjectURL(authBlobRef.current);
        }
        const u = URL.createObjectURL(res.data);
        authBlobRef.current = u;
        setAuthBlobUrl(u);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      })
      .finally(() => {
        if (!cancelled) setAuthLoading(false);
      });
    return () => {
      cancelled = true;
      if (authBlobRef.current) {
        URL.revokeObjectURL(authBlobRef.current);
        authBlobRef.current = null;
      }
    };
  }, [file, authFetch]);

  const documentFile = authFetch ? authBlobUrl : file;

  const onDocumentLoadSuccess = ({ numPages: n }) => {
    setNumPages(n);
    setPageNumber(1);
    setLoadError(false);
  };

  const onDocumentLoadError = () => {
    setLoadError(true);
  };

  const openInNewTab = async () => {
    if (!file) return;
    if (authFetch) {
      try {
        const res = await api.get(file, { responseType: 'blob' });
        const u = URL.createObjectURL(res.data);
        window.open(u, '_blank', 'noopener,noreferrer');
        setTimeout(() => URL.revokeObjectURL(u), 120000);
      } catch {
        setLoadError(true);
      }
      return;
    }
    window.open(file, '_blank', 'noopener,noreferrer');
  };

  if (!file) {
    return (
      <div className={`flex items-center justify-center bg-black/40 rounded-2xl ${className}`}>
        <p className="text-gray-500">{LECTURE_PAGE_MESSAGES.MATERIAL_PDF_NO_URL}</p>
      </div>
    );
  }

  if (authFetch && authLoading) {
    return (
      <div className={`flex items-center justify-center bg-black/40 rounded-2xl min-h-[200px] ${className}`}>
        <p className="text-gray-500">{LECTURE_PAGE_MESSAGES.MATERIAL_PDF_LOADING}</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className={`flex flex-col items-center justify-center bg-black/40 rounded-2xl p-8 ${className}`}>
        <AlertTriangle size={48} className="text-amber-400 mb-4" />
        <p className="text-gray-300 text-center mb-4">{LECTURE_PAGE_MESSAGES.MATERIAL_PDF_LOAD_ERROR}</p>
        <button
          type="button"
          onClick={openInNewTab}
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium"
        >
          <Download size={18} />
          {downloadLabel}
        </button>
      </div>
    );
  }

  if (authFetch && !documentFile) {
    return (
      <div className={`flex items-center justify-center bg-black/40 rounded-2xl min-h-[200px] ${className}`}>
        <p className="text-gray-500">{LECTURE_PAGE_MESSAGES.MATERIAL_PDF_LOADING}</p>
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
        <button
          type="button"
          onClick={openInNewTab}
          className="inline-flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 font-medium"
        >
          <Download size={16} />
          {downloadLabel}
        </button>
      </div>
      <div className="flex-1 overflow-auto flex justify-center p-4 min-h-[400px]">
        <Document
          file={documentFile}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <div className="flex items-center justify-center py-16 text-gray-500">
              {LECTURE_PAGE_MESSAGES.MATERIAL_PDF_LOADING}
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
