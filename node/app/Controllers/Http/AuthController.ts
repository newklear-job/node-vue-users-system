import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreUserValidator from 'App/Validators/Users/StoreUserValidator'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request, auth, response }: HttpContextContract) {
    const userData = await request.validate(StoreUserValidator)
    await User.create(userData)
    const token = await auth.use('api').attempt(userData.email, userData.password)

    return response.created(token.toJSON())
  }
  public async login({ request, auth, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const token = await auth.use('api').attempt(email, password)

    return response.ok(token.toJSON())
  }
}
