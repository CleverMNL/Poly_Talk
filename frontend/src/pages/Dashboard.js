import ChatBox from "../components/ChatBox";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <ChatBox />
        </div>
    );
};

export default Dashboard;
