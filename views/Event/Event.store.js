import {
  Store
} from 'lib/bosque';
import {eventActions} from './Event.actions';
import {Chat} from 'resources/Chat/Chat.resource';

const noChatDataFound = Symbol('NoChatDataFound');

export class EventStore extends Store {
  constructor(name) {
    super(name);
    this.setInitialData({
      /**
       * Set to a Chat instance when chat data comes back.
       * If data is empty, it is set to the noChatDataFound Symbol.
       */
      chat: null
    });
    this.addTargetedListener(eventActions.SET_CHAT, this._setChat);
  }

  _setChat(chat) {
    if (!chat) {
      this.set('chat', noChatDataFound);
      return;
    }
    const sortedMessages = chat.messages.sort((a, b) => {
      return a.createdAt.seconds > b.createdAt.seconds ? 0 : 1;
    });
    const processedChat = new Chat({
      ...chat,
      messages: sortedMessages
    });
    this.set('chat', processedChat);
  }

  get isReady() {
    return this.chat !== null;
  }

  get isEmpty() {
    return this.chat === noChatDataFound;
  }
}
