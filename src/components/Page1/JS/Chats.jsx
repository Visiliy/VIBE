import { useState } from "react";
import Example from "../JS/Example";
import { useMediaQuery } from 'react-responsive';
import "../UX/Chats.css";

const Chats = () => {
    const [activeTab, setActiveTab] = useState('chats');
    const isMobile = useMediaQuery({ maxWidth: 468 });
    
    const chatsData = [
        { name: "Иван Петров", text: "Обсуждение проекта React..." },
        { name: "Мария Сидорова", text: "Вопросы по PyTorch модели" },
        { name: "Алексей Козлов", text: "Планирование ML пайплайна" }
    ];

    const aiChatsData = [
        { name: "Grok AI", text: "Помощь с кодом React" },
        { name: "Code Assistant", text: "Оптимизация трансформера" },
        { name: "Quantum Helper", text: "Объяснение квантовых вычислений" }
    ];

    const storageData = [
        { name: "Проект Alpha", text: "Сохраненные чаты и данные" },
        { name: "Модель Beta", text: "История обучения модели" },
        { name: "Архив 2026", text: "Все сохраненные разговоры" }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'chats':
                return chatsData.map((item, index) => (
                    <Example key={index} name={item.name} text={item.text} />
                ));
            case 'ai':
                return aiChatsData.map((item, index) => (
                    <Example key={index} name={item.name} text={item.text} />
                ));
            case 'storage':
                return storageData.map((item, index) => (
                    <Example key={index} name={item.name} text={item.text} />
                ));
            default:
                return null;
        }
    };

    return (
        <div className="chats-wrapper">
            {
                !isMobile && <>
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
                </>
            }
            <div className="chats-container">
                {renderContent()}
            </div>
        </div>
    );
};

export default Chats;
