import axios from 'axios'

export const api = axios.create({
	baseURL: (process.env.NEXT_NOTEHUB_API_URL || '').replace(/\/$/, ''),
	withCredentials: true,
})

