import { cookies } from 'next/headers'
import { nextServer } from './api'
import { CheckSessionResponse, NotesResponse, User } from './clientApi'
import type { Note } from '@/types/note'

export const checkServerSession = async () => {
	const cookieStore = await cookies()
	const res = await nextServer.get<CheckSessionResponse>('/auth/session', {
		headers: {
			cookie: cookieStore.toString(),
		},
	})
	return res
}

export const getServerMe = async (): Promise<User> => {
	const cookieStore = await cookies()
	const { data } = await nextServer.get<User>('/users/me', {
		headers: {
			Cookie: cookieStore.toString(),
		},
	})
	return data
}

export const fetchServerNotes = async ({
	searchText,
	tag,
	page,
}: {
	searchText: string
	tag?: string
	page: number
}): Promise<{ notes: Note[]; totalPages: number }> => {
	const cookieStore = await cookies()
	const {
		data: { notes, totalPages },
	} = await nextServer.get<NotesResponse>('/notes', {
		params: {
			search: searchText,
			tag,
			page: page,
			perPage: 12,
		},
		headers: {
			cookie: cookieStore.toString(),
		},
	})

	return { notes, totalPages }
}

export const fetchServerNoteById = async (id: string): Promise<Note> => {
	const cookieStore = await cookies()
	const { data } = await nextServer.get<Note>(`/notes/${id}`, {
		headers: {
			cookie: cookieStore.toString(),
		},
	})

	return data
}
