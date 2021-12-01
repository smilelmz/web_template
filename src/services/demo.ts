import { IDemo } from '@/types/demo'
import services, { IResponse } from './request'

export const getDemoDate = async (): Promise<IResponse<IDemo>> => services.get<IDemo>('/api/mockdemo')
export const getDemoDateError = async (): Promise<IResponse<IDemo>> => services.get<IDemo>('/api/mockdemo/error')
