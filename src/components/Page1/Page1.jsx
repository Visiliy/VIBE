import ChatInput from "./JS/ChatInput";
import Chats from "./JS/Chats";
import Head from "./JS/Head";
import "./Page1.css";
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import CreateUserForm from "./JS/CreateUserForm";

const Page1 = ({ dataCloud }) => {
    const isMobile = useMediaQuery({ maxWidth: 1024 });
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <>
            <Head src={dataCloud.logo_srs} app_name={dataCloud.app_name}/>
            <div className="container">
                <Chats />
                {!isMobile && (
                    <>
                        <button className="write-btn" onClick={toggleOptions}>✎</button>
                        {showOptions && (
                            <>
                                <div className="options-wrapper">
                                    <button className="close-btn" onClick={toggleOptions}>✖</button>
                                    <p>✉ New Chat</p>
                                    <p>⌨ New AI Chat</p>
                                    <p>🪄 Beauty mode</p>
                                </div>
                            </>
                        )}
                        <div className="main-chat-window">
                            <p>Stay informed, be on VIBE</p>
                            <ChatInput />
                        </div>
                        <CreateUserForm />
                    </>
                )}
            </div>
        </>
    );
};

export default Page1;