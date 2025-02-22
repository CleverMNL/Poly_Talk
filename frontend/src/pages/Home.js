import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <h1>Welcome to LLaMA Translator</h1>
            <button onClick={() => navigate("/dashboard")}>Quick Translate</button>
            <button onClick={() => navigate("/dashboard")}>Login</button>
        </div>
    );
};

export default Home;
