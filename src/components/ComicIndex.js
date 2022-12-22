import React, { useEffect, useState } from "react"
import { Card, Icon, Image, Container, Button } from "semantic-ui-react"
import { Link } from "react-router-dom"

import { comicIndex } from "../api/comic"
import bampowCover from "../imgs/bampowcomiccover.png"

const ComicIndex = ({ user, msgAlert }) => {
	const [allComics, setAllComics] = useState([])

	useEffect(() => {
		comicIndex(user)
			.then((res) => {
				setAllComics(res.data.comic_books)
			})
			.catch((error) => {
				msgAlert({
					heading: "Failure",
					message: "Index Comics Failure" + error,
					variant: "danger",
				})
			})
	}, [])

	// somefunc function checkURL(url) {
    // return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
	// function checkURL(url) {
	// 	if(url.match(/\.(jpeg|jpg|gif|png)$/)){
	// 		return (url)
	// 	} else {
	// 		return <Bam Pow Image link goes here>
	// 	}
	// }
	const checkURL = (url) => {
		if (url !== null) {
			if(url.match(/\.(jpeg|jpg|gif|png)$/)){
				console.log("in match",url)
				return (url)
			} else {
				return (bampowCover)
			}
		}
	}


	const ComicCards = allComics.map((Comic, index) => (
		<Card key={index}>
			{/* {Comic.cover !== undefined  ? ( */}
				<Image src={checkURL(Comic.cover)} wrapped ui={false} />

			{/* ) : (
				<Image src={bampowCover} wrapped ui={false} />
			)} */}
			<Card.Content>
				<Card.Header>{Comic.title}</Card.Header>

				<Card.Meta>{Comic.release_date}</Card.Meta>

				<Card.Description>Edition {Comic.edition}</Card.Description>
				<Link to={`/comics/${Comic.id}`}>
					<Button primary>View Comic</Button>
				</Link>
			</Card.Content>

			{/* extra content for the bottom to link to just that line of comics or something */}
			{/* Maybe we should have a main character listed so we can say "Iron man appears in 'x' other issues" */}
			{/* <Card.Content extra>
                <a>
                    <Icon name='user' />
                    {Comic.name} appears in {Comic.editions} editions
                </a>
            </Card.Content> */}
		</Card>
	))

	return (
		<>
			<Link to="/discover">
				<Button color="orange" className="back-button">
					<i class="left arrow icon"></i>
					Back to Discover
				</Button>
			</Link>
			<h1 className="index-header">All Comics</h1>
			<Container className="comic-panel">
				<Card.Group centered>{ComicCards}</Card.Group>
			</Container>
		</>
	)
}

export default ComicIndex
