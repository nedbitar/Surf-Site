// Background Color Customizer for Client Preview
(function() {
    // Preset color options
    const presets = [
        { name: 'Dark Slate', color: '#2d3436' },
        { name: 'Deep Ocean', color: '#1e3a5f' },
        { name: 'Midnight', color: '#1a1a2e' },
        { name: 'Charcoal', color: '#36454f' },
        { name: 'Dark Teal', color: '#1a3c40' },
        { name: 'Espresso', color: '#3c2415' },
        { name: 'Dark Olive', color: '#3d4a3a' },
        { name: 'Slate Grey', color: '#708090' },
        { name: 'Navy', color: '#0a1929' },
        { name: 'Dark Purple', color: '#2d1b4e' }
    ];

    // Create customizer panel
    function createCustomizer() {
        const panel = document.createElement('div');
        panel.id = 'color-customizer';
        panel.innerHTML = `
            <button class="customizer-toggle" title="Customize Colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0 1 12 22zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 0 0-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 0 1 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z"/>
                    <circle cx="6.5" cy="11.5" r="1.5"/>
                    <circle cx="9.5" cy="7.5" r="1.5"/>
                    <circle cx="14.5" cy="7.5" r="1.5"/>
                    <circle cx="17.5" cy="11.5" r="1.5"/>
                </svg>
            </button>
            <div class="customizer-panel">
                <div class="customizer-header">
                    <h3>Background Color</h3>
                    <button class="customizer-close">&times;</button>
                </div>
                <div class="customizer-content">
                    <div class="preset-colors">
                        ${presets.map(p => `
                            <button class="preset-btn" data-color="${p.color}" title="${p.name}" style="background-color: ${p.color}"></button>
                        `).join('')}
                    </div>
                    <div class="custom-color">
                        <label>Custom Color:</label>
                        <input type="color" id="custom-color-picker" value="#2d3436">
                        <input type="text" id="custom-color-hex" value="#2d3436" placeholder="#2d3436">
                    </div>
                    <button class="reset-btn">Reset to Default</button>
                </div>
                <div class="customizer-footer">
                    <small>Changes saved automatically</small>
                </div>
            </div>
        `;
        document.body.appendChild(panel);

        // Add event listeners
        const toggle = panel.querySelector('.customizer-toggle');
        const panelContent = panel.querySelector('.customizer-panel');
        const closeBtn = panel.querySelector('.customizer-close');
        const presetBtns = panel.querySelectorAll('.preset-btn');
        const colorPicker = panel.querySelector('#custom-color-picker');
        const hexInput = panel.querySelector('#custom-color-hex');
        const resetBtn = panel.querySelector('.reset-btn');

        // Toggle panel
        toggle.addEventListener('click', () => {
            panelContent.classList.toggle('open');
        });

        closeBtn.addEventListener('click', () => {
            panelContent.classList.remove('open');
        });

        // Preset colors
        presetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const color = btn.dataset.color;
                applyColor(color);
                colorPicker.value = color;
                hexInput.value = color;
                updateActivePreset(btn);
            });
        });

        // Color picker
        colorPicker.addEventListener('input', (e) => {
            applyColor(e.target.value);
            hexInput.value = e.target.value;
            clearActivePresets();
        });

        // Hex input
        hexInput.addEventListener('change', (e) => {
            let color = e.target.value;
            if (!color.startsWith('#')) color = '#' + color;
            if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
                applyColor(color);
                colorPicker.value = color;
                clearActivePresets();
            }
        });

        // Reset button
        resetBtn.addEventListener('click', () => {
            const defaultColor = '#2d3436';
            applyColor(defaultColor);
            colorPicker.value = defaultColor;
            hexInput.value = defaultColor;
            localStorage.removeItem('iconoclast-bg-color');
            clearActivePresets();
        });

        // Load saved color
        const savedColor = localStorage.getItem('iconoclast-bg-color');
        if (savedColor) {
            applyColor(savedColor, false);
            colorPicker.value = savedColor;
            hexInput.value = savedColor;
        }
    }

    function applyColor(color, save = true) {
        document.documentElement.style.setProperty('--color-dark', color);
        document.body.style.backgroundColor = color;
        if (save) {
            localStorage.setItem('iconoclast-bg-color', color);
        }
    }

    function updateActivePreset(activeBtn) {
        clearActivePresets();
        activeBtn.classList.add('active');
    }

    function clearActivePresets() {
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.classList.remove('active');
        });
    }

    // Add styles
    const styles = document.createElement('style');
    styles.textContent = `
        #color-customizer {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .customizer-toggle {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ffdf00 0%, #f0a500 100%);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1a1a1a;
            box-shadow: 0 4px 15px rgba(255, 223, 0, 0.4);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .customizer-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(255, 223, 0, 0.5);
        }

        .customizer-panel {
            position: absolute;
            bottom: 60px;
            right: 0;
            width: 280px;
            background: rgba(20, 20, 20, 0.98);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: all 0.3s ease;
        }

        .customizer-panel.open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .customizer-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .customizer-header h3 {
            margin: 0;
            font-size: 14px;
            color: #fff;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .customizer-close {
            background: none;
            border: none;
            color: #888;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }

        .customizer-close:hover {
            color: #fff;
        }

        .customizer-content {
            padding: 15px;
        }

        .preset-colors {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 8px;
            margin-bottom: 15px;
        }

        .preset-btn {
            width: 100%;
            aspect-ratio: 1;
            border: 2px solid transparent;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .preset-btn:hover {
            transform: scale(1.1);
            border-color: rgba(255, 255, 255, 0.5);
        }

        .preset-btn.active {
            border-color: #ffdf00;
            box-shadow: 0 0 10px rgba(255, 223, 0, 0.5);
        }

        .custom-color {
            margin-bottom: 15px;
        }

        .custom-color label {
            display: block;
            font-size: 12px;
            color: #888;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .custom-color input[type="color"] {
            width: 50px;
            height: 35px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            vertical-align: middle;
        }

        .custom-color input[type="text"] {
            width: calc(100% - 60px);
            margin-left: 10px;
            padding: 8px 12px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 6px;
            color: #fff;
            font-family: monospace;
            font-size: 14px;
            vertical-align: middle;
        }

        .custom-color input[type="text"]:focus {
            outline: none;
            border-color: #ffdf00;
        }

        .reset-btn {
            width: 100%;
            padding: 10px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 6px;
            color: #fff;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s ease;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .reset-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.3);
        }

        .customizer-footer {
            padding: 10px 15px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
        }

        .customizer-footer small {
            color: #666;
            font-size: 11px;
        }

        @media (max-width: 480px) {
            #color-customizer {
                bottom: 15px;
                right: 15px;
            }

            .customizer-panel {
                width: 260px;
                right: -10px;
            }

            .customizer-toggle {
                width: 45px;
                height: 45px;
            }
        }
    `;
    document.head.appendChild(styles);

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createCustomizer);
    } else {
        createCustomizer();
    }
})();
