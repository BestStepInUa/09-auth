import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Not found',
	description: 'Page not found.',
	...NO_INDEX_PAGE,
	openGraph: {
		type: 'website',
		url: process.env.NEXT_OG_APP_URL || 'http://localhost:3000',
		title: 'Not found',
		description: 'Page not found.',
		siteName: 'BestNotes App',
		images: [
			{
				url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
				width: 1536,
				height: 1024,
				alt: 'BestNotes App',
			},
		],
	},
}

export default function NotFound() {
	return (
		<div className='not-foundContainer'>
			<h1 className='not-foundTitle'>404 - Page not found</h1>
			<p className='not-foundDescription'>Sorry, the page you are looking for does not exist.</p>
		</div>
	)
}
