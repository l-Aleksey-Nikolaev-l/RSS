type RequestApi = {
    apiUrl: string;
    apiKey: { apiKey: string };
};

type Parameters = {
    method?: 'GET';
    endpoint: string;
    options?: object;
};

type SourcesType = {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
};

type NewsType = {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};

type ResponseObject = {
    articles: NewsType[];
    sources: SourcesType[];
    status: string;
    totalResults: number;
};

type ResponseArray = SourcesType | NewsType;

export { RequestApi, Parameters, SourcesType, NewsType, ResponseObject, ResponseArray };
