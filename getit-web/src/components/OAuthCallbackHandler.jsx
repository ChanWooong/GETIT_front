import { useEffect } from 'react';

/**
 * OAuth 콜백 후 URL에 token이 있으면 localStorage에 저장하고 URL을 정리한 뒤 홈(또는 profileSetup 리다이렉트)으로 이동.
 * React 라이프사이클(useEffect) 안에서만 실행되도록 분리.
 */
function OAuthCallbackHandler() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (!token) return;

    const isNew = params.get('isNewMember') === 'true';
    const hasInfo = params.get('hasInfo') === 'true';

    localStorage.setItem('accessToken', token);
    localStorage.setItem('isNewMember', params.get('isNewMember'));
    localStorage.setItem('hasInfo', params.get('hasInfo'));

    if (isNew && !hasInfo) {
      window.location.replace('/?redirect=profileSetup');
    } else {
      window.location.replace('/');
    }
  }, []);

  return null;
}

export default OAuthCallbackHandler;
