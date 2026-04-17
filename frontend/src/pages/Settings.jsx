import React, { useState } from 'react';
import { User, Shield, Bell, Palette, Building2, CreditCard, Sliders } from 'lucide-react';
import SettingsSidebar from '../components/settings/SettingsSidebar.jsx';
import SettingsSection from '../components/settings/SettingsSection.jsx';
import ProfileForm from '../components/settings/ProfileForm.jsx';
import SecurityForm from '../components/settings/SecurityForm.jsx';
import NotificationSettings from '../components/settings/NotificationSettings.jsx';
import BusinessSettings from '../components/settings/BusinessSettings.jsx';
import AppearanceSettings from '../components/settings/AppearanceSettings.jsx';
import AccountSettings from '../components/settings/AccountSettings.jsx';

const navItems = [
  { id: 'profile', label: 'Identity', icon: User },
  { id: 'account', label: 'Account', icon: CreditCard },
  { id: 'business', label: 'Enterprise', icon: Building2 },
  { id: 'notifications', label: 'Alerts', icon: Bell },
  { id: 'appearance', label: 'Interface', icon: Palette },
  { id: 'security', label: 'Security', icon: Shield },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return <ProfileForm />;
      case 'account': return <AccountSettings />;
      case 'business': return <BusinessSettings />;
      case 'notifications': return <NotificationSettings />;
      case 'appearance': return <AppearanceSettings />;
      case 'security': return <SecurityForm />;
      default: return <ProfileForm />;
    }
  };

  return (
    <div className="space-y-10 animate-subtle-slide pb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-accent-500 mb-2">
            <Sliders size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">System Preferences</span>
          </div>
          <h1 className="text-3xl font-black text-brand-500 tracking-tight">Console Configuration</h1>
          <p className="text-slate-500 mt-2 font-medium italic">Advanced personal and enterprise-level controls.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left: Sidebar */}
        <SettingsSidebar 
          items={navItems} 
          activeId={activeSection} 
          onSelect={setActiveSection} 
        />

        {/* Right: Content Area */}
        <div className="flex-1 w-full space-y-10">
            <SettingsSection title={navItems.find(i => i.id === activeSection)?.label}>
                <div className="animate-subtle-fade mt-6">
                    {renderContent()}
                </div>
            </SettingsSection>
        </div>
      </div>
    </div>
  );
}
