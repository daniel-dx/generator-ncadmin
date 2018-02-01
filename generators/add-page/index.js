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
 * add-page 生成器行为：
 * 1. 在 src/modules 对应模块的 pages 目录中添加页面文件 xx.vue
 * 2. 更新路由 src/routes/index.js，添加对应页面路由
 * 3. 更新导航 src/common/components/layout-nav.vue，添加对应导航
 * 
 * 注：页面类型为list时，会在store中添加对应的value，供保存页面状态使用
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
        type: 'list',
        name: 'pageType',
        message: 'Chose the type of page.',
        choices: ['empty','list','edit','detail'].map(item => ({
          name: item,
          value: item
        })),
        default: 'empty'
      },
      {
        type: 'string',
        name: 'name',
        message: 'Input the page name.(Use \'-\' to connect words.)',
        default: `page-${new Date().getTime()}`
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
      
      // 驼峰模块名
      this.props.moduleCamelName = s(this.props.moduleName).camelize().value();
      // 模块路径
      this.props.modulePath = `./src/modules/${this.props.moduleName}`;
    });

  },

  checkPage() {
    this.props.pagePath = path.join(this.props.modulePath, 'pages', this.props.midLineName + '.vue');
    if (fs.existsSync(this.props.pagePath)) {
      throw new Error(`Page:${this.props.pagePath} is already exist.`);
    }
  },

  copyTemplates() {
    return this.fs.copyTpl(
      this.templatePath(`${this.props.pageType}.vue`),
      this.destinationPath(this.props.pagePath),
      {
        midLineName: this.props.midLineName,
        camelName: this.props.camelName,
        moduleCamelName: this.props.moduleCamelName
      }
    );
  },

  updateStore() {
    if(this.props.pageType == 'list'){
      var fullPath = `./src/modules/${this.props.moduleName}/store/index.js`;

      utils.rewriteFile({
        fileRelativePath: fullPath,
        insertPrev: true,
        needle: `<!-- Don't touch me - import state -->`,
        splicable: [
          `${this.props.camelName}Value: {},`
        ]
      });
    }
  },

  updateNav() {
    var fullPath = './src/common/components/layout-nav.vue';
    
    if(this.props.pageType == 'edit' || this.props.pageType == 'detail' ){
    }else{
      var routeLink = `  link: "/${this.props.moduleName}/${this.props.midLineName}"`;
      utils.rewriteFile({
        fileRelativePath: fullPath,
        insertPrev: true,
        needle: `<!-- Don't touch me - ${this.props.moduleName} pages -->`,
        splicable: [
          `{`,
          `  icon: "",`,
          `  name: "${this.props.firstCapCamelComponentName}",`,
          routeLink,
          `},`,
        ]
      });
    }
  },

  updateRoute() {
    var fullPath = './src/routes/index.js';

    const midLineModulePage = `${this.props.moduleName}-${this.props.midLineName}`;
    const camelModulePage = s(midLineModulePage).camelize().value();

    utils.rewriteFile({
      fileRelativePath: fullPath,
      insertPrev: true,
      needle: `<!-- Don't touch me - import ${this.props.moduleName} -->`,
      splicable: [
        `import ${camelModulePage} from 'modules/${this.props.moduleName}/pages/${this.props.midLineName}.vue';`,
      ]
    });

    if(this.props.pageType == 'edit' || this.props.pageType == 'detail' ){
      var routeContent = `{ path: '/${this.props.moduleName}/${this.props.midLineName}/:id', component: ${camelModulePage}, name: '${midLineModulePage}' },`;
    }else{
      var routeContent = `{ path: '/${this.props.moduleName}/${this.props.midLineName}', component: ${camelModulePage}, name: '${midLineModulePage}' },`
    }

    utils.rewriteFile({
      fileRelativePath: fullPath,
      insertPrev: true,
      needle: `<!-- Don't touch me - export ${this.props.moduleName} -->`,
      splicable: [
        routeContent,
      ]
    });
  },

  usageTip() {
    logger.green('=========================');
    logger.green('Congratulations, completed successfully!');
    logger.green('=========================');
    logger.log(`   ${chalk.yellow('modify')} src/routes/index.js`);
    logger.log(`   ${chalk.yellow('modify')} src/common/components/layout-nav.vue`);
  }

});
