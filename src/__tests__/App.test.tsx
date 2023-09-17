import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { getById } from './utils';
import App from '../App';

describe('App', () => {
    it('expects header to be in the document', () => {
        const { container } = render(
            <Router>
                <App />
            </Router>
        );

        const headerElement = getById(container, 'header');
        expect(headerElement).toBeInTheDocument();
    });

    it('expects footer to be in the document', () => {
        const { container } = render(
            <Router>
                <App />
            </Router>
        );

        const footerElement = getById(container, 'footer');
        expect(footerElement).toBeInTheDocument();
    });

    it('expects word input form to be in the document', () => {
        const { container } = render(
            <Router>
                <App />
            </Router>
        );

        const wordInputFormElement = getById(container, 'word-input-form');
        expect(wordInputFormElement).toBeInTheDocument();
    });

    it('expects synonyms list to be in the document', () => {
        const { container } = render(
            <Router>
                <App />
            </Router>
        );

        const synonymsListElement = getById(container, 'synonyms-list');
        expect(synonymsListElement).toBeInTheDocument();
    });
});
