import { Dispatch, SetStateAction, ReactNode, createContext, useContext, useState } from 'react';

type TSynonymsSearchProviderProps = {
    children: ReactNode;
};

type TSynonymsSearch = {
    word: string;
    setWord: Dispatch<SetStateAction<string>>;
    synonym: string;
    setSynonym: Dispatch<SetStateAction<string>>;
    synonymsList: string[];
    setSynonymsList: Dispatch<SetStateAction<string[]>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};

const SynonymsSearchContext = createContext({} as TSynonymsSearch);

const useSynonymsSearch = () => {
    return useContext(SynonymsSearchContext);
};

const SynonymsSearchProvider = ({ children }: TSynonymsSearchProviderProps) => {
    const [word, setWord] = useState(''),
        [synonym, setSynonym] = useState(''),
        [synonymsList, setSynonymsList] = useState<string[]>([]),
        [loading, setLoading] = useState(false);

    return <SynonymsSearchContext.Provider value={{ word, setWord, synonym, setSynonym, synonymsList, setSynonymsList, loading, setLoading }}>{children}</SynonymsSearchContext.Provider>;
};

export { useSynonymsSearch, SynonymsSearchProvider };
