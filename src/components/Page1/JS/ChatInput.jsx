import Cookies from "../../../Servises/Cookies";
import "../UX/ChatInput.css";
import { useRef, useCallback, useEffect, useState } from "react";

const ChatInput = ({ jwtToken, isFirstVisit, isReg, dataCloud }) => {
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const maxHeight = 200;
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const client = new ServerClient(dataCloud.base_url);
    const cookies = new Cookies();

    const adjustHeight = useCallback(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.style.height = 'auto';
        const scrollHeight = textarea.scrollHeight;
        textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }, [maxHeight]);

    const handleFilesClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = (event) => {
        const newFiles = Array.from(event.target.files);
        const currentFileNames = selectedFiles.map(f => f.name);
        const uniqueNewFiles = newFiles.filter(file => !currentFileNames.includes(file.name));
        const filesToAdd = uniqueNewFiles.slice(0, 5 - selectedFiles.length);
        setSelectedFiles(prev => [...prev, ...filesToAdd]);
        event.target.value = '';
    };

    const getFileExtension = (name) => {
        const lastDot = name.lastIndexOf(".");
        return lastDot > 0 ? name.slice(lastDot + 1) : '';
    };

    const truncateFileName = (name) => {
        const ext = getFileExtension(name);
        const nameWithoutExt = ext ? name.replace('.' + ext, '') : name;
        if (nameWithoutExt.length > 14) {
            return nameWithoutExt.slice(0, 11) + '...' + ext;
        }
        return name;
    };

    const removeFile = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const generateRandomString = (length) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    const handleSend = async () => {
        if (!message.trim() && selectedFiles.length === 0) return;
        
        setIsSending(true);
        let modelResponse;

        if (isFirstVisit) {
            const formData = {
                jwtToken,
                message,
                files: selectedFiles.map(file => ({
                    name: file.name,
                    size: file.size,
                    type: file.type
                }))
            };
            const response = await client.postRequest('/model_generate', formData);
            modelResponse = response.message;
        } else {
            const randomName = generateRandomString(8);
            const randomEmail = `${generateRandomString(10)}@example.com`;
            const randomPassword = generateRandomString(12);
            
            const registerData = { name: randomName, email: randomEmail, password: randomPassword };
            const registerResult = await client.postRequest('/register', registerData);
            
            if (registerResult.message.jwtToken) {
                cookies.set('JWT', registerResult.message.jwtToken, 1);
                cookies.set('firstVisit', 'true', 1);
                
                const generateData = {
                    jwtToken: registerResult.message.jwtToken,
                    message,
                    files: selectedFiles.map(file => ({
                        name: file.name,
                        size: file.size,
                        type: file.type
                    }))
                };
                const generateResponse = await client.postRequest('/model_generate', generateData);
                modelResponse = generateResponse.message;
            } else {
                modelResponse = registerResult.message;
            }
        }

        setIsSending(false);
        setMessage('');
        setSelectedFiles([]);
        textareaRef.current.style.height = 'auto';

        console.log('Model response:', modelResponse);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.addEventListener('input', adjustHeight);
        textarea.addEventListener('paste', () => setTimeout(adjustHeight, 0));
        window.addEventListener('resize', adjustHeight);
        textarea.addEventListener('keydown', handleKeyDown);

        adjustHeight();

        return () => {
            textarea.removeEventListener('input', adjustHeight);
            textarea.removeEventListener('paste', () => setTimeout(adjustHeight, 0));
            window.removeEventListener('resize', adjustHeight);
            textarea.removeEventListener('keydown', handleKeyDown);
        };
    }, [adjustHeight]);

    return (
        <div className="chat-input-wrapper">
            <textarea 
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write, analyze, create..."
                rows={1}
            />
            <input
                ref={fileInputRef}
                type="file"
                multiple
                style={{ display: 'none' }}
                onChange={handleFileSelect}
            />
            <div className="files-row">
                <button 
                    className="files-btn" 
                    onClick={handleFilesClick}
                    disabled={selectedFiles.length >= 5 || isSending}
                >
                    +
                </button>
                <div className="files-list">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="file-item" title={file.name}>
                            <span className="file-name">{truncateFileName(file.name)}</span>
                            <button 
                                className="remove-file"
                                onClick={() => removeFile(index)}
                                disabled={isSending}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                <button 
                    className="send-btn" 
                    onClick={handleSend}
                    disabled={isSending}
                >↑
                </button>
            </div>
        </div>
    );
};

export default ChatInput;
