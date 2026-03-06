import React from 'react';
import InteractionForm from '../components/InteractionForm';
import ChatAssistant from '../components/ChatAssistant';

const LogInteractionScreen = () => {
  return (
    <div className="flex flex-col h-screen bg-[#f6f8fb]">
      <h1 className="page-title">Log HCP Interaction</h1>
      
      <div className="main-layout">
        <div className="left-panel">
          <InteractionForm />
        </div>
        <div className="right-panel">
          <ChatAssistant />
        </div>
      </div>
    </div>
  );
};

export default LogInteractionScreen;
