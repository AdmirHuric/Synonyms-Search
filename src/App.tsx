import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import Home from './pages/Home';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Header/>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
          </Routes>
        </Container>
      </main>
      <Footer/>
    </>
  );
};

export default App;
