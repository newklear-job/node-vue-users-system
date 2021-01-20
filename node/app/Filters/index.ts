import { ModelQueryBuilder } from '@adonisjs/lucid/build/src/Orm/QueryBuilder'

export default abstract class Filter {
  protected constructor(query) {
    this.query = query
  }
  protected query: ModelQueryBuilder
  protected filters: RequestData
  protected availableFilters: AvailableFilters

  public applyFilters(filters: RequestData): ModelQueryBuilder {
    for (let key in filters) {
      if (
        filters.hasOwnProperty(key) &&
        typeof this.availableFilters[key] === 'function' &&
        filters[key]
      ) {
        this.availableFilters[key](filters[key])
      }
    }
    return this.query
  }
}

export interface RequestData {
  [key: string]: string
}

export interface AvailableFilters {
  [key: string]: (RequestData) => void
}
