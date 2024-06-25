import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import AlumniLoginLegacy from "./components/login/AlumniLoginLegacy";
import Notification from "./components/notification/notification";
import TripleLogin from './components/login/TripleLogin';
import Approval_page from "./components/admin/approval_page";
import Feedback from "./components/forms/feedbackForm";
import MessageBoard from "./components/message/messageBoard";
import Profile from "./components/profile/profile.jsx";
import Home from './components/home/home';
import SignUpPage from './components/login/SignUpPage';
import ScreenOne from "./components/onBoardings/screenOne.jsx";
import ScreenTwo from "./components/onBoardings/screenTwo.jsx";
import ScreenThree from "./components/onBoardings/screenThree.jsx";
import AdminDashboard from "./components/admin/adminDashboard/adminDashboard.jsx";
import EditProfile from "./components/editprofile/editprofile.jsx";


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/approval" element={<Approval_page />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/messages" element={<MessageBoard />} />
          <Route path="/profile" element={<Profile />} />  
          <Route path="/" element={<Home />} />  
          <Route path="/login" element = {<TripleLogin />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/onboarding1" element={<ScreenOne />} />
          <Route path="/onboarding2" element={<ScreenTwo />} />
          <Route path="/onboarding3" element={<ScreenThree />} />
          <Route path="/admindashboard" element={<AdminDashboard/>} />
          <Route path="/:id/editprofile" element={<EditProfile />} />  
        </Routes>
      </div>
    </Router>

  );
}

export default App;
