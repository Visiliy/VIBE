import AuthorizationService from "../../../Servises/AuthorizationService";
import "../UX/Authorization.css";
import { useState, useRef } from "react";

const Authorization = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const usernameRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            let result;
            if (isLogin) {
                result = await AuthorizationService.login(
                    emailRef.current.value,
                    passwordRef.current.value
                );
            } else {
                result = await AuthorizationService.register(
                    usernameRef.current.value,
                    emailRef.current.value,
                    passwordRef.current.value
                );
            }
            console.log("Server response:", result);
        } catch (err) {
            console.error("Auth error:", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-main-wrapper">
            <div className="auth-authorization-wrapper">
                <div className="auth-container">
                    <h1 className="auth-title">{isLogin ? "Welcome" : "Create Account"}</h1>
                    <div className="auth-tabs">
                        <button 
                            className={`auth-tab ${isLogin ? 'active' : ''}`} 
                            onClick={() => setIsLogin(true)}
                            disabled={loading}
                        >
                            Login
                        </button>
                        <button 
                            className={`auth-tab ${!isLogin ? 'active' : ''}`} 
                            onClick={() => setIsLogin(false)}
                            disabled={loading}
                        >
                            Register
                        </button>
                    </div>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="auth-input-group">
                                <input 
                                    ref={usernameRef}
                                    type="text" 
                                    placeholder="Username" 
                                    required 
                                    disabled={loading}
                                />
                            </div>
                        )}
                        <div className="auth-input-group">
                            <input 
                                ref={emailRef}
                                type="email" 
                                placeholder="Email" 
                                required 
                                disabled={loading}
                            />
                        </div>
                        <div className="auth-input-group">
                            <input 
                                ref={passwordRef}
                                type="password" 
                                placeholder="Password" 
                                required 
                                disabled={loading}
                            />
                        </div>
                        {error && (
                            <div className="auth-error" style={{color: 'red', marginBottom: '10px'}}>
                                {error}
                            </div>
                        )}
                        <button 
                            type="submit" 
                            className="auth-submit-btn"
                            disabled={loading}
                        >
                            {loading ? "Processing..." : (isLogin ? "Sign In" : "Sign Up")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Authorization;
