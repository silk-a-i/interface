// silk do "a web component that uses lil-gui to read and change the css root vars"
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.18.2/dist/lil-gui.esm.min.js'

class CssConfigurator extends HTMLElement {
    constructor() {
        super()
        this.gui = new GUI()
        this.config = {}
    }

    connectedCallback() {
        this.initializeGUI()
    }

    initializeGUI() {
        // Get all CSS root variables using computedStyleMap
        const rootStyles = document.documentElement.computedStyleMap()
        const cssVars = Array.from(rootStyles.entries())
            .filter(([name]) => name.startsWith('--'))
            .map(([name, value]) => ({ name, value: value.toString() }))

        // Create controls for each CSS variable
        cssVars.forEach(({ name, value }) => {
            this.config[name] = value

            const label = name.replace('--', '')

            // Try to determine if the value is a color
            if (value.includes('#') || value.includes('rgb')) {
                this.gui.addColor(this.config, name)
                    .name(label)
                    .onChange(newValue => this.updateCssVar(name, newValue))
                return
            }
            // Handle px values
            if (value.includes('px')) {
                const numValue = parseFloat(value)
                this.config[name] = numValue
                this.gui.add(this.config, name)
                    .name(label)
                    .onChange(newValue => this.updateCssVar(name, newValue + 'px'))
                return
            }

            // Handle other types (assume string/number)
            this.gui.add(this.config, name)
                .name(label)
                .onChange(newValue => this.updateCssVar(name, newValue))
        })
    }

    updateCssVar(name, value) {
        document.documentElement.style.setProperty(name, value)
    }

    disconnectedCallback() {
        this.gui.destroy()
    }
}

customElements.define('s-style-configurator', CssConfigurator)