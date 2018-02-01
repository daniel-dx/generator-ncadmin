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
 * add-component 生成器行为：
 * 1. 在 src/modules 对应模块的 components 目录中添加页面文件 xx.vue
 * 2. 在 src/modules 对应模块的 comp-index.js 目录中添加组件
 */
module.exports = yeoman.Base.extend({

  prompting() {
    const moduleList = 
      fs.readdirSync('src/modules')
      .concat(['GLOBAL'])
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
        message: 'Input the component name.(Use \'-\' to connect words.)',
        default: `component-${new Date().getTime()}`
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
      if(this.props.moduleName!='GLOBAL'){
        this.props.modulePath = `./src/modules/${this.props.moduleName}`;
      }else{
        this.props.modulePath = `./src/common`;
      }
    });

  },

  checkPage() {
    this.props.componentPath = path.join(this.props.modulePath, 'components', this.props.midLineName + '.vue');
    if (fs.existsSync(this.props.componentPath)) {
      throw new Error(`Page:${this.props.componentPath} is already exist.`);
    }
  },

  copyTemplates() {
    return this.fs.copyTpl(
      this.templatePath('component.vue'),
      this.destinationPath(this.props.componentPath),
      {
        midLineName: this.props.midLineName
      }
    );
  },



  updateCompIndex() {
    if(this.props.moduleName!='GLOBAL') {
      var fullPath = `./src/modules/${this.props.moduleName}/comp-index.js`;
      utils.rewriteFile({
        fileRelativePath: fullPath,
        insertPrev: true,
        needle: `<!-- Don't touch me - import components-->`,
        splicable: [
          `import ${this.props.camelName} from './components/${this.props.midLineName}.vue';`,
        ]
      });
      utils.rewriteFile({
        fileRelativePath: fullPath,
        insertPrev: true,
        needle: `<!-- Don't touch me - export components-->`,
        splicable: [
          `'${this.props.moduleName}.components.${this.props.midLineName}': ${this.props.camelName},`,
        ]
      });
    }else{
      var fullPath = `./src/modules/comp-index.js`;
      utils.rewriteFile({
        fileRelativePath: fullPath,
        insertPrev: true,
        needle: `<!-- Don't touch me - import components-->`,
        splicable: [
          `import ${this.props.camelName} from 'common/components/${this.props.midLineName}.vue';`,
        ]
      });
      utils.rewriteFile({
        fileRelativePath: fullPath,
        insertPrev: true,
        needle: `<!-- Don't touch me - export components-->`,
        splicable: [
          `'${this.props.moduleName}.components.${this.props.midLineName}': ${this.props.camelName},`,
        ]
      });
    }
  },

  usageTip() {
    logger.green('=========================');
    logger.green('Congratulations, completed successfully!');
    logger.green('=========================');
  }

});
