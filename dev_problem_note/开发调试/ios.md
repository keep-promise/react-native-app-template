## pod install中报错
1. Error: Cannot find module '/Users/jiangxinqi/keep-promise/react_native_app_template/node_modules/@react-native-community/cli/build/bin.js

## 解决办法
不从vscode终端运行pod install
从MacOS终端运行


2. [!] Invalid Podfile file: 767: unexpected token at ''

pod install --verbose

## react-native ios  / yarn ios / npm run ios
build失败

	PhaseScriptExecution [CP-User]\ Generate\ Specs /Users/zhangyu/Library/Developer/Xcode/DerivedData/rfApp-dibzynjzvmjgzggicajsawmubiue/Build/Intermediates.noindex/Pods.build/Debug-iphonesimulator/FBReactNativeSpec.build/Script-BAA03CDD54BD491B53D0671A45B69E5F.sh
(1 failure)

### 原因

1. 项目路径包含了空白字符
2. 使用了nvm来进行node安装
原因2：可以修改node_modules/react-native/scripts/find-node.sh, 注释掉文件里面的这部分内容
```sh
if [[ -s "$HOME/.nvm/nvm.sh" ]]; then
   # shellcheck source=/dev/null
   . "$HOME/.nvm/nvm.sh"
 elif [[ -x "$(command -v brew)" && -s "$(brew --prefix nvm)/nvm.sh" ]]; then
   # shellcheck source=/dev/null
   . "$(brew --prefix nvm)/nvm.sh"
 fi
```