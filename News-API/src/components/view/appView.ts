import News from './news/news';
import Sources from './sources/sources';
import { NewsType, ResponseObject, SourcesType } from '../../helpers/types';

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ResponseObject): void {
        const values: NewsType[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ResponseObject): void {
        const values: SourcesType[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
