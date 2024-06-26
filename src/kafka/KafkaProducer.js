const { Kafka } = require('kafkajs');

class KafkaProducer {
  constructor(broker) {
    this.kafka = new Kafka({ clientId: 'my-producer', brokers: [broker] });
    this.producer = this.kafka.producer();
  }

  async connect() {
    await this.producer.connect();
  }

  async sendMessage(topic, message) {
    await this.producer.send({ topic, messages: [{ value: JSON.stringify(message) }] });
    console.log("Message Sent to Kafka")
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}

module.exports = KafkaProducer;
