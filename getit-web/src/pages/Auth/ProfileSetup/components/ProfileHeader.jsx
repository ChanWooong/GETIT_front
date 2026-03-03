import React from 'react';
import { CheckCircle } from 'lucide-react';

const ProfileHeader = () => (
  <div className="text-center mb-10">
    <div className="inline-flex p-3 bg-cyan-500/20 rounded-2xl mb-4 text-cyan-400">
      <CheckCircle size={32} />
    </div>
    <h2 className="text-3xl font-black italic mb-2 uppercase">Welcome to GET IT</h2>
    <p className="text-gray-400 text-sm">원활한 서비스 이용을 위해 추가 정보를 입력해주세요.</p>
  </div>
);

export default ProfileHeader;