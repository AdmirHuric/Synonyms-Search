import { Button, Container, Table } from 'react-bootstrap';
import { useSynonymsSearch } from '../context/SynonymsSearchContext';

import '../styles/SynonymsList.css';

export function SynonymsList() {
    const { synonymsList, wordInput, setWordInput } = useSynonymsSearch();
    return (
        <Container className="p-0">
            <Container className="m-3 ms-0 p-0 text-center">
                <strong>Synonyms List</strong>
            </Container>
            <Table responsive bordered>
                <thead>
                    <tr>
                        <th className="first-cl">#</th>
                        <th className="second-cl">Synonym</th>
                        <th className="third-cl">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {synonymsList.map((synonym, i) => {
                        console.log(i + 1);
                        return (
                            <tr key={i}>
                                <td className="first-cl">{i + 1}</td>
                                <td onClick={() => setWordInput({ ...wordInput, value: synonym })} className="second-cl clickable">
                                    {synonym}
                                </td>
                                <td className="third-cl">
                                    <Button variant="danger">Delete</Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {synonymsList.length === 0 ? (
                <Container className="p-0 text-center">
                    <strong>Table is empty</strong>
                </Container>
            ) : null}
        </Container>
    );
}
