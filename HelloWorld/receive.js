var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) { // khởi tạo một kết nối tới máy chủ RabbitMQ.
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {  
            console.log(" [x] Received %s", msg.content.toString()); // xác nhận lại với server rằng đã nhận được message 
        }, {
            noAck: true
        });
    });
});