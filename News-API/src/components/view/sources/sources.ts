import './sources.css';
import { SourcesType } from '../../../helpers/types';

class Sources {
    public draw(data: SourcesType[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = <HTMLTemplateElement>document.querySelector('#sourceItemTemp');
        const sources: HTMLElement = <HTMLElement>document.querySelector('.sources');

        data.forEach((item: SourcesType): void => {
            const sourceClone: HTMLTemplateElement = <HTMLTemplateElement>sourceItemTemp.content.cloneNode(true);
            const sourceItem: HTMLOptionElement = <HTMLOptionElement>sourceClone.querySelector('.source__item');
            sourceItem.value = item.id;
            sourceItem.textContent = item.name;
            fragment.append(sourceClone);
        });

        sources.append(fragment);
    }
}

export default Sources;
