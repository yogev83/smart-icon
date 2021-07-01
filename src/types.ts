import { BaseAdapter } from "./BaseAdapter";

export type SmartIconOptions = {
    aliases: Record<string, string>;
    resolvePath: (name: string) => string;
};

export type DefineOptions = {
    adapter: typeof BaseAdapter;
    aliases?: SmartIconOptions["aliases"];
    resolvePath: SmartIconOptions["resolvePath"];
};

export type EventBus = Comment;
