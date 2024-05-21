import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./styles/index.scss"
import Scroll from "./app/classes/scroll.ts"

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)

declare global {
  interface Window {
    $(el: string): HTMLElement
    $$(el: string): HTMLElement[]
    $scroll: Scroll
  }
}
