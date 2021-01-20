import User from 'App/Models/User'
import UsersFilter from 'App/Filters/UsersFilter'
import { RequestData } from 'App/Filters'

export function getUsers(filters: RequestData) {
  const query = User.query()
  const usersFilter = new UsersFilter(query)
  return usersFilter.applyFilters(filters)
}
