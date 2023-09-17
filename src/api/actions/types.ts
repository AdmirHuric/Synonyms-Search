type TResponseToken = {
    token: string;
    expiresIn: number;
    message: string;
};

type TSynonymsBody = {
    word: string;
    synonym: string;
};

type TResponseData = {
    synonyms: string[];
    message: string;
};

type TSynonymsResponse = {
    synonymsList: string[];
    ok: boolean;
};

export type { TResponseToken, TSynonymsBody, TResponseData, TSynonymsResponse };
