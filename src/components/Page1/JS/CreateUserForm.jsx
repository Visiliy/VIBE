import "../UX/CreateUserForm.css";

const CreateUserForm = () => {
    return (
        <div className="create-user-form">
            <div className="user-form">
                <div className="user-name-input-div">
                    <input placeholder="Username"/>
                    <button>→</button>
                </div>
                <div className="users">
                    <div className="user">
                        <p>Name</p>
                        <p className="time">online in 12:45</p>
                        <p style={{cursor: "pointer"}}>✖</p>
                    </div>
                </div>
                <button>Create chat</button>
            </div>
            
        </div>
    );
};

export default CreateUserForm;