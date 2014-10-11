using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace SignalRWebAPI.Hubs
{
    public class ChannelHub : Hub
    {
        public Task RegisterForChannelNotifications(string channel)
        {
            return Groups.Add(Context.ConnectionId, channel);
        }

        public Task UnregisterForChannelNotifications(string channel)
        {
            return Groups.Remove(Context.ConnectionId, channel);
        }

        /// <summary>
        /// Context instance to access client connections to broadcast to
        /// </summary>
        public static IHubContext HubContext
        {
            get
            {
                if (_context == null)
                    _context = GlobalHost.ConnectionManager.GetHubContext<ChannelHub>();

                return _context;
            }
        }

        static IHubContext _context = null;

        /// <summary>
        /// Writes out message to all connected SignalR clients
        /// </summary>
        /// <param name="channelName"></param>
        /// <param name="message"></param>
        public static void WriteMessage(string channelName, string message)
        {
            HubContext.Clients.Group(channelName).receiveMessage(message);
        }

        //See http://weblog.west-wind.com/posts/2013/Sep/04/SelfHosting-SignalR-in-a-Windows-Service for example of calling from external event sources

    }
}