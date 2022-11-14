/// <reference types="minecraft-scripting-types-server" />


const system = server.registerSystem(0, 0);

system.sendMessage = function(message) {
    // Creating event data.
    let messageEventData = this.createEventData("minecraft:display_chat_event");
 
    messageEventData.data.message = message;
 
    // Broadcasting the event.
    this.broadcastEvent("minecraft:display_chat_event", messageEventData);
}