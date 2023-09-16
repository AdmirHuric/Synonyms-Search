import { Container } from 'react-bootstrap';

export default function Footer() {
    return (
        <footer className="footer p-3 bg-white shadow-sm fixed-bottom">
            <Container>
                <span className="float-end">
                    <small>&copy; {new Date().getFullYear()}, Reinvent</small>
                </span>
            </Container>
        </footer>
    );
}
