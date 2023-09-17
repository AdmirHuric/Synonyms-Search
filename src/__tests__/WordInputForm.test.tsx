import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SynonymsSearchProvider } from '../context/SynonymsSearchContext';
import { getById } from './utils';
import WordInputForm from '../components/WordInputForm';

const renderWordInput = () => {
    return render(
        <SynonymsSearchProvider>
            <WordInputForm />
        </SynonymsSearchProvider>
    );
};

describe('Word Input Form', () => {
    it('expects word input to be in document', () => {
        const { container } = renderWordInput();

        const inputElement = getById(container, 'word-input');
        expect(inputElement).toBeInTheDocument();
    });

    it('expects add new synonym button to be in document', () => {
        renderWordInput();

        const buttonElement = screen.getByText('Add new synonym');
        expect(buttonElement).toBeInTheDocument();
    });
});
