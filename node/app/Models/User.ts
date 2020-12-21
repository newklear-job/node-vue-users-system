import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

/**
 *  @swagger
 *  definitions:
 *    schemas:
 *      UserWithoutId:
 *        type: object
 *        properties:
 *          first_name:
 *            type: string
 *            description: The user first name.
 *            example: firstName
 *          last_name:
 *            type: string
 *            description: The user last name.
 *            example: lastName
 *          gender:
 *            type: string
 *            description: The user gender.
 *            example: m
 *          email:
 *            type: string
 *            description: The user email.
 *            example: admin@admin.admin
 *          password:
 *            type: string
 *            description: The user password.
 *            example: '123456'
 *
 *        required:
 *          - firstName
 *          - lastName
 *          - email
 *          - password
 *      User:
 *        allOf:
 *          - $ref: "#/definitions/schemas/UserWithoutId"
 *          - type: object
 *          - properties:
 *             id:
 *               type: integer
 *               description: The user ID
 *               example: 1
 *             created_at:
 *               type: string
 *               description: Datetime when user was created.
 *               example: 2020-12-21T21:30:06.659+00:00
 *             updated_at:
 *               type: string
 *               description: Datetime when user was updated.
 *               example: 2020-12-21T21:30:06.659+00:00
 */

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public gender: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
