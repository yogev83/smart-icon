<div align="center">
    <img alt="Smart Icon" width="33%" src="https://raw.githubusercontent.com/erictooth/smart-icon/main/media/smart-icon-logo.svg">
</div>
<h3 align="center" style="border-bottom: none;">A hot swappable icon loader for design systems</h3>
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
