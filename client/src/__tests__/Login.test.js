import { fireEvent, render, screen } from '@testing-library/react' // (or /dom, /vue, ...)
import Login from '../Components/Login'



const props = {
    player : {
        username : "",
    },
    newPlayer : jest.fn(() => 42)
}



it('Should renders correctly', () => {


    const { queryByPlaceholderText } = render(<Login props={props} />)
    expect(queryByPlaceholderText("Login-button")).toBeTruthy()
    expect(queryByPlaceholderText("username")).toBeTruthy()
})

describe("Input value", () => {
    it("doesn't update on change", () => {
        const { queryByPlaceholderText } = render(<Login props={props} />)

        const loginInput = queryByPlaceholderText('username')

        fireEvent.change(loginInput, {target : {value : "test"}})

        expect(loginInput.value).toBe("test")

    })

    it("Does not dispatch newPlayer action", () => {
        const { queryByPlaceholderText } = render(<Login props={props} />)

        const loginButton = queryByPlaceholderText('Login-button')
        fireEvent.click(loginButton)
        expect(props.newPlayer).toHaveBeenCalledTimes(1)
    })
})


