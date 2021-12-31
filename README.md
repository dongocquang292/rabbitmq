# RabbitMQ

**Flow cơ bản của RabbitMQ:

-Producer gửi (publish) message vào exchange
-Exchange nhận message và chịu trách nhiệm điều hướng message
-Binding là những config nằm giữa Exchange và Queue. Như hình trên thì ta thấy các Bindings đang điều hướng vào 2 Queues khác nhau.
-Messages đã được gửi vào trong Queues. Và đợi cho đến khi Consumers lấy ra để xử lý.
-Consumers xử lý Messages

** Các loại Exchanges: direct, topic, headers, fanout 

1.Direct Exchange: 
điều hướng Messages dựa vào routing keys, queue có binding_key nào match thì truyền message vào, 1 message có thể truyền vào nhiều queue có binding_key match với nó

2.Topic Exchange:
điều hướng Messages dựa trên wildcard matchs:so khớp dựa trên pattern chứa các kí tự như là dấu sao (*), hoặc dấu chấm (.)
- abc*: chuỗi bắt đầu bằng “abc”, nối tiếp sẽ là 1 hoặc nhiều kí tự
- abc.: bắt đầu bằng “abc”, nối tiếp là 1 ký tự bất kì
Routing Key sẽ là những từ được phân cách bằng dấu chấm (.), Routing Patterns có thể chứa dấu sao (*) để match với 1 từ ở 1 vị trí cụ thể trong routing key
Ký tự dấu thăng (#) chỉ việc khớp với 0 hoặc nhiều từ
Các messages có routing key khớp với pattern thì được điều hướng tới queue đó và đợi có consumer lấy ra sử dụng.

3.Headers Exchange
Tương tự như Topic Exchanges, nhưng điều hướng dựa trên header value chứ không phải routing key. 
Một message được match là khi giá trị trên header bằng với giá trị trên binding.
Có một argument đặc biệt gọi là “x-match”, nó được thêm vào trong binding, giữa exchange, x-match cho biết tất cả headers cần match hết hay chỉ cần một cái. 

x-match có 2 giá trị: “any” hoặc “all”. Với “all” là giá trị mặc định.
- “all”: nghĩa là nó cần tất cả các cặp header (key-value) phải match
- “any”: nghĩa là chỉ cần ít nhất 1 cặp key-value được match

4.Fanout Exchange
điều hướng messages tới tất cả các queue, không quan tâm đến Routing Key hay Routing Pattern.
Nếu lúc init có tạo key, thì key đó sẽ bị ignore
