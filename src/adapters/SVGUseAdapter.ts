import { SmartIconOptions, EventBus } from "../types";
import { BaseAdapter } from "../BaseAdapter";

export const SVGUseAdapter = (config: SmartIconOptions, eventBus: EventBus) =>
    class SVGUseAdapter extends BaseAdapter(config, eventBus) {
        generateTemplate() {
            const href = this.getPath();
            return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><use id="smart-icon__use" xlink:href="${href}" href="${href}" /></svg>`;
        }

        update = () => {
            if (!this.shadowRoot?.children[0]) {
                return;
            }
            const useElem = this.shadowRoot.getElementById("smart-icon__use")!;
            const href = this.getPath();
            useElem.setAttribute("xlink:href", href);
            useElem.setAttribute("href", href);
        };
    };
