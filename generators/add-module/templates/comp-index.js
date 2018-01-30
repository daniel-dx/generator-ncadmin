/**
 * 模块级别的component索引，用于配置开发页面的组件寻找
 */
import Vue from 'vue';

// import preview from './modals/preview.vue';
// <!-- Don't touch me - import modals-->

// import previewButton from './components/preview-button.vue';
// <!-- Don't touch me - import components-->

// 注意：只有组件想通过配置使用才需要在此处声明
let exportIdx = {
    // 'my-page.modals.preview': preview,
    // <!-- Don't touch me - export modals-->

    // 'my-page.components.preview-button': previewButton,
    // <!-- Don't touch me - export components-->
}

// register modals & components
Object.keys(exportIdx).forEach(compName => {
    // 声明组件不能使用“.”字符，所以用"_"替换，但实际使用时仍然以"exportIdx"声明的key
    Vue.component(compName.replace(/\./g, '_'), exportIdx[compName]);
})

export default exportIdx;