import React, { useState, Suspense, lazy, useEffect } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import InfoTable from "./components/InfoTable";
import SurveyChart from "./components/SurveyChart";
import Footer from "./components/Footer";
// import ImageModal from './components/ImageModal'

function lazyWithPreload(importFunction) {
  const Component = React.lazy(importFunction);
  // preload라는 키로 함수를 지정하여 호출한다.
  Component.preload = importFunction;
  return Component;
}

const LazyImageModal = lazyWithPreload(() => import("./components/ImageModal"));

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    LazyImageModal.preload();
  }, []);

  const handleMouseEnter = ()=>{
    const component = import("./components/ImageModal")
  }

  return (
    <div className="App">
      <Header />
      <InfoTable />
      <ButtonModal
        onClick={() => {
          setShowModal(true);
        }}
        // onMouseEnter={handleMouseEnter}
      >
        올림픽 사진 보기
      </ButtonModal>
      <SurveyChart />
      <Footer />
      <Suspense fallback={null}>
        {showModal ? (
          <LazyImageModal
            closeModal={() => {
              setShowModal(false);
            }}
          />
        ) : null}
      </Suspense>
    </div>
  );
}

const ButtonModal = styled.button`
  border-radius: 30px;
  border: 1px solid #999;
  padding: 12px 30px;
  background: none;
  font-size: 1.1em;
  color: #555;
  outline: none;
  cursor: pointer;
`;

export default App;

//컴포넌트 code splitting & lazy loading: 컴포넌트를 처음 mount시 전부 불러오는게 아닌 필요에따라 load한다

//lazy loading시 버튼클릭후 ImageModal import하고 load하는 시간이 있으므로 성능이 느려진다.
//따라서 코드스플리팅은 적용하되, 프리로딩을 적용해준다

// ◽ Preload이란
// 필요한 리소스 자원을 서버에 요청할 때 여러자원을 동시에 요청하게 되고, 서버에서는 요청 순서에 상관없이 준비가 되는대로 응답을 하게 된다.
// 이때 우선순위를 부여하여 특정 리소스를 빠르게 로딩하도록 하는 것이 바로 preload이다.

// ◽ Preload 타이밍
// 1. 버튼 위에 마우스를 올려놨을 때 -> onMounseEnter 이벤트 활용
// 2. 최초페이지 로드 후 모든 컴포넌트의 마운트가 끝났을 때
// 모달 코드를 미리 로드한다.


//1번의경우 코드의 양이 큰 모달인 맨앞의 문제상황과 비슷한 상황이 나옴
