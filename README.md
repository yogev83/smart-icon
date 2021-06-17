<h1 align="center">Smart Icon</h1>
<h3 align="center" style="border-bottom: none;">A hot swappable icon loader for design systems</h3>
<p align="center">
    <img src="https://img.shields.io/npm/l/smart-icon?color=blue&style=flat-square">
    <a href="https://www.npmjs.com/package/smart-icon">
        <img alt="npm latest version" src="https://img.shields.io/npm/v/smart-icon/latest.svg?style=flat-square">
    </a>
    <a href="https://bundlephobia.com/package/smart-icon">
        <img src="https://img.shields.io/bundlephobia/minzip/smart-icon?style=flat-square">
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
