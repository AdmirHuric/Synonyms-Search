import { Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header className='header bg-white shadow-sm mb-3 p-3'>
            <Navbar sticky='top'>
                <Container>
                    <NavbarBrand>Synonyms search</NavbarBrand>
                    <Nav>
                        <Nav.Link as={NavLink} to={'/'}>Home</Nav.Link>
                        <Nav.Link as={NavLink} to={'/about'}>About</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    );
};
