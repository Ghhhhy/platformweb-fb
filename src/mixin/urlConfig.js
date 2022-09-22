
import { codeEnvironment } from '@/config/config'
const curEnv = process.env.NODE_ENV

export const isDev = codeEnvironment['dev'] === curEnv
