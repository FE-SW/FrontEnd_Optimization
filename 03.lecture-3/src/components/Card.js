import React, { useRef } from "react";
import { useEffect } from "react";

function Card(props) {
  const imgRef = useRef(null);

  useEffect(() => {
    const callback = (entries, observer) => {
      //entries:observe한 객체들을 담은 배열, observer:밑에서 생성한 동일한 observer객체
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          //화면에 entry가 들어오면
          entry.target.src = entry.target.dataset.src; //entry.targe === img element
          observer.unobserve(entry.target); //이미지 로드가 완료됐으면 observe 해제
        }
      });
    };
    const options = {
		// root: document.querySelector('#scrollArea'),
		// rootMargin: '0px',
		// threshold: 1.0
	};

    const observer = new IntersectionObserver(callback, options); //(observer생성+view에 보였을때+view에 사라졌을때) 총 3번 호출됨
    observer.observe(imgRef.current);
  }, []);

  return (
    <div className="Card text-center">
      <img data-src={props.image} ref={imgRef} />
      <div className="p-5 font-semibold text-gray-700 text-xl md:text-lg lg:text-xl keep-all">
        {props.children}
      </div>
    </div>
  );
}

export default Card;
