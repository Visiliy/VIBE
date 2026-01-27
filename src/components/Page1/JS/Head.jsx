import "../UX/Head.css";
import { useNavigate } from "react-router-dom";

const Head = ({ src, app_name }) => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/authorization");
    };

    return (
        <div className="head-wrapper">
            <div className="logo-div">
                <img src={src} />
                <p>{app_name}</p>
            </div>
            <button onClick={handleLoginClick}>Login</button>
        </div>
    );
};

export default Head;
