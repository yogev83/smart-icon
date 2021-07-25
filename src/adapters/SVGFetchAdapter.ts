import { SmartIconOptions, EventBus } from "../types";
import { BaseAdapter } from "../BaseAdapter";

export const SVGFetchAdapter = () => (config: SmartIconOptions, eventBus: EventBus) => {
    return class SVGFetchAdapter extends BaseAdapter(config, eventBus) {
        getSvgText(): Promise<string> {
            return fetch(this.getPath()).then((res) => res.text());
        }
        generateTemplate() {
            return this.getSvgText();
        }
        async update() {
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = await this.generateTemplate();
            }
        }
    };
};
