import { useState, useRef } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useSynonymsSearch } from '../context/SynonymsSearchContext';
import { getSynonymsList } from '../api/actions/synonyms';
import config from '../config/config';

let wordInputTimeout: ReturnType<typeof setTimeout> | null;

export default function WordForm() {
    const wordInputRef = useRef<HTMLInputElement>(null),
        [typing, setTyping] = useState(false),
        { word, setWord, loading, setLoading, setSynonymsList } = useSynonymsSearch(),
        onWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;

            if (wordInputRef.current) {
                wordInputRef.current.className = 'form-control';
            }

            setTyping(true);
            setLoading(true);

            if (wordInputTimeout) {
                clearTimeout(wordInputTimeout);
                wordInputTimeout = null;
            }

            wordInputTimeout = setTimeout(() => {
                setTyping(false);
                setWord(value);

                getSynonymsList(value).then((response) => {
                    if (!response.ok) {
                        setWord('');

                        if (wordInputRef.current) {
                            wordInputRef.current.className = 'form-control border-danger';
                            wordInputRef.current.value = '';
                        }
                    }

                    setSynonymsList(response.synonymsList);
                    setLoading(false);
                });
            }, config.wordInputDelay);
        };

    return (
        <Container className="mb-5 p-0 border-bottom">
            <Form>
                <Row className="pb-3">
                    <Col className="col-lg-10 col-sm-8 col-xs-6">
                        <Form.Group controlId="word">
                            <Form.Control ref={wordInputRef} onChange={onWordChange} type="text" placeholder="Enter word..." />
                            <Form.Text className="text-muted">Search for synonyms</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col className="col-lg-2 col-sm-4 col-xs-6">
                        <Button disabled={word.length === 0 || typing || loading} className="float-end">
                            Add new synonym
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
