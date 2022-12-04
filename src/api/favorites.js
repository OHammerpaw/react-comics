import apiUrl from '../apiConfig'
import axios from 'axios'



export const favoritesIndex = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/favorites/',
		headers: {
			Authorization: `Token ${user.token}`,
		},
	})
}

export const favoritesAuthorPost = (data,user) => {
	console.log("data in patch",data)
	return axios({
		method: 'PATCH',
		url: apiUrl + '/favorites/' + user.id + '/',
		headers: {
			Authorization: `Token ${user.token}`,
		},
		data : {
			favorites : {
				favorite_authors: [data.favorite_authors]
				
			},
			owner: user.id
		}
	})
}

export const favoritesIllustratorPost = (data,user) => {
	console.log("data in patch",data)
	return axios({
		method: 'PATCH',
		url: apiUrl + '/favorites/' + user.id + '/',
		headers: {
			Authorization: `Token ${user.token}`,
		},
		data : {
			favorites : {
				favorite_illustrators: [data.favorite_illustrators]
				
			},
			owner: user.id
		}
	})
}

export const favoritesCharacterPost = (data,user) => {
	console.log("data in patch",data)
	return axios({
		method: 'PATCH',
		url: apiUrl + '/favorites/' + user.id + '/',
		headers: {
			Authorization: `Token ${user.token}`,
		},
		data : {
			favorites : {
				favorite_characters: [data.favorite_characters]
				
			},
			owner: user.id
		}
	})
}

export const favoritesPublisherPost = (data,user) => {
	console.log("data in patch",data)
	return axios({
		method: 'PATCH',
		url: apiUrl + '/favorites/' + user.id + '/',
		headers: {
			Authorization: `Token ${user.token}`,
		},
		data : {
			favorites : {
				favorite_publishers: [data.favorite_publishers]
				
			},
			owner: user.id
		}
	})
}