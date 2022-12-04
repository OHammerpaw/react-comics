import React, { useState, useEffect } from "react"
import { Form, Container, Message, Modal, Dropdown } from "semantic-ui-react"
import { useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker"
import Select from "react-select"
import "react-datepicker/dist/react-datepicker.css"
import { Button } from "react-bootstrap"
// import { postComic } from "../api/api_calls"
import { postComic } from "../api/comic"
import { characterIndex } from "../api/character"
import { publisherIndex } from "../api/publisher"
import { illustratorIndex } from "../api/illustrator"
import { authorIndex } from "../api/author"


const ComicCreate = (props) => {
	const { msgAlert, user } = props
	const [publishers, setPublishers] = useState()
	const [authors, setAuthors] = useState()
	const [illustrators, setIllustrators] = useState()
	const [characters, setCharacters] = useState()
	const [loaded, setLoaded] = useState(null)
	const [startDate, setStartDate] = useState(new Date())

	useEffect(() => {
		authorIndex()
			.then((res) => {
				let authors = res.data.authors

				const authorOptions = authors.map((author, index) => ({
					key: author.id,
					value: author.id,
					label: author.first_name + " " + author.last_name,
				}))
				setAuthors(authorOptions)
			})
			.catch(console.error)

		illustratorIndex()
			.then((res) => {
				let illustrators = res.data.illustrators

				const illustratorOptions = illustrators.map(
					(illustrator, index) => ({
						key: illustrator.id,
						value: illustrator.id,
						label:
							illustrator.first_name +
							" " +
							illustrator.last_name,
					})
				)
				setIllustrators(illustratorOptions)
			})
			.catch(console.error)

		characterIndex()
			.then((res) => {
				let characters = res.data.characters
				const characterOptions = characters.map((character, index) => ({
					key: character.id,
					value: character.id,
					label: character.real_name,
				}))
				setCharacters(characterOptions)
			})
			.catch(console.error)

		publisherIndex()
			.then((res) => {
				let publishers = res.data.publishers
				const publisherOptions = publishers.map((publisher, index) => ({
					key: publisher.id,
					value: publisher.id,
					label: publisher.publisher_name,
				}))
				setPublishers(publisherOptions)
			})
			.catch(console.error)
		setLoaded(true)
	}, [])
	const [comic, setComic] = useState(
		{
			title: null,
			edition: null,
			publisher_id: null,
			comicbook_authors: [],
			comicbook_illustrators: [],
			comicbook_characters: [],
			release_date: null,
			cover: null,
		},
		[]
	)

	const navigate = useNavigate()

	const handleChange = (e) => {
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
		setComic((prevComic) => {
			const name = "release_date"
			let value = startDate

			const updatedComic = {
				[name]: value,
			}
			return {
				...prevComic,
				...updatedComic,
			}
		})
		
	}

	const handleSubmit = (e) => {
		// e.preventDefault()
		
		let year = startDate.getFullYear()
		let month = startDate.getMonth()
		
		let day = startDate.getDay()
		

		const formattedDate = `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`;
		setComic((comic.release_date = formattedDate))
		// setComic((comic.release_date = startDate))

		postComic(comic, user)
			.then(res => {navigate('/comics')})
			.then(() => {
				msgAlert({
					heading: "Success",
					message: "Comic Added!",
					variant: "success",
				})
			})
			.catch((error) => {
				msgAlert({
					heading: "Failure",
					message: "Comic Add Failure" + error,
					variant: "danger",
				})
			})


	}

	const handleIllustratorSelect = (e) => {
		let illustrators = []

		e.forEach((e) => illustrators.push(e.value))
		setComic((prevComic) => {
			const name = "comicbook_illustrators"
			let value = illustrators
			const updatedComic = {
				[name]: value,
			}
			return {
				...prevComic,
				...updatedComic,
			}
		})

	}
	const handleCharacterSelect = (e) => {
		let characters = []


		e.forEach((e) => characters.push(e.value))

		setComic((prevComic) => {
			const name = "comicbook_characters"
			let value = characters
			const updatedComic = {
				[name]: value,
			}
			return {
				...prevComic,
				...updatedComic,
			}
		})

	}

	const handleAuthorSelect = (e) => {
		let authors = []
		e.forEach((e) => authors.push(e.value))
		setComic((prevComic) => {
			const name = "comicbook_authors"
			let value = authors
			const updatedComic = {
				[name]: value,
			}
			return {
				...prevComic,
				...updatedComic,
			}
		})

	}
	const handlePublisherSelect = (e) => {
		let publisher = e.value
		setComic((prevComic) => {
			const name = "publisher_id"
			let value = publisher
			const updatedComic = {
				[name]: value,
			}
			return {
				...prevComic,
				...updatedComic,
			}
		})
	}
	const handleDateChange = (e) => {
		setStartDate(e)
	}

	return (
		<Container>
			<div className="comic-panel">
				<Form size="medium">
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
					<Form.Field>
						<label>Edition</label>
						<input
							type="number"
							name="edition"
							onChange={handleChange}
						/>
					</Form.Field>
					<Form.Field>
						<label>Authors</label>
						<Select
							required
							options={authors}
							name="authors"
							isMulti
							onChange={handleAuthorSelect}
						/>
					</Form.Field>
					<Form.Field>
						<label>Illustrators</label>
						<Select
							required
							options={illustrators}
							name="illustrators"
							isMulti
							onChange={handleIllustratorSelect}
						/>
					</Form.Field>

					<Form.Field>
						<label>Publisher</label>
						<Select
							required
							options={publishers}
							name="publisher"
							onChange={handlePublisherSelect}
						/>
					</Form.Field>

					<Form.Field required>
						<label>Characters</label>
						<Select
							required
							options={characters}
							name="characters"
							isMulti
							onChange={handleCharacterSelect}
						/>
					</Form.Field>
					<Form.Input
						fluid
						label="Cover"
						placeholder="Paste a link to the cover"
						onChange={handleChange}
						name="cover"
					/>
					<Form.Field required>
						<label>Release Date</label>
						<DatePicker
							selected={startDate}
							onChange={handleDateChange}
							name="releaseDate"
							
						/>
					</Form.Field>

					<Form.Button onClick={handleSubmit}>Add</Form.Button>
				</Form>
			</div>
		</Container>
	)
}

export default ComicCreate
