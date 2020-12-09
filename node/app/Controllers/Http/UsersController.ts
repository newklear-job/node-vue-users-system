import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  /**
   * @swagger
   * /v1/users:
   *   get:
   *     tags:
   *       - Users
   *     summary: Users index
   *     responses:
   *       200:
   *         description: Get all users
   *         example:
   *           message: Hello Guess (temporary)
   */
  public async index({}: HttpContextContract) {
    return { here: 'dude' }
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
