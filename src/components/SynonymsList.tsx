import { Button, Container, Table } from 'react-bootstrap';
import { useSynonymsSearch } from '../context/SynonymsSearchContext';

export function SynonymsList() {
    const { synonymsList, wordInput, setWordInput, synonymInput, deleteExistingSynonym, loading } = useSynonymsSearch();

    return (
        <Container id="synonyms-list" className="p-0 pb-5 border-bottom">
            <Container className="m-3 ms-0 p-0 text-center">
                <strong>Synonyms List</strong>
            </Container>
            <Table responsive bordered striped className="mb-0">
                <thead>
                    <tr>
                        <th className="first-cl">#</th>
                        <th className="second-cl">Synonym</th>
                        <th className="third-cl">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {synonymsList.map((synonym, i) => {
                        return (
                            <tr key={`synonym-${i}`}>
                                <td className="first-cl">{i + 1}</td>
                                <td onClick={() => setWordInput({ ...wordInput, value: synonym })} className="second-cl clickable">
                                    {synonym}
                                </td>
                                <td className="third-cl">
                                    <Button
                                        onClick={() => {
                                            deleteExistingSynonym(synonym);
                                        }}
                                        disabled={loading || synonymInput.showModal}
                                        variant="danger"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {synonymsList.length === 0 ? (
                <Container className="p-0 my-3 text-center">
                    <strong>Table is empty</strong>
                </Container>
            ) : null}
        </Container>
    );
}
