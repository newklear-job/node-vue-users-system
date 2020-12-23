import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreUserValidator from 'App/Validators/Users/StoreUserValidator'
import UpdateUserValidator from 'App/Validators/Users/UpdateUserValidator'

export default class UsersController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = 10
    const users = await User.query().paginate(page, perPage)
    return response.ok(users)
  }

  public async store({ request, response }: HttpContextContract) {
    const userData = await request.validate(StoreUserValidator)
    const user = await User.create(userData)
    return response.created(user)
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    return response.ok(user)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const userPromise = User.findOrFail(params.id)
    const userDataPromise = request.validate(UpdateUserValidator)
    const [userData, user] = await Promise.all([userDataPromise, userPromise])
    user.merge(userData)
    await user.save()
    return response.ok(user)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    user.delete()
    return response.accepted(user)
  }
}
