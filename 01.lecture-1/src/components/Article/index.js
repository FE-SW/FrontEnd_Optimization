import React from 'react'

import './index.css'

function zeroPad(value, len) {
  const str = '0000000000' + value.toString()
  return str.substring(str.length - len)
}

/* 파라미터 참고: https://unsplash.com/documentation#supported-parameters */
// 이미지 사이즈 최적화 함수: unsplash에서 제공하는 이미지 프로세싱 할 수 있는 파라미터
function getParametersForUnsplash({width, height, quality, format}) {
  return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`
}

/* 파라미터로 넘어온 문자열에서 일부 특수문자를 제거하는 함수(Markdown으로 된 문자열의 특수문자를 제거하기 위함 */
//bottleneck 코드 최적화

// 문제점1: 특수 문자 효율적으로 제거: for,while -> 1.문자열 프로토타입 메서드인 substring,replace와 정규식사용 or 마크다운 특수문자를 지워주는 라이브러리 사용(remove-markdown)
// 문제점2: 작업하는 양 줄이기:  api로 제공하는 마크다운의경우 최대 9만자까지 늘어남 -> 300자로 제한

function removeSpecialCharacter(str) {
  // const removeCharacters = ['#', '_', '*', '~', '&', ';', '!', '[', ']', '`', '>', '\n', '=', '-']
  // let _str = str
  // let i = 0,
  //   j = 0

  // for (i = 0; i < removeCharacters.length; i++) {
  //   j = 0
  //   while (j < _str.length) {
  //     if (_str[j] === removeCharacters[i]) {
  //       _str = _str.substring(0, j).concat(_str.substring(j + 1))
  //       continue
  //     }
  //     j++
  //   }
  // }
  let _str=str.substring(0,300) //작업하는 양줄이기
  _str =  _str.replace(/[ \#\_\*\~\&\;\!\[\]\`\>\=\- ]/g ,'') //특수 문자 효율적으로 제거

  return _str
}

function Article(props) {
  const createdTime = new Date(props.createdTime);
  return (
    <div className={"Article"}>
      <div className={"Article__summary"}>
        <div className={"Article__summary__title"}>{props.title}</div>
        <div className={"Article__summary__desc"}>
          {removeSpecialCharacter(props.content)}
        </div>
        <div className={"Article__summary__etc"}>
          {createdTime.getFullYear() +
            "." +
            zeroPad(createdTime.getMonth() + 1, 2) +
            "." +
            zeroPad(createdTime.getDate(), 2)}
        </div>
      </div>
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
    </div>
  );
}

export default Article;
