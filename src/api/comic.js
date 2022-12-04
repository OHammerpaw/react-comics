import apiUrl from '../apiConfig'
import axios from 'axios'

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
		// headers: {
		// 	Authorization: `Token token=${user.token}`
		// },
	})
}

export const comicIndex = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/comics',
	})
}

export const comicShow = (user, id) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/comics/' + id,
	})
}

export const comicUpdate = (data, user, id) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/comics/' + id + '/',
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
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const comicDelete = (user, id) => {
	return axios({
		method: 'DELETE',
		url: apiUrl + '/comics/' + id,
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}