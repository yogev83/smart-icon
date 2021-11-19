import { Events } from "./events";
import { DefineOptions, SmartIconOptions, EventBus } from "./types";

type DefineResult = {
    update: (
        arg0: Partial<SmartIconOptions> | ((prev: SmartIconOptions) => Partial<SmartIconOptions>)
    ) => void;
};

type DefineFn = (componentName: string, options: DefineOptions) => DefineResult;

const createdElems: Record<string, DefineResult> = {};

export const define: DefineFn = (componentName, options) => {
    if (globalThis.customElements && globalThis.customElements.get(componentName)) {
        if (createdElems[componentName]) {
            console.error(
                `smart-icon: \`${componentName}\` is already defined. If you need to update the configuration, you can use the update function instead. This error may show when used in a hot-reload development environment; to fix it you can check if the element has already been defined before calling SmartIcon.define.`
            );
            return createdElems[componentName];
        }
        throw new Error(
            `smart-icon: \`${componentName}\` has already been defined. Please choose another name.`
        );
    }

    const config: SmartIconOptions = {
        resolvePath: options.resolvePath,
        aliases: options.aliases || {},
    };

    const eventBus: EventBus = new Comment("smart-icon-events");

    const triggerUpdate = (): void => {
        eventBus.dispatchEvent(new CustomEvent(Events.UPDATED));
    };

    globalThis.customElements.define(componentName, options.adapter(config, eventBus));

    const result: DefineResult = {
        update: (options) => {
            const opts = typeof options === "function" ? options(config) : options;

            for (const key in opts) {
                //@ts-ignore
                config[key] = opts[key];
            }

            triggerUpdate();
        },
    };

    createdElems[componentName] = result;

    return result;
};
