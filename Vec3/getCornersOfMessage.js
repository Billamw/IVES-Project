autowatch = 1;
outlets = 2;

function packFromMessage(message) {
    // post(message)
    var split = message.split(" ");
    // post(split[0])
    // post(split[2])
    split.reverse();
    split.pop();
    split.reverse();
    for(var i=0; i<split.length; i++) {

        post(split[i])
    }
    
    // outlet(0, args[0])
}
