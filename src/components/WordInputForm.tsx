import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useSynonymsSearch } from '../context/SynonymsSearchContext';

export default function WordInputForm() {
    const { wordInput, setWordInput, synonymInput, setSynonymInput, loading, synonymsList } = useSynonymsSearch(),
        { value, typing, ok } = wordInput;

    return (
        <Container className="mb-5 p-0 border-bottom">
            <Form id="word-input-form">
                <Row className="pb-3">
                    <Col className="col-lg-10 col-sm-8 col-xs-6">
                        <Form.Group controlId="wordInput">
                            <input
                                id="word-input"
                                className={`form-control ${!ok ? 'border-danger' : value.length > 0 && synonymsList.length === 0 ? 'border-warning' : ''}`}
                                value={value}
                                onChange={(e) => setWordInput({ ...wordInput, value: e.target.value })}
                                type="text"
                                placeholder="Enter word..."
                            />
                            <Form.Text className="text-muted">Search for synonyms</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col className="col-lg-2 col-sm-4 col-xs-6">
                        <Button
                            className="float-end"
                            disabled={value.length === 0 || typing || loading || synonymInput.showModal}
                            onClick={() => setSynonymInput({ ...synonymInput, showModal: true })}
                        >
                            Add new synonym
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
