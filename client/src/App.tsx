// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Home from "./pages/Home"
// import About from "./pages/About"
// import Dashboard from "./pages/Dashboard"
// import Projects from "./pages/Projects"
// import SignIn from "./pages/SignIn"
// import SignUp from "./pages/SignUp"
// import Header from "./components/Header"
// import FooterComp from "./components/FooterComp"

// const App = () => {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/projects" element={<Projects />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//       </Routes>
//       <FooterComp />
//     </Router>
//   )
// }

// export default App

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import FooterComp from "./components/FooterComp";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
        <FooterComp />
      </Router>
    </div>
  );
};

export default App;
