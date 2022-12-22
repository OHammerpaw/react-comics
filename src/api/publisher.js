import apiUrl from '../apiConfig'
import axios from 'axios'

export const publisherCreate = (data, user) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/publishers/',
		data: {
			publisher: 
			{publisher_name: data.publisher_name}
		},
		headers: {
			Authorization: `Token token=${user.token}`
		},
	})
}

export const publisherIndex = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/publishers',
	})
}

export const publisherShow = (user, id) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/publishers/' + id,
	})
}

export const publisherUpdate = (data, user, id) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/publishers/' + id + '/',
		data: {
			publisher: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const publisherDelete = (user, id) => {
	return axios({
		method: 'DELETE',
		url: apiUrl + '/publishers/' + id,
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}