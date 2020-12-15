import { LightningElement, api } from 'lwc';
import friend_image from '@salesforce/resourceUrl/poster';

export default class friendTile extends LightningElement {
	@api friend;

	friendImageUrl = friend_image;
}