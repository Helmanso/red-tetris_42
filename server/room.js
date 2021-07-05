

module.exports =  class Room
{
    constructor(room_id, player, gameStarted)
    {
        this.room_id = room_id,
        this.players = [player]
        this.gameStarted = gameStarted
    }

}

