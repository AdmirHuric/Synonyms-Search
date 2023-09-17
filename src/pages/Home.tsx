import WordInputForm from '../components/WordInputForm';
import SynonymInputFormModal from '../components/SynonymInputFormModal';
import { SynonymsList } from '../components/SynonymsList';

export default function Home() {
    return (
        <>
            <WordInputForm />
            <SynonymInputFormModal />
            <SynonymsList />
        </>
    );
}
