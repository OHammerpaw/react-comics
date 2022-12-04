// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { v4 as uuid } from "uuid"

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'

import AutoDismissAlert from "./components/shared/AutoDismissAlert/AutoDismissAlert"
import Header from "./components/shared/Header"
import RequireAuth from "./components/shared/RequireAuth"
import Home from "./components/Home"
import SignUp from "./components/auth/SignUp"
import SignIn from "./components/auth/SignIn"
import SignOut from "./components/auth/SignOut"
import ChangePassword from "./components/auth/ChangePassword"
import MyPage from "./components/MyPage"
import ComicIndex from "./components/ComicIndex"
import CharacterIndex from "./components/CharacterIndex"
import CharacterDetail from "./components/CharacterDetail"
import ComicDetail from "./components/ComicDetail"
import ComicCreate from "./components/ComicCreate"
import IllustratorIndex from "./components/IllustratorIndex"
import AuthorIndex from "./components/AuthorIndex"
import PublisherIndex from "./components/PublisherIndex"
import AuthorCreate from "./components/AuthorCreate"
import CharacterCreate from "./components/CharacterCreate"
import PublisherCreate from "./components/PublisherCreate"
import PublisherDetail from "./components/PublisherDetail"
import IllustratorCreate from "./components/IllustratorCreate"
import Discover from "./components/Discover"
import AuthorDetail from "./components/AuthorDetail"
import IllustratorDetail from "./components/IllustratorDetail"
import './App.css'


const App = () => {
	const [user, setUser] = useState(null)
	const [msgAlerts, setMsgAlerts] = useState([])


	console.log("user in app", user)
	console.log("message alerts", msgAlerts)
	const clearUser = () => {
		console.log("clear user ran")
		setUser(null)
	}

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return prevState.filter((msg) => msg.id !== id)
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return [{ heading, message, variant, id }]
		})
	}

	return (
		<div className="App">
			<Fragment>
				<Header user={user} />
				<Routes>
					<Route
						path="/"
						element={<Home msgAlert={msgAlert} user={user} />}
					/>
					<Route
						path="/sign-up"
						element={
							<SignUp msgAlert={msgAlert} setUser={setUser} />
						}
					/>
					<Route
						path="/sign-in"
						element={
							<SignIn msgAlert={msgAlert} setUser={setUser} />
						}
					/>
					<Route
						path="/sign-out"
						element={
							<RequireAuth user={user}>
								<SignOut
									msgAlert={msgAlert}
									clearUser={clearUser}
									user={user}
								/>
							</RequireAuth>
						}
					/>
					<Route
						path="/change-password"
						element={
							<RequireAuth user={user}>
								<ChangePassword
									msgAlert={msgAlert}
									user={user}
								/>
							</RequireAuth>
						}
					/>
					<Route
						path="/comics"
						element={<ComicIndex msgAlert={msgAlert} user={user} />}
					/>
					<Route
						path="/comics/:id"
						element={
							<ComicDetail msgAlert={msgAlert} user={user} />
						}
					/>
					<Route
						path="/characters"
						element={
							<CharacterIndex msgAlert={msgAlert} user={user} />
						}
					/>
					<Route
						path="/characters/:id"
						element={
							<CharacterDetail msgAlert={msgAlert} user={user} />
						}
					/>
					<Route
						path="/mypage"
						element={<MyPage msgAlert={msgAlert} user={user} />}
					/>
					<Route
						path="/add-comic"
						element={
							<ComicCreate msgAlert={msgAlert} user={user} />
						}
					/>
					<Route
						path="/add-character"
						element={
							<CharacterCreate msgAlert={msgAlert} user={user} />
						}
					/>
					<Route
						path="/add-illustrator"
						element={
							<IllustratorCreate
								msgAlert={msgAlert}
								user={user}
							/>
						}
					/>
					<Route
						path="/add-publisher"
						element={
							<PublisherCreate msgAlert={msgAlert} user={user} />
						}
					/>
					<Route
						path="/add-author"
						element={
							<AuthorCreate msgAlert={msgAlert} user={user} />
						}
					/>
					<Route
						path="/publishers"
						element={
							<PublisherIndex msgAlert={msgAlert} user={user} />
						}
					/>
					<Route
						path="/publishers/:id"
						element={
							<PublisherDetail msgAlert={msgAlert} user={user} />
						}
					/>
					<Route
						path="/illustrators"
						element={
							<IllustratorIndex msgAlert={msgAlert} user={user} />
						}
					/>
					<Route
						path="/illustrators/:id"
						element={
							<IllustratorDetail
								msgAlert={msgAlert}
								user={user}
							/>
						}
					/>
					<Route
						path="/authors"
						element={
							<AuthorIndex msgAlert={msgAlert} user={user} />
						}
					/>
					<Route
						path="/authors/:id"
						element={
							<AuthorDetail msgAlert={msgAlert} user={user} />
						}
					/>
					<Route 
					path='/discover' 
					element={
						<Discover msgAlert={msgAlert} user={user} />
						} 
				/>
			</Routes>
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				))}
			</Fragment>
		</div>
	)
}

export default App
