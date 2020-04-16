using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalR.Hubs
{
    public class XoHub : Hub
    {

        public async Task AddPlayer()
        {
            string msg;
            if(!Player.Player1)
            {
                Player.Player1 = true;
                msg = "X";
            }
            else
            {
                Player.Player2 = true;
                msg = "O";
            }
            await Clients.All.SendAsync("ReceivePlayer", msg);
        }
        public async Task SendCase(string player, string c) //c = case
        {
            await Clients.All.SendAsync("ReceiveCase", player ,c);
        }
    }
}
