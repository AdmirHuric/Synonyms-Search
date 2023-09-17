import { Dispatch, SetStateAction, ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { getSynonymsList, addSynonym, deleteSynonym } from '../api/actions/synonyms';
import { TSynonymsResponse } from '../api/actions/types';
import config from '../config/config';

type TSynonymsSearchProviderProps = {
    children: ReactNode;
};

type TWordInput = {
    value: string;
    typing: boolean;
    ok: boolean;
};

type TSynonymInput = {
    value: string;
    typing: boolean;
    ok: boolean;
    showModal: boolean;
};

type TSynonymsSearch = {
    wordInput: TWordInput;
    setWordInput: Dispatch<SetStateAction<TWordInput>>;
    synonymInput: TSynonymInput;
    setSynonymInput: Dispatch<SetStateAction<TSynonymInput>>;
    addNewSynonym: () => void;
    deleteExistingSynonym: (synonym: string) => void;
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
        [synonymInput, setSynonymInput] = useState<TSynonymInput>({ value: '', typing: false, ok: true, showModal: false }),
        [synonymsList, setSynonymsList] = useState<string[]>([]),
        [loading, setLoading] = useState(false);

    const addNewSynonym = () => {
        const word = wordInput.value,
            synonym = synonymInput.value;

        if (word && synonym) {
            setLoading(true);

            addSynonym({ word, synonym }).then((response: TSynonymsResponse) => {
                if (!response.ok) {
                    setSynonymInput({ ...synonymInput, ok: false });
                } else {
                    setSynonymInput({ ...synonymInput, ok: true, showModal: false });
                    setSynonymsList(response.synonymsList);
                }

                setLoading(false);
            });
        }
    };

    const deleteExistingSynonym = (synonym: string) => {
        const word = wordInput.value;

        if (word && synonym) {
            setLoading(true);

            deleteSynonym({ word, synonym }).then((response: TSynonymsResponse) => {
                if (response.ok) {
                    setSynonymsList(response.synonymsList);
                }

                setLoading(false);
            });
        }
    };

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

                getSynonymsList(value).then((response: TSynonymsResponse) => {
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
        } else {
            setWordInput({ ...wordInput, typing: false });
            setSynonymsList([]);
        }
    }, [wordInput.value]);

    useEffect(() => {
        setSynonymInput({ ...synonymInput, ok: true });
    }, [synonymInput.value]);

    useEffect(() => {
        if (!synonymInput.showModal) {
            setSynonymInput({ ...synonymInput, typing: false, ok: true, value: '' });
        }
    }, [synonymInput.showModal]);

    return (
        <SynonymsSearchContext.Provider
            value={{
                wordInput,
                setWordInput,
                synonymInput,
                setSynonymInput,
                addNewSynonym,
                deleteExistingSynonym,
                synonymsList,
                setSynonymsList,
                loading,
                setLoading
            }}
        >
            {children}
        </SynonymsSearchContext.Provider>
    );
};

export { useSynonymsSearch, SynonymsSearchProvider };
