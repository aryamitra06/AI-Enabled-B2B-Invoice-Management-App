import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Fetch from './components/Fetch';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Fetch />
        <Footer />
        <ToastContainer/>
      </Router>
    </>
  );
}

export default App;
