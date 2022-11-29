import apiUrl from '../apiConfig'
import axios from 'axios'



export const getAuthors = () => {
    return axios({
		method: 'GET',
		url: apiUrl + '/authors/',
	})
}


export const getIllustrators = () => {
    return axios({
		method: 'GET',
		url: apiUrl + '/illustrators/',
	})
}
export const getCharacters = () => {
    return axios({
		method: 'GET',
		url: apiUrl + '/characters/',
	})
}
export const getPublishers = () => {
    return axios({
		method: 'GET',
		url: apiUrl + '/publishers/',
	})
}
export const getAllComics = () => {
    return axios({
		method: 'GET',
		url: apiUrl + '/comics/',
	})
}

export const postComic = (data) => {
	console.log("this is the comic",data.title)
	return axios({
		method: 'POST',
		url: apiUrl + '/comics/',
		data : {
			comicbook : {
				title : data.title,
				edition :Number(data.edition),
				publisher: data.publisher_id,
				authors : data.comicbook_authors,
				illustrators : data.comicbook_illustrators,
				characters : data.comicbook_characters,
				release_date: data.release_date,
				cover: data.cover

			}
		},
		headers: {
			"Content-type": "application/json"
		},
	})
}

export const createCharacter = (data) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/characters/',
		body: JSON.stringify(data)
	})
}
export const createPublisher = (data) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/publishers/',
		data: {
			publisher: data
		}
	})
}

