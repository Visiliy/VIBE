import "../UX/ChatInput.css";
import { useRef, useCallback, useEffect } from "react";

const ChatInput = () => {
    const textareaRef = useRef(null);
    const maxHeight = 200;

    const adjustHeight = useCallback(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = 'auto';
        const scrollHeight = textarea.scrollHeight;
        textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }, [maxHeight]);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.addEventListener('input', adjustHeight);
        textarea.addEventListener('paste', () => setTimeout(adjustHeight, 0));
        window.addEventListener('resize', adjustHeight);

        adjustHeight();

        return () => {
            textarea.removeEventListener('input', adjustHeight);
            textarea.removeEventListener('paste', () => setTimeout(adjustHeight, 0));
            window.removeEventListener('resize', adjustHeight);
        };
    }, [adjustHeight]);

    return (
        <div className="chat-input-wrapper">
            <textarea 
                ref={textareaRef}
                placeholder="Write, analyze, create..."
                rows={1}
                style={{
                    minHeight: '40px'
                }}
            />
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <button className="files-btn">+</button>
                <button className="send-btn">↑</button>
            </div>
        </div>
    );
};

export default ChatInput;
