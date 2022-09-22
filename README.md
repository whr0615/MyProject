### 注意下

根目录下需创建xm-common目录，用于存放公共业务组件，组件Git地址：https://codeup.aliyun.com/625d11bc5b46541dd2fe9b4a/zhihuiyuanqu/managev2/common


#### .umirc.js 新增配置


```
alias: {
    '@xm-component': path.join(__dirname, 'xm-common', 'components'),
    '@xm-utils': path.join(__dirname, 'xm-common', 'utils')
  },
```
