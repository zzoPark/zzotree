# zzotree

Javascript treeview module.  


## 브라우저 지원

IE9까지 지원하도록 한다. 대신 Babel을 이용해 ES6 문법 사용이 가능하도록 설정한다.  


## Webpack + babel-loader 사용법

먼저 node, npm이 설치되어 있어야 한다. webpack.config.js 파일에 지원 브라우저 버전, corejs 버전 등 설정이 가능하다.  
원래 babel만 가지고 ES6 -> ES5 transpile을 하도록 설정하려고 했는데 polyfill 모듈을 require로 추가하는 부분에서 오류가 났다.  
웹 브라우저에서는 모듈 require/import 지원을 안하기 때문에 여러 모듈을 웹 브라우저에서 사용할 수 있게 bundle로 묶어주는 용도로 Webpack을 활용하게 되었다.

아래 명령을 통해 `src` 디렉토리에 있는 ES6 문법으로 작성된 javascript code를 IE9과 호환되는 ES5 문법의 코드로 변환할 수 있다.
  
```bash
$ npm run build
```
  
변환된 코드는 `lib` 디렉토리에 생성된다.  

## 주요 기능

정리 필요.

1. 데이터를 트리 형태로 출력  
1. 트리 노드 expand/collapse  
1. 트리 노드 drag & drop  
1. 트리 노드 편집  


## 성능 고려사항

일단 데이터 10만건 정도를 기준으로 최대 1초 이내로 로딩 가능한 걸 목표로 한다.  
Chris Smith의 블로그 글 중 Super Fast Tree View in JavaScript를 참고하여 구현하되 트리 노드가 모두 펼쳐진 상태로 로드해야 할 때는 이미 정렬된 데이터를 순서대로 DOM에 추가하도록 로직 변경이 가능하도록 한다.  

