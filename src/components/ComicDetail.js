import React, { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Card, Container, Image, Button, Form, Feed } from "semantic-ui-react"
import Select from "react-select"
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"

import { comicShow, comicUpdate, comicDelete, postComic } from "../api/comic"
import comicCover from '../imgs/bampowcomiccover.png'

import {
	getAuthors,
	getCharacters,
	getIllustrators,
	getPublishers,
} from "../api/api_calls"

const ComicDetail = (props) => {
	const { user , msgAlert } = props
    const [Comic, setComic] = useState([])
    const [deleted, setDeleted] = useState(false)
    const { id } = useParams()

	// const { msgAlert } = props
	const [publishers, setPublishers] = useState()
	const [authors, setAuthors] = useState([])
	const [illustrators, setIllustrators] = useState()
	const [characters, setCharacters] = useState()
	const [loaded, setLoaded] = useState(null)
	const [startDate, setStartDate] = useState(new Date())

    useEffect(() => {
        comicShow(user, id)
            .then((res) => {
                setComic(res.data.comic_book)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Show Comic Failure' + error,
                    variant: 'danger'
                })
            })

		getAuthors()
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

		getIllustrators()
			.then((res) => {
				let illustrators = res.data.illustrators
				// console.log("the res", illustrators)
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

		getCharacters()
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

		getPublishers()
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
		console.log(Comic)
	}

	const handleSubmit = (e) => {
		// e.preventDefault()

		let year = startDate.getFullYear()
		let month = startDate.getMonth()
		let day = startDate.getDay()

		setComic((Comic.release_date = `${year}-${month}-${day}`))

// Change this to patch
		comicUpdate(Comic, user, id)
			.then(res => {navigate('/comics')})
			.then(() => {
				msgAlert({
					heading: "Success",
					message: "Comic Updated!",
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

		console.log("the comic?", Comic)
	}

	const handleIllustratorSelect = (e) => {
		let illustrators = []
		console.log(e)
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
		console.log(Comic)
	}
	const handleCharacterSelect = (e) => {
		let characters = []
		console.log("the selection", e)

		e.forEach((e) => characters.push(e.value))
		console.log("chars", characters)
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
		console.log(Comic)
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
		console.log(Comic)
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

	const handleDeleteComic = () => {
        comicDelete(user, id)
        .then(() => {
            setDeleted(true)
            // msgAlert({
            //     heading: 'Success',
            //     message: 'Deleting a Comic',
            //     variant: 'success'
            // })
            
        })
		.then(() => {navigate('/comics')})
        .catch((error) => {
            // msgAlert({
            //     heading: 'Failure',
            //     message: 'Deleting a Comic Failure' + error,
            //     variant: 'danger'
            // })
        })
    }


	const authorsInit = '[authors[1]]'

	if (Comic.cover !== undefined){
		if(Comic.cover.includes('http')){
			console.log("yup")
		} else {
			Comic.cover = comicCover
		}
	}

	return (
		<>
			<Container className="comic-panel comic-detail">
				<Card.Group >
			<Link to='/comics'> <Button>Back to All Comics</Button></Link>
				<Card>
				{
                        // Comic.cover.includes("https")
                        // ?
                        // // <>
                        //     <Image src={comicCover} />
                        // // </>
                        // :
                      
					<Image
						src={Comic.cover}
						wrapped
						ui={false}
					/>
                    }
				</Card>
				<Card>
					<Card.Content>
						<Card.Header>{Comic.title}</Card.Header>
						More about this comic
						<br />
						Illustrator: {Comic.illustrators}
						<br />
						Author: {Comic.authors}
						<br />
						Publisher: {Comic.publisher}
						<br />
						Character also appears in: TBD
					</Card.Content>
				</Card>
				</Card.Group>
			</Container>
			{
				user !== null
				?
					user.staff === true
					?
					<>
						<Container className="comic-panel">
							<Form size="medium">
								<h1 className="comic-panel-font">
									Edit this Comic
								</h1>
								<Form.Input
									required
									fluid
									label="Comic Title"
									placeholder="Title"
									onChange={handleChange}
									name="title"
									value={Comic.title}
								/>
								<Form.Field>
									<label>Edition</label>
									<input
										type="number"
										name="edition"
										onChange={handleChange}
										value={Comic.edition}
									/>
								</Form.Field>
								<Form.Field>
									<label>Authors</label>
									<Select
										// defaultValue = {[authors[1], authors[2]]}
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
									value={Comic.cover}
								/>
								<Form.Field required>
									<label>Release Date</label>
									<DatePicker
										selected={startDate}
										onChange={(date) => setStartDate(date)}
										name="releaseDate"
										dateFormat={"MM/dd/yyyy"}
									/>
								</Form.Field>

								<Form.Button color="green" onClick={handleSubmit}>Update</Form.Button>
							</Form>
						</Container>
						<Container className = "comic-panel">
							<h1 className="comic-panel-font">Delete this Comic</h1>
							<Button 
								color="red" 
								onClick={handleDeleteComic}
								>Delete Comic
							</Button>
						</Container>
						
					</>
					:
					null
				:
				null
			}
		</>
	)
}

export default ComicDetail

{/* <Card>
    <Card.Content>
      <Feed size="large">
        <Feed.Event>
          <Feed.Label image={Character.profile_picture} />
          <Feed.Content>
            <Feed.Summary>
              {Character.alias}
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Card.Content>
</Card> */}