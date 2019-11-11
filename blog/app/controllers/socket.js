


exports.socket = function(req, res) {

    res.io.once('connection', function(io){
        // nhan du lieu
        console.log(`co user connect ${io}`);
        io.on('send-data-to-server', function(data){
            io.emit('revice-data-to-server', data); // gui rieng ve cho dung cai vua connrct len
            io.broadcast.emit('revice-data-to-server', data); // send all cho tat ca tru dung thang vua connect len
        })
    });

    res.render("socket/index");
}
