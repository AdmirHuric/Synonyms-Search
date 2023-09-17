import { Container, Nav, Navbar, NavbarBrand, Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSynonymsSearch } from '../context/SynonymsSearchContext';

export default function Header() {
    const { loading } = useSynonymsSearch();
    return (
        <header id="header" className="header bg-white shadow-sm mb-3 p-3">
            <Navbar sticky="top">
                <Container>
                    <NavbarBrand>Synonyms search</NavbarBrand>
                    {loading ? <Spinner /> : null}
                    <Nav>
                        <Nav.Link as={NavLink} to={'/'}>
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to={'/about'}>
                            About
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    );
}
