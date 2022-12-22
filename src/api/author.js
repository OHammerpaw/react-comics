import apiUrl from '../apiConfig'
import axios from 'axios'

export const authorCreate = (data, user) => {
	console.log('this is the data for create author', data.first_name, data.last_name)
	return axios({
		method: 'post',
		url: apiUrl + '/authors/',
		data: {
			author:
			{first_name: data.first_name,
			last_name: data.last_name}
				
		
		},
		headers: {
			// 'Content-Type' : 'application/json',
			Authorization: `Token token=${user.token}`
		},
	})
}

export const authorIndex = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/authors',
	})
}

export const authorShow = (user, id) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/authors/' + id,
	})
}

export const authorUpdate = (data, user, id) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/authors/' + id + '/',
		data: {
			author: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const authorDelete = (user, id) => {
	return axios({
		method: 'DELETE',
		url: apiUrl + '/authors/' + id,
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}