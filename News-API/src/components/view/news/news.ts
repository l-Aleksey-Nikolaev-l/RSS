import './news.css';
import { NewsType } from '../../../helpers/types';

class News {
    draw(newsArray: NewsType[]): void {
        let selectedNews: NewsType[];

        if (newsArray.length >= 10) {
            selectedNews = newsArray.filter((_newsItem: NewsType, index: number): boolean => index < 10);
        } else {
            selectedNews = newsArray;
        }

        const fragment: DocumentFragment = document.createDocumentFragment() as DocumentFragment;
        const newsItemTemp: HTMLTemplateElement = document.querySelector('#newsItemTemp') as HTMLTemplateElement;
        const newsSection: HTMLElement = document.querySelector('.news') as HTMLElement;

        selectedNews.forEach((item: NewsType, index: number): void => {
            const newsClone: HTMLTemplateElement = newsItemTemp.content.cloneNode(true) as HTMLTemplateElement;
            const newsItem: HTMLElement = newsClone.querySelector('.news__item') as HTMLElement;
            const newsImage: HTMLElement = newsClone.querySelector('.news__meta-photo') as HTMLElement;
            const newsAuthor: HTMLElement = newsClone.querySelector('.news__meta-author') as HTMLElement;
            const newsDate: HTMLElement = newsClone.querySelector('.news__meta-date') as HTMLElement;
            const newsTitle: HTMLElement = newsClone.querySelector('.news__description-title') as HTMLElement;
            const newsSource: HTMLElement = newsClone.querySelector('.news__description-source') as HTMLElement;
            const newsDescription: HTMLElement = newsClone.querySelector('.news__description-content') as HTMLElement;
            const newsLink: HTMLElement = newsClone.querySelector('.news__read-more a') as HTMLElement;

            if (index % 2) {
                newsItem.classList.add('alt');
            }

            newsImage.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
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
