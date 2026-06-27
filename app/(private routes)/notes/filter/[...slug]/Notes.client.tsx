'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { fetchNotes } from '@/lib/api/clientApi'
import SearchBox from '@/components/SearchBox'
import Pagination from '@/components/Pagination'
import NoteList from '@/components/NoteList'

import { Note } from '@/types/note'

import css from './NotesPage.module.css'
import Link from 'next/link'

type NotesClientProps = {
	tag?: string
}

export default function NotesClient({ tag }: NotesClientProps) {
	const [currentPage, setCurrentPage] = useState(1)
	const [searchQuery, setSearchQuery] = useState('')

	const { data } = useQuery<{ notes: Note[]; totalPages: number }, Error>({
		queryKey: ['notes', searchQuery, tag, currentPage],
		queryFn: () => fetchNotes({ searchText: searchQuery, tag, page: currentPage }),
		placeholderData: (previousData) => previousData,
		refetchOnMount: false,
	})

	const notes = data?.notes || []
	const totalPages = data?.totalPages ? data.totalPages : 0

	const handleSearch = useDebouncedCallback((searchQuery: string) => {
		setSearchQuery(searchQuery)
		setCurrentPage(1)
	}, 300)

	return (
		<div className={css.app}>
			<div className={css.toolbar}>
				<SearchBox onSearch={handleSearch} />
				{totalPages > 1 && (
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={setCurrentPage}
					/>
				)}
				<Link className={css.button} href='/notes/action/create'>
					Create note +
				</Link>
			</div>
			{notes.length > 0 && <NoteList notes={notes} />}
		</div>
	)
}
