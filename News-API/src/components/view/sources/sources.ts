import './sources.css';
import { SourcesType } from '../../../helpers/types';

class Sources {
    public draw(data: SourcesType[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = <HTMLTemplateElement>document.querySelector('#sourceItemTemp');
        const sources: HTMLElement = <HTMLElement>document.querySelector('.sources');

        data.forEach((item: SourcesType): void => {
            const sourceClone: HTMLTemplateElement = <HTMLTemplateElement>sourceItemTemp.content.cloneNode(true);
            const elName: HTMLElement = <HTMLElement>sourceClone.querySelector('.source__item-name');
            elName.textContent = item.name;

            const elSpan: HTMLElement = <HTMLElement>sourceClone.querySelector('.source__item');
            elSpan.setAttribute('data-source-id', item.id);
            fragment.append(sourceClone);
        });

        sources.append(fragment);
    }
}

export default Sources;
