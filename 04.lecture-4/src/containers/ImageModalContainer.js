import React from 'react';
import { useSelector } from 'react-redux';
import ImageModal from '../components/ImageModal';

function ImageModalContainer() {
  //useSelector는 리턴값기준으로 리랜더링을 결정하는데 참조형타입을 참조할시 무조건 리랜더링이 발생함
  //해결책: 1.object를 새로만들지 않도록 state쪼개기 , 2.새로운 equality function사용
  // const { modalVisible, bgColor, src, alt } = useSelector(state => ({
  //   modalVisible: state.imageModal.modalVisible,
  //   bgColor: state.imageModal.bgColor,
  //   src: state.imageModal.src,
  //   alt: state.imageModal.alt,
  // }));

  //해결책: state 쪼개기
  const modalVisible = useSelector(state => state.ImageModal.modalVisible); //modalVisible === boolean
  const bgColor = useSelector(state => state.ImageModal.bgColor);
  const src = useSelector(state => state.ImageModal.src);
  const alt = useSelector(state => state.ImageModal.alt);

  return <ImageModal modalVisible={modalVisible} bgColor={bgColor} src={src} alt={alt} />;
}

export default ImageModalContainer;
