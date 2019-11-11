var socket = io('http://localhost:8042/');

$(function(){
    $('#send-data').click(function(){
        let mess = $('#text-data').val().trim();
        socket.emit('send-data-to-server', mess);
    });

    socket.on('revice-data-to-server', function(data) {
        // console.log(`du lieu nhan tu server ${data}`);
        console.log(data);
        // show ra 
        $('#mess-data').append(`<p>${data}</p>`);
    })
});