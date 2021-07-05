import { fireEvent, render, screen } from '@testing-library/react' // (or /dom, /vue, ...)
import Room from '../Components/Room'



const { createServer } = require("http")
const { Server } = require("socket.io")
const Client = require("socket.io-client");

const props = {
    player : {
        username : "",
        room_id : 0,
        error : true,
    },
    socket : {
        socket : {
            on : jest.fn(() => 42)
        }
    },
    newPlayer : jest.fn(() => 42),
    newRoom: jest.fn(() => 42),
}


it('Should renders correctly', () => {
    const { queryByPlaceholderText } = render(<Room props={props} />)
    expect(queryByPlaceholderText("id")).toBeTruthy()
    expect(queryByPlaceholderText("button-room")).toBeTruthy()
})


describe("Input value", () => {
    let io, serverSocket, clientSocket;


    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
          const port = httpServer.address().port;
          clientSocket = new Client(`http://localhost:${port}`);
          io.on("connection", (socket) => {
            serverSocket = socket;
          });
          clientSocket.on("connect", done);
        });
      });


    it("doesn't update on change", () => {
        const { queryByPlaceholderText } = render(<Room props={props} />)

        const roomInput = queryByPlaceholderText('id')

        fireEvent.change(roomInput, {target : {value : "test"}})

        expect(roomInput.value).toBe("test")

    })

    test("Does not dispatch newRoom action", (done) => {

        const props = {
            player : {
                username : "",
                room_id : 0,
                error : true,
            },
            socket : {
                socket : clientSocket
            },
            newRoom: jest.fn(() => 42),
            newLooby : jest.fn((players) => players),
        }
        

        
        const { queryByPlaceholderText } = render(<Room props={props} />)
        
        const roomButton = queryByPlaceholderText('button-room')
        fireEvent.click(roomButton)
        
        expect(props.newRoom).toHaveBeenCalledTimes(1)

        serverSocket.emit(8, (props.player))

        setTimeout(() => {
            expect(props.newLooby).toHaveBeenCalledTimes(1)
            done()
        }, 50)

    })
})

