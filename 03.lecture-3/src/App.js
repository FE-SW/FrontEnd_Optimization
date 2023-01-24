import React from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css'
import './styles.css'

import Header from './components/Header'
import Footer from './components/Footer'
import MainPage from './pages/MainPage'
import ItemsPage from './pages/ItemsPage'
import PartPage from './pages/PartPage'
import RidingStylesPage from './pages/RidingStylesPage'

function App() {
	return (
		<div className="App">
			<Header/>
			<section className="mx-auto mt-16">
				<Switch>
					<Route path="/" component={MainPage} exact/>
					<Route path="/items" component={ItemsPage} exact/>
					<Route path="/part" component={PartPage} exact/>
					<Route path="/riding-styles" component={RidingStylesPage} exact/>
				</Switch>
			</section>
			<Footer/>
		</div>
	)
}

export default App

// npx serve ./build 빌드된파일 실행
// https://purgecss.com/: html,js 문자열을 추출한뒤 css 있는 클레스네임과 비교해 포함되어있지 않다면 해당 클레스를 전부 제거함 