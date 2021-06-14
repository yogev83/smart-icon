import { Events } from "./events";
import { DefineOptions, SmartIconOptions, EventBus } from "./types";

type DefineResult = {
    update: (
        arg0: Partial<SmartIconOptions> | ((prev: SmartIconOptions) => Partial<SmartIconOptions>)
    ) => void;
};

type DefineFn = (componentName: string, options: DefineOptions) => DefineResult;

export const define: DefineFn = (componentName, options) => {
    const config: SmartIconOptions = {
        resolvePath: options.resolvePath,
        aliases: options.aliases || {},
    };

    const eventBus: EventBus = new Comment("smart-icon-events");

    const triggerUpdate = (): void => {
        eventBus.dispatchEvent(new CustomEvent(Events.UPDATED));
    };

    window.customElements.define(componentName, options.adapter(config, eventBus));

    return {
        update: (options) => {
            const opts = typeof options === "function" ? options(config) : options;

            for (const key in opts) {
                //@ts-ignore
                config[key] = opts[key];
            }

            triggerUpdate();
        },
    };
};
