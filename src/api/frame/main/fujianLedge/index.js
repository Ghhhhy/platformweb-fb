import { post } from '@/api/http'

export function fjLedgerQuery(params) {
  return post('dfr-monitor-service/dfr/fjLedger/query', params)
}
