import apiUrl from '../apiConfig'
import axios from 'axios'

export const characterCreate = (data, user) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/characters/',
		data: {
			character: 
			{real_name: data.real_name,
			alias: data.alias,
			details: data.details}
		},
		headers: {
			Authorization: `Token token=${user.token}`
		},
	})
}

export const characterIndex = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/characters',
	})
}

export const characterShow = (user, id) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/characters/' + id,
	})
}

export const characterUpdate = (data, user, id) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/characters/' + id + '/',
		data: {
			character: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const characterDelete = (user, id) => {
	return axios({
		method: 'DELETE',
		url: apiUrl + '/characters/' + id,
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}