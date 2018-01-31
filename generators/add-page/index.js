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

module.exports = yeoman.Base.extend({

  prompting() {
    const moduleList = fs.readdirSync('src/modules').filter(function (item) {
      return item.indexOf('.') == -1;
    }).map(function (item) {
      return {
        name: item,
        value: item
      }
    })

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
      this.templatePath('page.vue'),
      this.destinationPath(this.props.pagePath),
      {
        midLineName: this.props.midLineName
      }
    );
  },

  updateNav() {
    var fullPath = './src/common/components/layout-nav.vue';

    utils.rewriteFile({
      fileRelativePath: fullPath,
      insertPrev: true,
      needle: `<!-- Don't touch me - ${this.props.moduleName} pages -->`,
      splicable: [
        `{`,
        `  icon: "",`,
        `  name: "${this.props.firstCapCamelComponentName}",`,
        `  link: "/${this.props.moduleName}/${this.props.midLineName}"`,
        `},`,
      ]
    });
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
    utils.rewriteFile({
      fileRelativePath: fullPath,
      insertPrev: true,
      needle: `<!-- Don't touch me - export ${this.props.moduleName} -->`,
      splicable: [
        `{ path: '/${this.props.moduleName}/${this.props.midLineName}', component: ${camelModulePage}, name: '${midLineModulePage}' },`,
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
