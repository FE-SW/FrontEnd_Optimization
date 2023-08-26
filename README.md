# 성능 최적화 정리

## 로딩 성능 & 랜더링 성능
프론트엔드 성능 개선과 관련해서 크게 두가지로 나뉘는데 바로 로딩 성능과 랜더링 성능이다
<br/>

1. 로딩 성능:
웹 페이지나 앱의 자원들이 브라우저나 디바이스에 얼마나 빠르게 전송되고 처음으로 렌더링되는지에 관련된 성능이다.
로딩 성능 최적화의 핵심은 불필요한 자원의 로드를 최소화하고, 필요한 자원을 효과적으로 우선순위를 부여하여 빠르게 로드하는 것이다.

2. 랜더링 성능:
웹 페이지나 앱이 사용자의 상호작용에 얼마나 빠르게 반응하며, 원활하게 동작하는지에 관련된 성능이다.<br/>
랜더링 성능 최적화의 핵심은 불필요한 렌더링을 방지하고, 복잡한 연산이나 애니메이션을 효과적으로 처리하여 원활한 사용자 경험을 제공하는 것이다.

## 실습 내용

[로딩 성능 최적화]
* 이지지 사이즈 최적화
* Code Split & Lazy Loading
* 텍스트 압축
* Bundle 파일 분석

[랜더링 성능 최적화]
* Bottleneck 코드 최적화

## 분석 툴

* 크롬 Network 탭: 웹 페이지에서 발생하는 모든 네트워크 요청을 모니터링하고 분석하는 도구
* 크롬 Performance 탭: 실행 시간 동안 웹 페이지의 런타임 성능을 캡처하고 분석하여 성능 병목을 파악하는 도구
* Light house 탭: 웹 애플리케이션의 사용성, 성능, 접근성 등 다양한 관점에서의 품질을 평가하는 도구
* webpack-bundle-analyzer: Webpack 빌드 출력의 크기와 의존성을 시각적으로 표현하여 번들 최적화에 도움을 주는 도구


## Light house로 성능 측정하기

![다운로드](https://github.com/FE-SW/vue2_tutorial/assets/54196723/35e86a02-eec0-447c-8de8-59b06c60e7bb)

metrics는 성능을 측정하는 지표이며,

![다운로드 (1)](https://github.com/FE-SW/vue2_tutorial/assets/54196723/b47c74fd-aeb9-408a-ae3e-01e352dcf9c5)

opprtunities ,diagostics 는 해당 웹서비스의 문제점과 문제점을 개선할 가이드들 제시한다. <br/>
opprtunities 는 리소스 관점(로딩 성능)에서 , diagostics 는 실행관점(랜더링 성능)에서 가이드를 제시한다. <br/>
해당 지표를 참고하여 성능최적화를 하면 된다


## 이미지 사이즈 최적화

![다운로드 (2)](https://github.com/FE-SW/vue2_tutorial/assets/54196723/81bea77b-0c51-4f14-b809-41795d0d14a2)


Serve images that are appropriately-sized to save cellular data and improve load time:<br/> 
이미지를 적절한 사이즈로 압축하고 데이터와 로드시간을 최적화 권고를 나타내는 문구이다.

Resource size: 해당 파일 용량 / Potential savings :최적화했을때 절약할 수 있는 용량

![다운로드 (3)](https://github.com/FE-SW/vue2_tutorial/assets/54196723/154ad9cb-eb43-4f39-816d-9b6ba7131e49)

해당 이미지 파일을 분석했을때,<br/>
랜더링되는 사이즈와 실제 저장된 사이즈가 100배 큰 이미지를 저장하고 사용중인것을 확인할 수 있다.<br/>
실제 렌더링되는 사이즈보다 넓이 기준으로 2배정도 큰 이미지를 사용하는게 최선인데, 해당 코드를 수정하면 다음과 같다.


```java
      <div className={"Article__thumbnail"}>
        <img
          src={
            props.image +
            getParametersForUnsplash({
              width: 240,
              height: 240, //1200 -> 240 , 이미지 사이즈 줄이기 최적화
              quality: 80,
              format: "jpg",
            })
          }
          alt="thumbnail"
        />
      </div>
```

## bottleneck 코드 최적화

![다운로드 (4)](https://github.com/FE-SW/vue2_tutorial/assets/54196723/ec26e830-688d-4662-aab1-1eaf6030ffb4)

opprtunities항목을 보면 자바스크립트 코드를 최소화하고, 불필요한 코드를 지우라는 문구가 보인다. <br/>
하지만 어떤코드가 원인인지 알수가 없는데, 이떄 이용하는것이 perfomance탭이다. <br/>
이 performance탭은 페이지가 로드되면서 실행되는 작업들을 타임라인과 차트로 보여준다.

![다운로드 (5)](https://github.com/FE-SW/vue2_tutorial/assets/54196723/3c7d6133-98ef-4e18-b2ff-51f52e9cfdd9)

자바스크립트 로드가 완료되고, article api가 호출되는것을 볼 수 있다. article api는 실행은 금방끝나지만 , callbak 떄문에 회색선으로 쭉 이어진것을 볼 수 있다.
밑에 Article 컴포넌트를 보면 필요이상으로 실행중인것을 확인할 수 있다.

![다운로드 (6)](https://github.com/FE-SW/vue2_tutorial/assets/54196723/5e900181-419c-4ced-9697-36629966c97e)

타이밍 탭을 들어가도 Article 컴포넌트가 굉장히 긴시간동안 실행중인것을 볼 수 있다.

![다운로드 (7)](https://github.com/FE-SW/vue2_tutorial/assets/54196723/ffa5b690-6f90-4a94-b460-564b9fd93c3a)

Article 컴포넌트를 확대시키면 removeSpecialCharacter 작업이 대다수의 작업시간을 잡아먹는중인것을 알 수 있다.
이제 removeSpecialCharacter 를 수정하면 성능최적화가 가능하다라는것을 파악했다.

```java
/* 파라미터로 넘어온 문자열에서 일부 특수문자를 제거하는 함수(Markdown으로 된 문자열의 특수문자를 제거하기 위함 */

/*문제의 코드 */
function removeSpecialCharacter(str) {
  const removeCharacters = ['#', '_', '*', '~', '&', ';', '!', '[', ']', '`', '>', '\n', '=', '-']
  let _str = str
  let i = 0,
    j = 0

  for (i = 0; i < removeCharacters.length; i++) {
    j = 0
    while (j < _str.length) {
      if (_str[j] === removeCharacters[i]) {
        _str = _str.substring(0, j).concat(_str.substring(j + 1))
        continue
      }
      j++
    }
  }
}

```

```java
/* 파라미터로 넘어온 문자열에서 일부 특수문자를 제거하는 함수(Markdown으로 된 문자열의 특수문자를 제거하기 위함 */

/*최적화된 코드 */
function removeSpecialCharacter(str) {
  let _str=str.substring(0,300) //작업하는 양줄이기
  _str =  _str.replace(/[ \#\_\*\~\&\;\!\[\]\`\>\=\- ]/g ,'') //특수 문자 효율적으로 제거

  return _str
}

```
* 문제점1: 특수 문자 효율적으로 제거: for,while -> 1.문자열 프로토타입 메서드인 substring,replace와 정규식사용 or 마크다운 특수문자를 지워주는 라이브러리 사용(remove-markdown)
* 문제점2: 작업하는 양 줄이기:  api로 제공하는 마크다운의경우 최대 9만자까지 늘어남 -> 300자로 제한

### Bundle 파일 분석

![다운로드 (8)](https://github.com/FE-SW/vue2_tutorial/assets/54196723/c417522d-bf41-4880-b0ed-cc87e9cd8826)

bundle 파일을 분석해서 적적하게 코드를 분할하는법이다. 해당 bundle 파일을 분석하기위해 webpack bundle analyzer 툴을 이용해 검사하면 된다.
그런데 문제는 웹팩을 직접구성한게 아닌 CRA로 설정된 기본 웹팩을 사용하고 있다.<br/>

직접 플러그인을 넣을려면 CRA를 eject를 하거나 webpack config를 custom할 수 있는 라이브러리를 설치해야된다.<br/>
다행히 webpack config를 직접 custom하지 않아도 bundle analyzer를 사용할 수 잇는 CRA bundle analyzer 라이브러리를 이용할 수 있다.

```java
npm i cra-bundle-analyzer // 설치명령어
```

해당 라이브러리를 설치하고 빌드명령어를 입력하면,

```java
npx cra-bundle-analyzer // 빌드명령어
```

해당 명령어를 입력하면 다음과같이 build폴더가 생성되는데

![다운로드 (9)](https://github.com/FE-SW/vue2_tutorial/assets/54196723/5f6180d2-3b16-4b05-8d86-eaefa3f975fc)

해당 build폴더안에 report.html파일을 열어보면,

![다운로드 (10)](https://github.com/FE-SW/vue2_tutorial/assets/54196723/5fd89b0c-27c0-4894-bdb5-6df119413573)

bundle analyzer를 통해 bundle파일이 해석되서 나온다. 위에 가장큰 파일이 0.chunk 파일인걸 유추해볼 수 있다.
또한 node_modules는 npm으로 설치한 라이브러리 코드인것을 의미한다.

해당 bundle파일을 분석해 용량이 큰 모듈을 찾아 제거하거나 최적화된 방법을 찾아서 수정해주면 된다.


### Code Splitting & Lazy Loading

Code Splitting은 리액트 애플리케이션의 번들 크기를 줄이기 위해 필요한 코드만 따로 분리하여 로드하는 기법이다.<br/>
React.lazy()와 Suspense를 활용하여 컴포넌트 수준에서 지연 로딩을 구현할 수 있으며, <br/>
이를 통해 초기 페이지 로드 속도를 개선하고 효율적인 코드 실행을 가능하게 한다.
<br/>

Lazy Loading은 웹 컨텐츠를 처음에 모두 로드하지 않고, 필요한 순간이나 특정 조건에 따라 로드하는 기법이다.<br/>
이 방식은 초기 로딩 성능을 개선하고, 불필요한 리소스 다운로드를 줄여 전체 사용자 경험을 향상시키는 데 도움을 준다.<br/>

![다운로드 (11)](https://github.com/FE-SW/vue2_tutorial/assets/54196723/0e0738a5-6ba2-442b-a551-0365756718b2)

view페이지에서만 필요한 이 모듈은 지금 불필요하게 메인페이지에서도 로드하는중이다. 따라서 이 코드를 필요한 부분만큼 분리하고 , 필요한만큼 로드하면 된다.

code splitting이란 말 그대로 코드를 분할하고 작은 사이지로 만드는것을 의미한다. 하나의 bundle파일에 여러개의 페이지 컴포넌트가 들어간걸 알 수 있다. 
필요한 페이지는 정해져있는데 불필요한 페이지까지 불러오니까 다운로드 속도 느리고 페이지 로딩속도도 느려지고.따라서 페이지를 나누는 code splitting작업이 필요하다. 

![554](https://github.com/FE-SW/vue2_tutorial/assets/54196723/bdbea21b-b0bd-43af-b6e3-67a2954da7d9)
![1234](https://github.com/FE-SW/vue2_tutorial/assets/54196723/0f66a10d-f210-415e-8b73-e6da7ba75dcb)

내가 접속한 페이지 모듈들만 불러오게 작업해준다.code splitting은 페이지별로 분할하거나 , 모듈별로 분할하는 방법이 있다.

<br/>

![3](https://github.com/FE-SW/vue2_tutorial/assets/54196723/1a01cd5e-546c-4f7d-88a3-4dc4f0234cb1)

```java
[페이지별 분할 (Route-based code splitting)]:

이 방법은 웹 어플리케이션의 각 페이지(또는 라우트)마다 별도의 코드 번들을 생성한다.
예를 들어, 사용자가 홈페이지를 방문했을 때, 홈페이지와 관련된 코드만 로드돤다. 사용자가 다른 페이지(예: 상세 페이지)로 이동하면 그때 그 페이지와 관련된 코드가 로드된다.
이런 방식은 초기 로딩 속도를 크게 개선할 수 있다. 사용자는 처음 방문한 페이지의 코드만 다운로드하기 때문이다.
React에서는 React.lazy()와 Suspense를 사용하여 라우트 기반 코드 스플리팅을 쉽게 구현할 수 있다.
```


```java
[모듈별 분할 (Component-based code splitting)]:

모듈별 분할은 특정 컴포넌트나 라이브러리를 별도의 번들로 분리하는 것을 의미한다.
예를 들어, 대형 라이브러리(예: 차트 라이브러리)를 사용하는 한 페이지만 있다면, 그 라이브러리는 해당 페이지에서만 필요하므로 별도의 번들로 분리하는 것이 효과적이다.
이렇게 하면, 해당 라이브러리를 사용하지 않는 다른 페이지들은 그 라이브러리의 코드를 불필요하게 로드하지 않게 된다.
React에서도 React.lazy()를 사용하여 특정 컴포넌트를 동적으로 로드할 수 있다.
```

<br/>


그전에 한가지 설정해야 되는부분이 webpack설정이다. code splitting를 실제로 적용하는 주체가 webpack이므로 webpack이 code splitting을 위한 설정을 해줘야한다.
하지만 우리는 CRA를 통해 기본적인 웹팩 설정이 잘되어있다. code splitting코드만 작성하면 된다.


```java
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

//* code split
//code splitting: 덩치가 큰 번들파일을 쪼개서 작은사이즈 파일로 만드는것을 의미
//code splitting은 페이지별로, 모듈별로 쪼갤 수 있다 -> ex)bundle.js파일을 listPage.chunk.js // viewPage.chunk.js로 쪼갤 수 있음

//리액트 코드분할 페이지에서 -> router-based code splitting 사용(routing단위로 code splitting 적용)
//https://webpack.js.org/guides/code-splitting: code splitting하는 주체가 리액트가 아닌 웹팩이기 때문에 웹팩에 코드스플리팅 관련 설정을 해줘야함(CRA는 이미 적용됨)
```


얼마나 변화가 있는지 bundle-analyzer를 실행시켜 보면,<br/>

[전]
![aa](https://github.com/FE-SW/vue2_tutorial/assets/54196723/862505f9-e9ad-4686-936e-1f767662a025)

[후]
![bb](https://github.com/FE-SW/vue2_tutorial/assets/54196723/b2c94a48-2e64-461e-92d2-89853836880e)

전후 사진을 비교해보면 모든 모듈을 불러오는것이 아닌, 필요한페이지의 모듈만 불러오는것을 확인할 수 있다.<br/>

<br/> <br/>


![cc](https://github.com/FE-SW/vue2_tutorial/assets/54196723/124b0c70-62ef-481d-b021-8938ae50fca0)

네트워크 탭에서 확인해보면, 메인페이지에서는 이만큼 데이터를 불러왔다면<br/>

![dd](https://github.com/FE-SW/vue2_tutorial/assets/54196723/5d7c3ad8-3a0f-4bf0-b33e-5c57a6689665)

상세페이지에 들어갔을경우 데이터를 추가적으로 불러오는것을 확인할 수 있다.


### 텍스트 압축
