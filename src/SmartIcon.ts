import { Events } from "./events";
import { SmartIconOptions, EventBus } from "./types";

export const SmartIcon = (config: SmartIconOptions, eventBus: EventBus) =>
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

        generateTemplate?(): string;
        update?(): void;

        connectedCallback() {
            if (!this.shadowRoot) {
                return;
            }
            this.shadowRoot.innerHTML = this.generateTemplate!();
            eventBus.addEventListener(Events.UPDATED, this.update!);
        }

        attributeChangedCallback(attrName: string): void {
            if (attrName === "name") {
                this.update!();
            }
        }

        disconnectedCallback(): void {
            eventBus.removeEventListener(Events.UPDATED, this.update!);
        }
    };
