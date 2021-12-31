var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error, connection) {
    connection.createChannel(function(error, channel) {
        var queue = 'task_queue';

        channel.assertQueue(queue, {
            durable: true
        });
        channel.prefetch(1); // đảm bảo không truyền nhiều hơn 1 message cho 1 worker tại 1 thời điểm
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function(msg) {
            var secs = msg.content.toString().split('.').length - 1;

            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function() {
                console.log(" [x] Done");
                channel.ack(msg);
            }, secs * 1000);
        }, {
            noAck: false // ack sẽ thông báo lại cho Rabbitmq rằng message đã được nhận, đang được xử lý và Rabbitmq có thể xóa message đó
            // nếu 1 consumer die sẽ không gửi lại ack cho Rabbit, 
            //Rabbit sẽ hiểu là message đó chưa đc thực hiện hoàn toàn và sẽ re-queue lại message, gửi message đó cho consumer nào đang rảnh 
        });
    });
});