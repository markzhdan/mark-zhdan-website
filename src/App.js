import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import Blogs from "./pages/Blogs/Blogs";

function App() {
  return (
    <Router>
      <main className="App">
        <Routes>
          <Route exact path="/" element={<Homepage />} />

          <Route exact path="/blogs" element={<Blogs />} />

          <Route path="*" element={<Homepage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
