import profile from "./profile";
import { loggedIn, loggedOut, setUser } from "../actions/profile";


describe('Редьюсер profile', () => {
    const profileDefault = {'loggedIn': false, 'email': undefined, 'user': undefined}
    const user = {'email': 'test@test.ru', 'name': 'Marina'}

    it('возвращает начальное состояние при чужом экшене', () => {
        expect(
            profile(profileDefault, {})
        ).toEqual(profileDefault)
    })

    it('loggedIn записывает в стор информацию о пользователе', () => {
        expect(
            profile(profileDefault, loggedIn(user))
        ).toEqual(
            {'loggedIn': true, ...user}
        )
    })

    it('loggedOut обнуляет пользовательский профиль в сторе', () => {
        expect(
            profile({'loggedIn': true, ...user}, loggedOut())
        ).toEqual(
            profileDefault
        )
    })

    it('setUser записывает в стор информацию о пользователе', () => {
        expect(
            profile(profileDefault, setUser(user))
        ).toEqual(
            {'loggedIn': false, ...user}
        )
    })

})
