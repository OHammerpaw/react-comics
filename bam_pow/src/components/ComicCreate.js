import React, { useState, useEffect } from "react"
import { Form, Container, Message, Modal, Dropdown } from "semantic-ui-react"
import { useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Button } from "react-bootstrap"
import {
	getAuthors,
	getCharacters,
	getIllustrators,
	getPublishers,
	getAllComics,
} from "../api/api_calls"

const ComicCreate = (props) => {
	const { msgAlert } = props
	const [publishers, setPublishers] = useState()
	const [authors, setAuthors] = useState()
	const [illustrators, setIllustrators] = useState()
	const [characters, setCharacters] = useState()
	const [loaded, setLoaded] = useState(null)


	useEffect(() => {

		getAuthors()
			.then((res) => {
				let authors = res.data.authors
				const authorOptions = authors.map((authors, index) => ({
					key: authors.id,
					value: authors.first_name + " " + authors.last_name[index],
					text: authors.first_name + " " + authors.last_name,
					name: "illustrators",
				}))
				setAuthors(authorOptions)
			})
			.catch(console.error)
		getIllustrators()
			.then((res) => {
				let illustrators = res.data.illustrators
				console.log("the res", illustrators)
				const illustratorOptions = illustrators.map(
					(illustrator, index) => ({
						key: illustrator.id,
						value: illustrator.id,
						text:
							illustrator.first_name +
							" " +
							illustrator.last_name,
						name: "illustrator",
					})
				)
				setIllustrators(illustratorOptions)
			})
			.catch(console.error)
		getCharacters()
			.then((res) => {
				let characters = res.data.characters
				const characterOptions = characters.map(
					(characters, index) => ({
						key: index,
						value: characters.real_name,
						text: characters.real_name,
					})
				)
				setCharacters(characterOptions)
			})

			.catch(console.error)
		getPublishers()
			.then((res) => {
				let publishers = res.data.publishers
				const publisherOptions = publishers.map((publisher, index) => ({
					key: index,
					value: publisher.publisher_name,
					text: publisher.publisher_name,
				}))
				setPublishers(publisherOptions)
			})
			.catch(console.error)
		setLoaded(true)
	}, [])
	const [comic, setComic] = useState(
		{
			title: null,
			authors: null,
			illustrators: [],
			publisher: null,
			characters: null,
			releaseDate: null,
			cover: null,
		},
		[]
	)
	console.log(illustrators)
	if (loaded) {
		// console.log("out of useeffect", characters)
	}

	const navigate = useNavigate()

	const [startDate, setStartDate] = useState(new Date())

	const handleChange = (e) => {
		console.log("target?", e.target)

		setComic((prevComic) => {
			const name = e.target.getAttribute("name")
			let value = e.target.value
			const updatedComic = {
				[name]: value,
			}
			return {
				...prevComic,
				...updatedComic,
			}
		})
		console.log(comic)
	}

	const handleSubmit = (e) => {
		// e.preventDefault()

		setComic((comic.releaseDate = startDate))

		console.log("the comic?", comic)
		// navigate('/mypage')
	}

	return (
<<<<<<< HEAD
		<Container>
			<div className="comic-panel">
				<Form size="big">
					<h1 className="comic-panel-font">
						Add a comic to your collection!
					</h1>
					<Form.Input
						required
						fluid
						label="Comic Title"
						placeholder="Title"
						onChange={handleChange}
						name="title"
						value={comic.title}
					/>
					<Form.Select
						required
						fluid
						multiple
						search
						selection
						placeholder="Authors"
						name="authors"
						options={authors}
						label="Author(s)"
						onChange={handleChange}
					/>
					<Form.Select
						placeholder="Illustrators"
						required
						fluid
						multiple

						selection
						name="illustrators"
						onChange={handleChange}
						label="Illustrator(s)"
						options={illustrators}
						// value={comic.illustrators}
					/>
					<Form.Select
						required
						fluid
						search
						selection
						placeholder="Publishers"
						name="publisher"
						options={publishers}
						label="Publisher"
						onChange={handleChange}
					/>
					<Form.Select
						required
						fluid
						search
						selection
						multiple
						placeholder="Characters"
						name="characters"
						options={characters}
						label="Publisher"
						onChange={handleChange}
					/>
					<Form.Input
						required
						fluid
						label="Cover"
						placeholder="Paste a link to the cover"
						onChange={handleChange}
						name="cover"
					/>
					<Form.Field>
						<label>Release Date</label>
						<DatePicker
							selected={startDate}
							onChange={(date) => setStartDate(date)}
							name="releaseDate"
						/>
					</Form.Field>
=======
		<>
			<h1 className='edo-header' style={{color: 'white', fontSize: "60px", margin: "0, 0, 0, 0" }}>Add Comic to the Collection!</h1>
			<Container>
				<div className="comic-panel">
					<Form size="big">
						{/* <h1 className="comic-panel-font">
							Add a comic to your collection!
						</h1> */}
						<Form.Input
							required
							fluid
							label="Comic Title"
							placeholder="Title"
							onChange={handleChange}
							name="title"
							value={comic.title}
						/>
						<Form.Input
							required
							fluid
							label="Author(s)"
							placeholder="For multiple add commas e.g. (Hickman, Zdarsky)"
							onChange={handleChange}
							name="authors"
						/>
						<Form.Input
							required
							fluid
							label="Illustrator(s)"
							placeholder="For multiple add commas e.g. (Mignola, Quinones)"
							onChange={handleChange}
							name="illustrators"
						/>
						<Form.Input
							fluid
							label="Publisher"
							placeholder="Publisher"
							onChange={handleChange}
							name="publisher"
						/>
						<Form.Input
							required
							fluid
							label="Character(s)"
							placeholder="For multiple add commas e.g. (Batman, Poison Ivy)"
							onChange={handleChange}
							name="characters"
						/>
						<Form.Field>
							<label>Release Date</label>
							<DatePicker
								selected={startDate}
								onChange={(date) => setStartDate(date)}
								name="releaseDate"
							/>
						</Form.Field>
						<Message
							warning
							header="Could you check something!"
							list={[
								"That e-mail has been subscribed, but you have not yet clicked the verification link in your e-mail.",
							]}
						/>
>>>>>>> 340bd4c (Added Header text to page in the ENO font)

						<Form.Button onClick={handleSubmit}>Add</Form.Button>
					</Form>
				</div>
			</Container>
		</>
	)
}

export default ComicCreate
