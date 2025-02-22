type Parameters = {
    method?: 'GET';
    endpoint: string;
    options?: {
        sources: string;
        pageSize: number;
    };
};

type UrlOptions = {
    [option: string]: string | number;
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

export { Parameters, UrlOptions, SourcesType, NewsType, ResponseObject };
