import React, { useState } from 'react';
import AdminHeader from './components/AdminHeader';
import TabNavigation from './components/TabNavigation';
import ApplicantManagement from './components/ApplicantManagement';
import ApplicantModal from './components/ApplicantModal';
import MemberManagement from './components/MemberManagement';
import mockData from '../../resources/Admin/application.json';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('MEMBERS');
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const applicants = mockData.success ? mockData.data : [];
  const formatDate = (date) => date.split('T')[0];

  return (
    <div className="min-h-screen w-full bg-[#110b29] text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <AdminHeader />
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 min-h-[500px] backdrop-blur-xl relative">
          {activeTab === 'MEMBERS' && <MemberManagement />}
          {activeTab === 'APPLICANTS' && (
            <ApplicantManagement 
              applicants={applicants} 
              onSelect={setSelectedApplicant} 
              formatDate={formatDate} 
            />
          )}
          {activeTab === 'AUTH' && <div className="py-20 text-gray-500 italic">권한 시스템 준비 중</div>}
        </div>
      </div>

      <ApplicantModal 
        applicant={selectedApplicant} 
        onClose={() => setSelectedApplicant(null)} 
      />
    </div>
  );
};

export default AdminPage;