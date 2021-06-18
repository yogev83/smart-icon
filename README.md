<div align="center">
    <img alt="Smart Icon" width="33%" src="https://raw.githubusercontent.com/erictooth/smart-icon/main/media/smart-icon-logo.svg">
</div>
<h3 align="center" style="border-bottom: none;">A hot-swappable icon loader for component libraries and themeable apps</h3>
<p align="center">
    <img src="https://img.shields.io/npm/l/smart-icon?color=blue">
    <a href="https://www.npmjs.com/package/smart-icon">
        <img alt="npm latest version" src="https://img.shields.io/npm/v/smart-icon/latest.svg">
    </a>
    <a href="https://bundlephobia.com/package/smart-icon">
        <img src="https://img.shields.io/bundlephobia/minzip/smart-icon">
    </a>
</p>

## Example

```jsx
import { define, SVGUseAdapter } from "smart-icon";

define("smart-icon", {
    adapter: SVGUseAdapter,
    resolvePath: (name) => `/icons/${name}.svg#icon`
});

function App() {
    return <p>Hello <smart-icon name="world"></smart-icon></p>
}

ReactDOM.render(<App />, document.getElementById("#root");
```

## Why

A generic component library should strive to integrate well into any existing design system or application. Typically this means leaving styling (CSS) up to the consumer of the library, but until now there was no simple, flexible, and framework-agnostic way to keep icons decoupled from JavaScript. **smart-icon** is a tiny web component that dynamically resolves an icon’s name to a path at runtime with support for a variety of icon formats and loading methods.

## Adapters

### SVGUseAdapter
This adapter is great for loading SVGs directly into the DOM by leveraging the `<use />` element. This allows icons to be stylable via CSS, such as changing the fill color on hover for example. It’s flexible with both SVG sprite sheets or (preferably for performance reasons) standalone SVG icons.

## Alternatives

### no-js support
If you don’t want to require JavaScript support for your application, you can use SSR (not yet documented) to directly render the output of **smart-icon** into HTML. You will lose the flexibility of runtime path resolution, but this allows you to wait until build time to configure the icon pack that’s used.
