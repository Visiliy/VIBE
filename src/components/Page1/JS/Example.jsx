import "../UX/Example.css";

const Example = ({ name, text }) => {
    return (
        <div className="example-wrapper">
            <p className="example-name">{name}</p>
            <p className="example-text">{text}</p>
        </div>
    );
};

export default Example;