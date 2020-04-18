import PubNub from 'pubnub';
import pubnubConfig from './pubnub.config';
import { createContext } from 'react';

export const PubSubContext = createContext();
export const MESSAGE_CHANNEL = 'MESSAGE_CHANNEL';

class PubSub {
  constructor() {
    this.pubnub = new PubNub(pubnubConfig);
    this.pubnub.subscribe({ channels: [MESSAGE_CHANNEL] });
  }

  // code we want to fire when messages are published to the channel
  addListener = listenerConfig => {
    this.pubnub.addListener(listenerConfig);
  };

  publish = message => {
    console.log('Published message', message);
    this.pubnub.publish({ message, channel: MESSAGE_CHANNEL });
  };
}

export default PubSub;
