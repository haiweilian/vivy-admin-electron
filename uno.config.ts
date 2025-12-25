import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
  presetWind4
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      },
      collections: {
        // 注册本地 SVG 图标集合, 从本地文件系统加载图标
        // 在 './src/static/my-icons' 目录下的所有 svg 文件将被注册为图标，
        // my-icons 是图标集合名称，使用 `i-my-icons-图标名` 调用
        'my-icons': FileSystemIconLoader('./src/renderer/static/my-icons', (svg) => {
          let svgStr = svg

          // 如果 SVG 文件未定义 `fill` 属性，则默认填充 `currentColor`, 这样图标颜色会继承文本颜色，方便在不同场景下适配
          svgStr = svgStr.includes('fill="')
            ? svgStr
            : svgStr.replace(/^<svg /, '<svg fill="currentColor" ')

          // 如果 svg 有 width, 和 height 属性，将这些属性改为 1em，否则无法显示图标
          svgStr = svgStr
            .replace(/(<svg.*?width=)"(.*?)"/, '$1"1em"')
            .replace(/(<svg.*?height=)"(.*?)"/, '$1"1em"')

          return svgStr
        })
      }
    })
  ],
  transformers: [
    // 启用指令功能：主要用于支持 @apply、@screen 和 theme() 等 CSS 指令
    transformerDirectives(),
    // 启用 () 分组功能
    // 支持css class组合，eg: `<div class="hover:(bg-gray-400 font-medium) font-(light mono)">测试 unocss</div>`
    transformerVariantGroup()
  ],
  shortcuts: [
    {
      center: 'flex justify-center items-center'
    }
  ]
})
