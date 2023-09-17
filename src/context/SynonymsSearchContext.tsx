import { Dispatch, SetStateAction, ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { getSynonymsList } from '../api/actions/synonyms';
import config from '../config/config';

type TSynonymsSearchProviderProps = {
    children: ReactNode;
};

type TWordInput = {
    value: string;
    typing: boolean;
    ok: boolean;
};

type TSynonymsSearch = {
    wordInput: TWordInput;
    setWordInput: Dispatch<SetStateAction<TWordInput>>;
    synonymsList: string[];
    setSynonymsList: Dispatch<SetStateAction<string[]>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};

let wordInputTimeout: ReturnType<typeof setTimeout> | null;

const SynonymsSearchContext = createContext({} as TSynonymsSearch),
    useSynonymsSearch = () => {
        return useContext(SynonymsSearchContext);
    };

const SynonymsSearchProvider = ({ children }: TSynonymsSearchProviderProps) => {
    const [wordInput, setWordInput] = useState<TWordInput>({ value: '', typing: false, ok: true }),
        [synonym, setSynonym] = useState(''),
        [synonymsList, setSynonymsList] = useState<string[]>([]),
        [loading, setLoading] = useState(false);

    useEffect(() => {
        const value = wordInput.value;

        if (wordInputTimeout) {
            clearTimeout(wordInputTimeout);
            wordInputTimeout = null;
        }

        if (value.length > 0) {
            setWordInput({ ...wordInput, typing: true, ok: true });

            wordInputTimeout = setTimeout(() => {
                setLoading(true);

                getSynonymsList(value).then((response) => {
                    if (!response.ok) {
                        setWordInput({ value: '', typing: false, ok: false });
                        setSynonymsList([]);
                    } else {
                        setWordInput({ ...wordInput, typing: false });
                        setSynonymsList(response.synonymsList);
                    }

                    setLoading(false);
                });
            }, config.wordInputDelay);
        }
    }, [wordInput.value]);

    return <SynonymsSearchContext.Provider value={{ wordInput, setWordInput, synonymsList, setSynonymsList, loading, setLoading }}>{children}</SynonymsSearchContext.Provider>;
};

export { useSynonymsSearch, SynonymsSearchProvider };
