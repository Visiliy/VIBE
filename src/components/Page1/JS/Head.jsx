import "../UX/Head.css";

const Head = ({ src, app_name }) => {
    return (
        <div className="head-wrapper">
            <div className="logo-div">
                <img src={src} />
                <p>{app_name}</p>
            </div>
            <button>Login</button>
        </div>
    );
};

export default Head;