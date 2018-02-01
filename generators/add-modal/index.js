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

/**
 * add-modal 生成器行为：
 * 1. 在 src/modules 对应模块的 modals 目录中添加页面文件 xx.vue
 * 2. 在 src/modules 对应模块的 comp-index.js 目录中添加组件
 */
module.exports = yeoman.Base.extend({

  prompting() {
    const moduleList = fs.readdirSync('src/modules')
      .filter(item => item.indexOf('.') == -1)
      .map(item => ({
        name: item,
        value: item
      }));

    // 询问信息
    var prompts = [
      {
        type: 'list',
        name: 'moduleName',
        message: 'Chose the module.',
        choices: moduleList,
        default: moduleList[0].value
      },
      {
        type: 'string',
        name: 'name',
        message: 'Input the modal name.(Use \'-\' to connect words.)',
        default: `modal-${new Date().getTime()}`
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
      // 中划线name
      this.props.midLineName = s(this.props.name).underscored().slugify().value();
      // 驼峰name
      this.props.camelName = s(this.props.midLineName).camelize().value();
      // 首字母大写驼峰
      this.props.firstCapCamelComponentName = s(this.props.camelName).capitalize().value(); // => DemoUser
      // 模块路径
      this.props.modulePath = `./src/modules/${this.props.moduleName}`;
    });

  },

  checkPage() {
    this.props.modalPath = path.join(this.props.modulePath, 'modals', this.props.midLineName + '.vue');
    if (fs.existsSync(this.props.modalPath)) {
      throw new Error(`Page:${this.props.modalPath} is already exist.`);
    }
  },

  copyTemplates() {
    return this.fs.copyTpl(
      this.templatePath('modal.vue'),
      this.destinationPath(this.props.modalPath),
      {
        midLineName: this.props.midLineName
      }
    );
  },



  updateCompIndex() {
    var fullPath = `./src/modules/${this.props.moduleName}/comp-index.js`;

    utils.rewriteFile({
      fileRelativePath: fullPath,
      insertPrev: true,
      needle: `<!-- Don't touch me - import modals-->`,
      splicable: [
        `import ${this.props.camelName} from './modals/${this.props.midLineName}.vue';`,
      ]
    });
    utils.rewriteFile({
      fileRelativePath: fullPath,
      insertPrev: true,
      needle: `<!-- Don't touch me - export modals-->`,
      splicable: [
        `'${this.props.moduleName}.modals.${this.props.midLineName}': ${this.props.camelName},`,
      ]
    });
  },

  usageTip() {
    logger.green('=========================');
    logger.green('Congratulations, completed successfully!');
    logger.green('=========================');
    logger.log(`   ${chalk.yellow('modify')} src/modules/${this.props.moduleName}/comp-index.js`);
  }

});
