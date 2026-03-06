import React, { useState } from 'react';
import AdminHeader from './components/AdminHeader';
import TabNavigation from './components/TabNavigation';
import ApplicantManagement from './components/ApplicantManagement';
import ApplicantModal from './components/ApplicantModal';
import MemberManagement from './components/MemberManagement';
import AuthManagement from './components/AuthManagement';
import SettingsManagement from './components/SettingsManagement';


const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('MEMBERS');
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  return (
    <div className="min-h-screen w-full bg-[#110b29] text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <AdminHeader onSettingsClick={() => setActiveTab('SETTINGS')} />
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 min-h-[500px] backdrop-blur-xl relative">
          {activeTab === 'MEMBERS' && <MemberManagement />}
          {activeTab === 'APPLICANTS' && (
            <ApplicantManagement
              onSelect={setSelectedApplicant} // ✅ applicants prop 제거
            />
          )}
          {activeTab === 'AUTH' && <AuthManagement />}
          {activeTab === 'SETTINGS' && <SettingsManagement onBack={() => setActiveTab('MEMBERS')} />}
          
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