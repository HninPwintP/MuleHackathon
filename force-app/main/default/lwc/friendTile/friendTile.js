import { LightningElement, api } from 'lwc';
import friend_image from '@salesforce/resourceUrl/poster';

export default class friendTile extends LightningElement {
	@api friend;

	friendImageUrl = friend_image;

	handleOpenRecordClick() {
		const selectEvent = new CustomEvent('bearview', {
			detail: this.bear.Id
		});
		this.dispatchEvent(selectEvent);
	}
}