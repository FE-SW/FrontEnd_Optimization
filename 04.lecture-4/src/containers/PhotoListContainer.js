import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import PhotoList from '../components/PhotoList';
import { fetchPhotos } from '../redux/photos';

function PhotoListContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  //useSelector는 리턴값기준으로 리랜더링을 결정하는데(equality function) 참조형타입을 참조할시 무조건 리랜더링이 발생함
  //해결책: 1.object를 새로만들지 않도록 state쪼개기 , 2.새로운 equality function사용
  // const { photos, loading } = useSelector(state => ({
  //   photos:
  //     state.category.category === 'all'
  //       ? state.photos.data
  //       : state.photos.data.filter(photo => photo.category === state.category.category),
  //   loading: state.photos.loading,
  // }));

  //해결책: 새로운 equality function사용 => shallowEqual함수는 참조값이 아닌 참조의 프로퍼티 하나하나를 비교해 리랜더링을 결정
  const { category, alllPhotos, loading } = useSelector(
    state => ({
      category: state.category.category,
      allPhotos: state.photos.data, //filter함수의 반환값때문에 shallowEqual를 적용해도 불필요한 리랜더링이 발생함
      loading: state.photos.loading,
    }),
    shallowEqual
  );

  const photos =
    category === 'all' ? alllPhotos : alllPhotos.filter(photo => photo.category === category);

  if (loading === 'error') {
    return <span>Error!</span>;
  }

  if (loading !== 'done') {
    return <span>loading...</span>;
  }

  return <PhotoList photos={photos} />;
}

export default PhotoListContainer;
