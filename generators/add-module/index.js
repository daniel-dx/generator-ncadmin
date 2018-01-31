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
      `./src/modules/${this.props.midLineName}/modals`
    ];
    mkdirCommon.forEach(function (item) {
      fs.mkdirSync(item);
    })
  },

  copyTemplates() {
    return this.fs.copyTpl(
      this.templatePath('comp-index.js'),
      this.destinationPath(path.join(this.props.modulePath, 'comp-index.js'))
    );
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

  usageTip() {
    logger.green('=========================');
    logger.green('Congratulations, completed successfully!');
    logger.green('=========================');
    logger.log(`   ${chalk.yellow('modify')} src/routes/index.js`)
    logger.log(`   ${chalk.yellow('modify')} src/common/components/layout-nav.vue`)
  }

});