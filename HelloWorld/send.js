var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) { // kết nối với Rabbitmq
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';
        var msg = 'Hello World!';

        channel.assertQueue(queue, { // chắc chắnb queue đã tồn tại, nếu chúng ta gửi message vào queue chưa có sẵn, các message này sẽ được RabbitMQ* cho vào trash.
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg)); // gửi message vào queue

        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() {
        connection.close(); // đóng kết nối với Rabbitmq
        process.exit(0);
    }, 500);
});