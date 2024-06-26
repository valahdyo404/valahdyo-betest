const { Kafka } = require('kafkajs');
const User = require('../models/User');

class KafkaConsumer {
  constructor(broker, groupId, topic) {
    this.kafka = new Kafka({ clientId: 'my-consumer', brokers: [broker] });
    this.consumer = this.kafka.consumer({ groupId });
    this.topic = topic;
  }

  async connect() {
    await this.consumer.connect();
  }

  async start() {
    await this.consumer.subscribe({ topic: this.topic, fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const userInfo = JSON.parse(message.value.toString());
        const user = new User(data);
        await user.save(userInfo);
      },
    });
  }

  async disconnect() {
    await this.consumer.disconnect();
  }
}

module.exports = KafkaConsumer;
