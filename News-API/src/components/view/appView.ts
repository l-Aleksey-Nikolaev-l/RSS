import News from './news/news';
import Sources from './sources/sources';
import { NewsType, ResponseObject, SourcesType } from '../../helpers/types';

class AppView {
    private readonly news: News;
    private readonly sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: ResponseObject): void {
        const values: NewsType[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: ResponseObject): void {
        const values: SourcesType[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
