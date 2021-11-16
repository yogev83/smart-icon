import { SmartIconOptions, EventBus } from "../types";
import { BaseAdapter } from "../BaseAdapter";

type SVGFetchAdapterOptions = {
    querySelector?: (name: string) => string;
};

export const SVGFetchAdapter =
    (options: SVGFetchAdapterOptions = {}) =>
    (config: SmartIconOptions, eventBus: EventBus) => {
        return class SVGFetchAdapter extends BaseAdapter(config, eventBus) {
            async getSvgText(): Promise<string> {
                const svgText = await fetch(this.getPath()).then((res) => res.text());

                if (!options.querySelector) {
                    return svgText;
                }

                const fragment = document
                    .createRange()
                    .createContextualFragment(svgText)
                    .querySelector(options.querySelector(this.name));

                const viewBox = (fragment && fragment.getAttribute("viewBox")) || "";

                return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" ${
                    (viewBox && `viewBox="${viewBox}"`) || ""
                }>${(fragment && fragment.innerHTML) || null}</svg>`;
            }
            generateTemplate() {
                return this.getSvgText();
            }
            update = async () => {
                this.shadowRoot!.innerHTML = await this.generateTemplate();
            };
        };
    };
