import { Events } from "./events";
import { SmartIconOptions, EventBus } from "./types";

export const BaseAdapter = (config: SmartIconOptions, eventBus: EventBus) =>
    class SmartIcon extends HTMLElement {
        constructor() {
            super();

            this.attachShadow({
                mode: "open",
            });
        }

        getPath() {
            return config.resolvePath(this.name);
        }

        static get observedAttributes() {
            return ["name"];
        }

        get name() {
            const nameAttr = this.getAttribute("name");
            if (!nameAttr) {
                throw new Error("name is a required attribute on SmartIcon");
            }
            return config.aliases[nameAttr] || nameAttr;
        }

        generateTemplate(): string | PromiseLike<string> {
            return "";
        }

        update = (): void | Promise<void> => {
            return;
        };

        async connectedCallback() {
            this.shadowRoot!.innerHTML = await this.generateTemplate();
            eventBus.addEventListener(Events.UPDATED, this.update);
        }

        attributeChangedCallback(attrName: string): void {
            if (this.shadowRoot && this.shadowRoot.children[0] && attrName === "name") {
                this.update();
            }
        }

        disconnectedCallback(): void {
            eventBus.removeEventListener(Events.UPDATED, this.update);
        }
    };
