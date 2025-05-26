'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en.json'
import ru from './ru.json'

i18n.use(initReactI18next).init({
	fallbackLng: 'en',
	supportedLngs: ['en', 'ru'],
	resources: {
		en: { translation: en },
		ru: { translation: ru },
	},
	debug: false,
	interpolation: { escapeValue: false },
})

export default i18n
