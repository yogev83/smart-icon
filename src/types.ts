import { SmartIcon } from "./SmartIcon";

export type SmartIconOptions = {
    aliases: Record<string, string>;
    resolvePath: (name: string) => string;
};

export type DefineOptions = {
    adapter: typeof SmartIcon;
    aliases?: SmartIconOptions["aliases"];
    resolvePath: SmartIconOptions["resolvePath"];
};

export type EventBus = Comment;
