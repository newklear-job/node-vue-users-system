import Filter from 'App/Filters'

export default class UsersFilter extends Filter {
  constructor(query) {
    super(query)

    this.availableFilters = {
      id: (id: string) => {
        this.query.where('id', id)
      },
      email: (email: string) => {
        this.query.where('email', 'like', `%${email}%`)
      },
      first_name: (first_name: string) => {
        this.query.where('first_name', 'like', `%${first_name}%`)
      },
      last_name: (last_name: string) => {
        this.query.where('last_name', 'like', `%${last_name}%`)
      },
      gender: (gender: string | null) => {
        if (gender === 'i') {
          gender = null
        }
        this.query.where('gender', gender)
      },
      created_at: (created_at: string) => {
        this.query.where('created_at', '>', created_at)
      },
      updated_at: (updated_at: string) => {
        this.query.where('updated_at', '>', updated_at)
      },
    }
  }
}
