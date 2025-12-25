import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@preload': resolve('src/preload')
      }
    }
  },
  preload: {
    resolve: {
      alias: {
        '@preload': resolve('src/preload')
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@preload': resolve('src/preload'),
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      vue(),
      UnoCSS(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false
          })
        ]
      })
    ]
  }
})
