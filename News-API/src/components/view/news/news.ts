import './news.css';
import { NewsType } from '../../../helpers/types';

class News {
    public draw(newsArray: NewsType[]): void {
        let selectedNews: NewsType[];

        if (newsArray.length >= 10) {
            selectedNews = newsArray.filter((_newsItem: NewsType, index: number): boolean => index < 10);
        } else {
            selectedNews = newsArray;
        }

        const fragment: DocumentFragment = <DocumentFragment>document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = <HTMLTemplateElement>document.querySelector('#newsItemTemp');
        const newsSection: HTMLElement = <HTMLElement>document.querySelector('.news');

        selectedNews.forEach((item: NewsType, index: number): void => {
            const newsClone: HTMLTemplateElement = <HTMLTemplateElement>newsItemTemp.content.cloneNode(true);
            const newsItem: HTMLElement = <HTMLElement>newsClone.querySelector('.news__item');
            const newsImage: HTMLElement = <HTMLElement>newsClone.querySelector('.news__meta-photo');
            const newsAuthor: HTMLElement = <HTMLElement>newsClone.querySelector('.news__meta-author');
            const newsDate: HTMLElement = <HTMLElement>newsClone.querySelector('.news__meta-date');
            const newsTitle: HTMLElement = <HTMLElement>newsClone.querySelector('.news__description-title');
            const newsSource: HTMLElement = <HTMLElement>newsClone.querySelector('.news__description-source');
            const newsDescription: HTMLElement = <HTMLElement>newsClone.querySelector('.news__description-content');
            const newsLink: HTMLElement = <HTMLElement>newsClone.querySelector('.news__read-more a');

            if (index % 2) {
                newsItem.classList.add('alt');
            }

            newsImage.style.backgroundImage = `url(${item.urlToImage})`;
            newsAuthor.textContent = item.author || item.source.name;
            newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            newsTitle.textContent = item.title;
            newsSource.textContent = item.source.name;
            newsDescription.textContent = item.description;
            newsLink.setAttribute('href', item.url);
            fragment.append(newsClone);
        });

        while (newsSection.firstChild) {
            newsSection.removeChild(newsSection.firstChild);
        }
        newsSection.appendChild(fragment);
    }
}

export default News;
