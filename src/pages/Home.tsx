import {Container, Form, Button, Row, Col, Table } from 'react-bootstrap';

export default function Home() {
    return (
        <>
            <Container className='mb-5 p-0'>
                <Form>
                    <Row>
                        <Col className="col-10">
                            <Form.Group controlId='word'>
                                <Form.Control type='text' placeholder='Enter word...'/>
                                <Form.Text className='text-muted'>
                                    Search for synonyms
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col className="col-2">
                            <Button className='float-end'>Add new synonym</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <Container className='p-0'>
                <Table striped bordered responsive className='text-center'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Synonym</th>
                            <th>Action</th>
                        </tr>
                        
                    </thead>
                </Table>
            </Container>
        </>
    );
}
