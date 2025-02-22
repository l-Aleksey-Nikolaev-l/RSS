import News from './news/news';
import Sources from './sources/sources';
import { ResponseObject } from '../../helpers/types';
import { defineType } from '../../helpers/generics';

class AppView {
    private readonly news: News;
    private readonly sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: ResponseObject): void {
        this.news.draw(defineType(data, 'articles'));
    }

    public drawSources(data: ResponseObject): void {
        this.sources.draw(defineType(data, 'sources'));
    }
}

export default AppView;
