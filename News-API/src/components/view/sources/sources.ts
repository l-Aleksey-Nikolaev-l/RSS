import './sources.css';
import { SourcesType } from '../../../helpers/types';

class Sources {
    draw(data: SourcesType[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
        const sources: HTMLElement = document.querySelector('.sources') as HTMLElement;

        data.forEach((item: SourcesType): void => {
            const sourceClone: HTMLTemplateElement = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;
            const elName: HTMLElement = sourceClone.querySelector('.source__item-name') as HTMLElement;
            elName.textContent = item.name;

            const elSpan: HTMLElement = sourceClone.querySelector('.source__item') as HTMLElement;
            elSpan.setAttribute('data-source-id', item.id);
            fragment.append(sourceClone);
        });

        sources.append(fragment);
    }
}

export default Sources;
