import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ThePage from "./ThePage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThePage />
  </StrictMode>,
)
