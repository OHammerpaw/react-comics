import React, { useState, useEffect } from "react"
import { Button, Card, Image, Container, Grid } from "semantic-ui-react"
// import { Button } from 'semantic-ui-css'
import comicBg from "../imgs/loginpage.svg"
// import components for
import Favorites from "./Favorites"
import { favoritesIndex } from "../api/favorites"

const MyPage = ({ user, msgAlert }) => {
	// const [favorites, setFavorites] = useState(null)

	useEffect(() => {
		favoritesIndex(user)
			.then((res) => {
				console.log("the res",res.data)
				// setFavorites(res.data.favorites)
			})
			.catch((error) => {
				msgAlert({
					heading: "Failure",
					message: "Index Favorites Failure" + error,
					variant: "danger",
				})
			})
	},[])
	// console.log("the faves", favorites)
	return (
		<div>
			<Container>
				<Grid stackable>
					
					<Grid.Column floated="center">
						<div className="comic-panel">
							<Favorites user={user} msgAlert={msgAlert}
							
							/>
						</div>
					</Grid.Column>
				</Grid>
			</Container>
		</div>
	)
}

export default MyPage
