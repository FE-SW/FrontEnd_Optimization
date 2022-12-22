import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

const ListPage = lazy(() => import("./pages/ListPage/index"));
const ViewPage = lazy(() => import("./pages/ViewPage/index"));

//lazy: 동적으로 해당 컴포넌트를 import함(런타임에서)
//suspense: 컴포넌트가 동적으로 로드되므로 아무것도 로드된게 없는 시점이 존재함, 그때는 fallback을 통해 loading처리해줌



function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" component={ListPage} exact />
          <Route path="/view/:id" component={ViewPage} exact />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
//----------------------------------------------------------------------------------------//

//로딩성능: 각 리소스를 불러오는지에 대한 성능
//* 이미지 사이즈 최적화 -> 라이트하우스탭 이용
// 1.api로 이미지를 받아올 경우 image processing CDN을 통해 해결
// image CDN은 response로 보내기전에 특정형태로 가공작업을 한다(사이즈 줄이기,이미지 포맷 바꾸기) -> imgix 사이트 이용
// 2.https://unsplash.com/documentation#supported-parameters 에서 제공하는 이미지 이미지 사이즈 최적화 함수 사용

//* code split
//* 텍스트 압축

//----------------------------------------------------------------------------------------

//랜더링성능: 불러온 리소스를 화면에 그리는에 대한 성능 -> 퍼포먼스탭 이용
//* bottleneck 코드 최적화

//----------------------------------------------------------------------------------------//

//분석툴
//* 크롬 네트워크탭: 네트워크 리소스 상세한 정보를 알려줌

//* 크롬 퍼포먼스탭: 웹이 실행될떄 모든 작업을 그래프로 보여줌
//네트워크:네트워크 타임라인 -> chunk파일 경우 webpack bundle analyzer 사용
//타이밍,기본: 자바스크립 실행 관련

//* 크롬 라이트하우스: 서비스의 성능을 측정해볼 수 있는 자동화 도구

// opportunites: 리소스성능과 관련된 항목(로딩) // *diagnostics: 실행성능과 관련된 항목(랜더링)
// opportunites-minify javascript: 자바스크립트 공백,주석을 제거해서 자바스크립트 파일을 줄이라는 소리(CRA경우 production build 하면 알아서 minify를 해줌)
// reduce javascript excution time 경우 퍼포먼스탭 이용

//* webpack-bundle-analyzer: 웹팩을 통해 번들링된 파일이 어떤 코드로 구성됬는지 알려줌
//기본 webpack bundle analyzer 사용할경우 CRA를 eject를 하거나 webpack config를 custom 할 수 있는 라이브러리를 설치해야되는데 번거러운 작업임
//따라서 webpack config를 custom하지 않아도 사용할 수 있는 cra-bundle-analyzer 를 사용 -> 명령어 npx cra-bundle-analyzer
//특정 모듈이 크다면 -> package-lock.json(모듈의 디펜던시를 표시해주는 파일)에서 검색
//해당 프로젝트의 경우 react-syntax-highlighter가 유의미하게 컸는데 , 이 모듈은 마크다운의 텍스트를 하이라이트 해주는 라이브러리다
//이 문제점은 페이지 별로 코드를 분리시키고, 필요할떄만 불러오면 된다(code splitting, lazy loading 시용)

//code splitting: 덩치가 큰 번들파일을 쪼개서 작은사이즈 파일로 만드는것을 의미
//code splitting은 페이지별로, 모듈별로 쪼갤 수 있다 -> ex)bundle.js파일을 listPage.chunk.js // viewPage.chunk.js로 쪼갤 수 있음

//리액트 코드분할 페이지에서 -> router-based code splitting 사용(routing단위로 code splitting 적용)
//https://webpack.js.org/guides/code-splitting: code splitting하는 주체가 리액트가 아닌 웹팩이기 때문에 웹팩에 코드스플리팅 관련 설정을 해줘야함(CRA는 이미 적용됨)