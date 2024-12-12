import { Injectable } from '@nestjs/common';
import { Channel, connect, Connection, Message } from 'amqplib';

@Injectable()
export class RabbitmqService {

    private connection: Connection;
    private channel: Channel;

    async init() {

        try {

            this.connection = await connect(process.env.RABBIT_URL);
            this.channel = await this.connection.createChannel();

        } catch (e) {

            console.error(e);

        }

    }

    async publishInQueue(queue: string, message: string) {

        try {

            if (!this.channel) {
                await this.init();
            }

            await this.channel.assertQueue(queue);

            return this.channel.sendToQueue(queue, Buffer.from(message));

        } catch (e) {

            console.error(e);

        }

    }

    async consumeQueue(queue: string, callback: (message: Message) => void) {

        try {

            if (!this.channel) {
                await this.init();
            }

            await this.channel.assertQueue(queue);

            await this.channel.consume(queue, (message) => {

                try {

                    callback(message);
                    this.channel.ack(message);

                } catch (e) {

                    console.error(e);

                }

            });

        } catch (e) {

            console.error(e);

        }

    }

}
