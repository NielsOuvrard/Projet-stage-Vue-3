import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'

export default defineConfig({
    plugins: [
        vue(),
        eslint(),
        VueI18nPlugin({
            include: resolve(
                dirname(fileURLToPath(import.meta.url)),
                './path/to/src/locales/**'
            ),
        }),
    ],
})
