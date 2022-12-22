import apiUrl from '../apiConfig'
import axios from 'axios'

export const illustratorCreate = (data, user) => {
	console.log('this is the data for create illustrator', data.first_name, data.last_name)
	return axios({
		method: 'post',
		url: apiUrl + '/illustrators/',
		data: {
			illustrator:
			{first_name: data.first_name,
			last_name: data.last_name}
				
		
		},
		headers: {
			Authorization: `Token token=${user.token}`
		},
	})
}

export const illustratorIndex = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/illustrators',
	})
}

export const illustratorShow = (user, id) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/illustrators/' + id,
	})
}

export const illustratorUpdate = (data, user, id) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/illustrators/' + id + '/',
		data: {
			illustrator: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const illustratorDelete = (user, id) => {
	return axios({
		method: 'DELETE',
		url: apiUrl + '/illustrators/' + id,
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}