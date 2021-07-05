

module.exports =  class Player
{
    constructor(player, leader, socket_id)
    {
        this.username = player.username
        this.room_id = player.room_id
        this.io = player.io
        this.hasUsername = true
        this.hasRoom = player.hasRoom
        this.leader = leader
        this.socket_id = socket_id
    }
}

