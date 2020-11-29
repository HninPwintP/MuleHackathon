import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import Dinosaur_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/DinosaurListUpdate__c';
export default class BearMap extends LightningElement {
  mapMarkers = [];
  subscription = null;
  @wire(MessageContext)
  messageContext;
  connectedCallback() {
    // Subscribe to BearListUpdate__c message
    this.subscription = subscribe(
        this.messageContext,
        Dinosaur_LIST_UPDATE_MESSAGE,
        (message) => {
            this.handleBearListUpdate(message);
        });
  }
  disconnectedCallback() {
    // Unsubscribe from BearListUpdate__c message
    unsubscribe(this.subscription);
    this.subscription = null;
  }
  handleBearListUpdate(message) {
    this.mapMarkers = message.friends.map(friend => {
      console.log(friend);
      const Latitude = friend.location_Long;
      const Longitude = friend.location_Lad;
      return {
        location: { Latitude, Longitude },
        title: friend.user_name,
        description: `Coords: ${Latitude}, ${Longitude}`,
        icon: 'utility:animal_and_nature'
      };
    });
  }
}