import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signin from './compenet/signin'
import Signup from './compenet/signup'
import { Verificationemail } from './compenet/accountverification';
import { HomePage } from './compenet/home';
import BackApp from './compenet/background/Error';
function App() {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email/Inprogress/:id" element={<Verificationemail />} />
      <Route path="/verify-email/:id" element={<Verificationemail />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<BackApp />} />
    </Routes>
  );
}

export default App;
