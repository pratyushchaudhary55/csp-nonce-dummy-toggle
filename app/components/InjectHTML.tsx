'use client'

import { useEffect } from 'react'

export function InjectHtml({
  html,
  target,
}: {
  html?: string
  target: 'head' | 'body'
}) {
  useEffect(() => {
    if (!html) return
    
    const root = target === 'head' ? document.head : document.body
    const container = document.createElement('div')
    container.innerHTML = html.trim()

    const elements: ChildNode[] = []

    while (container.firstChild) {
      const element = container.firstChild

      if (element.nodeName.toLowerCase() === 'script') {
        // replicate platform's workaround to force script execution
        const scriptElement = document.createElement('script')
        scriptElement.textContent = element.textContent

        if (element instanceof HTMLElement) {
          Array.from(element.attributes).forEach((attr) => {
            scriptElement.setAttribute(attr.name, attr.value)
          })
        }

        root.appendChild(scriptElement)
        elements.push(scriptElement)
        element.remove()
      } else {
        root.appendChild(element)
        elements.push(element)
      }
    }

    return () => {
      elements.forEach((el) => el.remove())
    }
  }, [html, target])

  return null
}