import { Container, Table } from 'react-bootstrap';
import '../styles/SynonymsList.css';

export function SynonymsList() {
    return (
        <Container className="p-0">
            <Table striped responsive className="text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Synonym</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </Table>
        </Container>
    );
}
