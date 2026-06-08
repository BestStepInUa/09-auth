import { isAxiosError } from 'axios'
import type { Note, CreateNoteDto } from '@/types/note'
import { nextServer } from './api'

// NOTES
interface NotesResponse {
	notes: Note[]
	totalPages: number
}

export const fetchNotes = async ({
	searchText,
	tag,
	page,
}: {
	searchText: string
	tag?: string
	page: number
}): Promise<{ notes: Note[]; totalPages: number }> => {
	const {
		data: { notes, totalPages },
	} = await nextServer.get<NotesResponse>('/notes', {
		params: {
			search: searchText,
			tag,
			page: page,
			perPage: 12,
		},
	})

	return { notes, totalPages }
}

export const fetchNoteById = async (id: string): Promise<Note> => {
	const { data } = await nextServer.get<Note>(`/notes/${id}`)

	return data
}

export const createNote = async (createNoteDto: CreateNoteDto): Promise<Note> => {
	const { data } = await nextServer.post<Note>('/notes', createNoteDto)

	return data
}

export const deleteNote = async (id: string): Promise<Note> => {
	const { data } = await nextServer.delete<Note>(`/notes/${id}`)

	return data
}

export const updateNote = async (
	id: string,
	updateNoteDto: Partial<CreateNoteDto>,
): Promise<Note> => {
	const { data } = await nextServer.patch<Note>(`/notes/${id}`, updateNoteDto)

	return data
}

// AUTH
export type RegisterOrLoginRequest = {
	email: string
	password: string
}

export type User = {
	email: string
	username: string
	avatar: string
}

export const register = async (registerRequestDto: RegisterOrLoginRequest): Promise<User> => {
	const { data } = await nextServer.post<User>('/auth/register', registerRequestDto)

	return data
}

export const login = async (loginRequestDto: RegisterOrLoginRequest): Promise<User> => {
	const { data } = await nextServer.post<User>('/auth/login', loginRequestDto)

	return data
}

type CheckSessionResponse = {
	success: boolean
}

export const checkSession = async (): Promise<boolean> => {
	const { data } = await nextServer.get<CheckSessionResponse>('/auth/session')

	return data.success
}

export const getMe = async (): Promise<User> => {
	const { data } = await nextServer.get<User>('/users/me')

	return data
}

export const logout = async (): Promise<void> => {
	try {
		await nextServer.post('/auth/logout')
	} catch (error) {
		if (isAxiosError(error) && error.response?.status === 400) {
			return
		}
		throw error
	}
}
