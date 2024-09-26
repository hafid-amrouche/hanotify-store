import {inDev} from '../constants/Values'

export const apiUrl =  inDev ? 'http://localhost:8000' : 'https://api.hanotify.com'
export const filesUrl = inDev ? 'http://files.localhost:8080' : 'https://files.hanotify.store'
