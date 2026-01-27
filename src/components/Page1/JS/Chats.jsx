import { useState } from "react";
import "../UX/Chats.css";

const Chats = () => {
    const [activeTab, setActiveTab] = useState('chats');
    
    return (
        <div className="chats-wrapper">
            <button 
                className={activeTab === 'chats' ? 'active' : ''}
                onClick={() => setActiveTab('chats')}
            >
                Chats
            </button>
            <button 
                className={activeTab === 'ai' ? 'active' : ''}
                onClick={() => setActiveTab('ai')}
            >
                AI Chats
            </button>
            <button 
                className={activeTab === 'storage' ? 'active' : ''}
                onClick={() => setActiveTab('storage')}
            >
                Storage
            </button>
            <div className="chats-container">
            </div>
        </div>
    );
};

export default Chats;
