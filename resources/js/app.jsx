import './bootstrap';
import '../assets/scss/app.scss';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { BrowserRouter } from 'react-router-dom'
import AnimationThemeProvider from './_helper/AnimationTheme/AnimationThemeProvider';
import CustomizerProvider from './_helper/Customizer/CustomizerProvider';
import { Provider } from 'react-redux'
import main from './Stores/main'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Provider store={main}>
                <BrowserRouter>
                    <CustomizerProvider>
                        <AnimationThemeProvider>
                            <App {...props} />
                        </AnimationThemeProvider>
                    </CustomizerProvider>
                </BrowserRouter>
            </Provider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
