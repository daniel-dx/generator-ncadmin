'use strict';

var _ = require('lodash');
var glob = require("glob");
var path = require('path');
var s = require('underscore.string');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var logger = require('../app/logger');
var utils = require('../app/utils');
var fs = require('fs');

var scrFolderPath, scrFolder;

/**
 * add-page 生成器行为：
 * 1. 在 src/modules 中添加对应模块目录，包含 component/modals/pages 以及 store/index.js comp-index.js
 * 2. 更新路由 src/routes/index.js，增加标识位
 * 3. 更新导航 src/common/components/layout-nav.vue，添加对应菜单及标识位
 * 4. 更新入口组件 src/app.vue，引入模块对应的comp-index.js
 * 5. 更新src/store/index.js，添加对应模块的store
 */
module.exports = yeoman.Base.extend({

  prompting() {
    // 询问信息
    var prompts = [{
      type: 'string',
      name: 'name',
      message: 'Input the module name.(Use \'-\' to connect words.)',
      default: `module-${new Date().getTime()}`
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
      // 中划线name
      this.props.midLineName = s(this.props.name).underscored().slugify().value();
      // 驼峰name
      this.props.camelName = s(this.props.midLineName).camelize().value();
      // 首字母大写驼峰
      this.props.firstCapCamelComponentName = s(this.props.camelName).capitalize().value(); // => DemoUser
      // 模块路径
      this.props.modulePath = `./src/modules/${this.props.midLineName}`;
    });

  },

  checkModule() {
    if (fs.existsSync(this.props.modulePath)) {
      throw new Error(`Module:${this.props.midLineName} is already exist.`);
    }
  },

  createDir() {
    const mkdirCommon = [
      `./src/modules/${this.props.midLineName}`,
      `./src/modules/${this.props.midLineName}/components`,
      `./src/modules/${this.props.midLineName}/pages`,
      `./src/modules/${this.props.midLineName}/modals`,
      `./src/modules/${this.props.midLineName}/store`,
    ];
    mkdirCommon.forEach(item => {
      fs.mkdirSync(item);
      fs.appendFileSync(`${item}/README.md`, '');
    })
  },

  copyTemplates() {
    return this.fs.copyTpl(
      this.templatePath('comp-index.js'),
      this.destinationPath(path.join(this.props.modulePath, 'comp-index.js'))
    );
  },  

  copyStore() {
    return this.fs.copyTpl(
      this.templatePath('store.js'),
      this.destinationPath(path.join(this.props.modulePath, 'store', 'index.js'))
    );
  },

  copyMock() {
    return this.fs.copyTpl(
      this.templatePath('mock.js'),
      this.destinationPath(`mock/${this.props.midLineName}.js`)
    );
  },

  updateStore() {
    var fullPath = './src/store/index.js';

    utils.rewriteFile({
      fileRelativePath: fullPath,
      insertPrev: true,
      needle: "<!-- Don't touch me - import store-->",
      splicable: [
        `import ${this.props.camelName} from 'modules/${this.props.midLineName}/store/index.js';`,
      ]
    });

    utils.rewriteFile({
      fileRelativePath: fullPath,
      insertPrev: true,
      needle: "<!-- Don't touch me - export store-->",
      splicable: [
        `${this.props.camelName},`,
      ]
    });
  },

  updateNav() {
    var fullPath = './src/common/components/layout-nav.vue';

    utils.rewriteFile({
      fileRelativePath: fullPath,
      insertPrev: true,
      needle: "<!-- Don't touch me - modules-->",
      splicable: [
        `{`,
        `  type: "submenu",`,
        `  icon: "el-icon-menu",`,
        `  name: "${this.props.firstCapCamelComponentName}",`,
        `  itemList: [`,
        `    // <!-- Don't touch me - ${this.props.midLineName} pages -->`,
        `  ]`,
        `},`,
      ]
    });
  },

  updateRoute() {
    var fullPath = './src/routes/index.js';

    utils.rewriteFile({
      fileRelativePath: fullPath,
      insertPrev: true,
      needle: "<!-- Don't touch me - import modules -->",
      splicable: [
        `// <!-- Don't touch me - import ${this.props.midLineName} -->`,
        ``,
      ]
    });

    utils.rewriteFile({
      fileRelativePath: fullPath,
      insertPrev: true,
      needle: "<!-- Don't touch me - export modules -->",
      splicable: [
        `// <!-- Don't touch me - export ${this.props.midLineName} -->`,
        ``,
      ]
    });

  },

  updateApp() {
    var fullPath = './src/app.vue';

    utils.rewriteFile({
      fileRelativePath: fullPath,
      insertPrev: true,
      needle: "<!-- Don't touch me - import comp-index -->",
      splicable: [
        `import "modules/${this.props.midLineName}/comp-index.js";`,
      ]
    });
  },

  usageTip() {
    logger.green('=========================');
    logger.green('Congratulations, completed successfully!');
    logger.green('=========================');
  }

});
