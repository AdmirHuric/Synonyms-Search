import WordForm from '../components/WordForm';
import { SynonymsList } from '../components/SynonymsList';
import { useSynonymsSearch } from '../context/SynonymsSearchContext';

export default function Home() {
    const { synonymsList, loading } = useSynonymsSearch();
    console.log(loading);
    console.log(synonymsList);
    return (
        <>
            <WordForm />
            <SynonymsList />
        </>
    );
}
