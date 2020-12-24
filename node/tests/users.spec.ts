import test from 'japa'
import supertest from 'supertest'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import { UserFactory } from 'Database/factories/authorization'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Authorization', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('ensure register works and email is unique', async (assert) => {
    const userData = await UserFactory.make()
    const userToRegister = userData.$attributes
    const { body: bodyFirst, status: statusFirst } = await supertest(BASE_URL)
      .post('/v1/register')
      .send({
        ...userToRegister,
        ...{ password_confirmation: userToRegister.password },
      })
      .set('Accept', 'application/json')
    assert.equal(statusFirst, 201)
    assert.equal(bodyFirst.email, userToRegister.email)
    assert.notEqual(bodyFirst.password, userToRegister.password)

    const { body: bodySecond, status: statusSecond } = await supertest(BASE_URL)
      .post('/v1/register')
      .send({
        ...userToRegister,
        ...{ password_confirmation: userToRegister.password },
      })
    assert.equal(statusSecond, 422)
    assert.equal(bodySecond.errors[0].rule, 'unique')
  })

  test('ensure login works', async (assert) => {
    const userData = await UserFactory.make()
    const user = await User.create(userData.$attributes)

    const { body: bodyLogin, status: statusLogin } = await supertest(BASE_URL)
      .post('/v1/login')
      .send({ email: user.email, password: userData.password })
      .set('Accept', 'application/json')

    assert.equal(statusLogin, 200)
    assert.equal(bodyLogin.type, 'bearer')
    assert.exists(bodyLogin.token)
    assert.notEqual(userData.$attributes.password, user.password)
  })
})
