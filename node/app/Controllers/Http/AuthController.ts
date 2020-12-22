import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreUserValidator from 'App/Validators/Users/StoreUserValidator'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const userData = await request.validate(StoreUserValidator)
    const user = await User.create(userData)
    return response.created(user)
  }
  public async login({ request, auth, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const token = await auth.use('api').attempt(email, password)
    return response.ok(token.toJSON())
  }
}
