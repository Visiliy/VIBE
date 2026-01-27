import ChatInput from "./JS/ChatInput";
import Chats from "./JS/Chats";
import Head from "./JS/Head";
import "./Page1.css";

const Page1 = ({ dataCloud }) => {
    return (
        <>
            <Head src={dataCloud.logo_srs} app_name={dataCloud.app_name}/>
            <div className="container">
                <Chats />
                <div className="main-chat-window">
                    <p>Stay informed, be on VIBE</p>
                    <ChatInput />
                </div>
                
            </div>
            
        </>
    );
};

export default Page1;