import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { SynonymsSearchProvider } from './context/SynonymsSearchContext';
import { useOnMountUnsafe } from './hooks/onMountUnsafe';
import Home from './pages/Home';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';
import { authorizeUser } from './api/actions/users';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    useOnMountUnsafe(() => {
        authorizeUser();
    });

    return (
        <SynonymsSearchProvider>
            <ToastContainer />
            <Header />
            <main>
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Container>
            </main>
            <Footer />
        </SynonymsSearchProvider>
    );
}

export default App;
