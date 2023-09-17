import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useSynonymsSearch } from '../context/SynonymsSearchContext';

export default function SynonymInputFormModal() {
    const { synonymInput, setSynonymInput, addNewSynonym, loading } = useSynonymsSearch(),
        { value, typing, ok, showModal } = synonymInput;

    return (
        <Modal show={showModal} onHide={() => setSynonymInput({ ...synonymInput, showModal: false })}>
            <Modal.Header closeButton>
                <Modal.Title>Add Synonym</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="synonymInput">
                        <input
                            className={`form-control ${!ok ? 'border-danger' : ''}`}
                            value={value}
                            onChange={(e) => setSynonymInput({ ...synonymInput, value: e.target.value })}
                            type="text"
                            placeholder="Enter synonym..."
                        />
                        <Form.Text className="text-muted">Add new synonym</Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    disabled={!ok || value.length === 0 || typing || loading}
                    variant="primary"
                    onClick={() => {
                        addNewSynonym();
                    }}
                >
                    {loading ? <Spinner size="sm" /> : 'Add'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
