import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/conversation" element={<ConversationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
    </Router>
  );
}


function ConversationPage() {
  return (
    <iframe
      src="/home_polytalk.html"
      style={{ width: "100%", height: "100vh", border: "none" }}
      title="Conversation Page"
    ></iframe>
  );
}

function ConversationPage() {
  return (
    <iframe
      src="/home_polytalk.html"
      style={{ width: "100%", height: "100vh", border: "none" }}
      title="Conversation Page"
    ></iframe>
  );
}

function LoginPage() {
  return (
    <iframe
      src="/login.html"
      style={{ width: "100%", height: "100vh", border: "none" }}
      title="Login Page"
    ></iframe>
  );
}

function OnboardingPage() {
  return (
    <iframe
      src="/onboarding.html"
      style={{ width: "100%", height: "100vh", border: "none" }}
      title="Onboarding Page"
    ></iframe>
  );
}


export default App;