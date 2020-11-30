import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, wire, track, api } from 'lwc';
import jurassic_world_icon from '@salesforce/resourceUrl/jurassic_world_icon';
import my_image from '@salesforce/resourceUrl/poster';
import chartjs from '@salesforce/resourceUrl/chartJS';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BearList extends NavigationMixin(LightningElement) {
	@api predictResponse;
	jurassicWorldIcon = jurassic_world_icon;
	@track myImageUrl = my_image;
	@track sampleUrl;
	// chartJS
	@track isChartJsInitialized;
	chart;
	config;
	responseJson;
	friends;
	mapMarkers = [];

	handleDisplay() {
		this.responseJson = JSON.parse(this.predictResponse);
		this.myImageUrl = this.responseJson.dinosaurs_info.uploadPhotoURL;
		this.sampleUrl = this.responseJson.dinosaurs_info.samplePhotoURL;
		this.friends=this.responseJson.friend_list;

		this.config = {
			type: 'radar',
			data: { 
				labels: ["Power", "Speed", "aggressivity", "defence", "Intelligence"],
				datasets: [{
					label: this.responseJson.user_info.user_name,
					data: [this.responseJson.dinosaurs_info.power, this.responseJson.dinosaurs_info.speed
							, this.responseJson.dinosaurs_info.attack, this.responseJson.dinosaurs_info.defence
							, this.responseJson.dinosaurs_info.Intelligence],
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
					borderColor: 'rgba(255, 99, 132, 1)',
					borderWidth: 2,
					pointBackgroundColor: 'rgba(255, 99, 132, 0.2)',
					pointBorderColor: 'rgba(255, 99, 132, 1)'
					// ,fill: false
					,lineTension: 0.3
					
				}, {
					label:"Test",
					data:[22,22,22,22,22],
					label: this.responseJson.dinosaurs_info.dinosaurName,
					data: [this.responseJson.dinosaurs_info.sampleDinosaurInfo.power, this.responseJson.dinosaurs_info.sampleDinosaurInfo.speed
						, this.responseJson.dinosaurs_info.sampleDinosaurInfo.attack, this.responseJson.dinosaurs_info.sampleDinosaurInfo.defence
						, this.responseJson.dinosaurs_info.sampleDinosaurInfo.Intelligence],
					backgroundColor: 'rgb(54, 162, 235, 0.2)',
					borderColor: 'rgb(54, 162, 235)',
					borderWidth: 2,
					pointBackgroundColor: 'rgb(54, 162, 235, 0.2)',
					pointBorderColor: 'rgb(54, 162, 235)'
					,lineTension: 0.3
				}]
			},
			options: {
				title: {
					display: true,
					text: 'Ability Contrast',
					fontSize: 22,
					fontStyle: 'bold'
				},
				scale:{
					ticks:{
						suggestedMin: 0,
						suggestedMax: 100,
						stepSize: 20,
						callback: function(value, index, values){
							return  value
						}
					}
				},
				legend: {
					labels: {
						// This more specific font property overrides the global property
						fontSize: 16
					}
				}
				// ,pointLabels: {
				// 	fontSize: 20
				// },
			}
		};
	}

	handleLocation() {
		this.mapMarkers = this.friends.map(friend => {
		  const Latitude = friend.location_Lad;
		  const Longitude = friend.location_Long;
		  return {
			location: { Latitude, Longitude },
			title: friend.user_name,
			description: ``,
			icon: 'utility:animal_and_nature'
		  };
		});
	  }
	
	get hasResults() {
		return (this.responseJson.friend_list.length > 0);
	}

	connectedCallback() {
		this.handleDisplay();
		this.handleLocation();
	}
	
	renderedCallback() {
        if (this.isChartJsInitialized) {
            return;
        }
        this.isChartJsInitialized = true;

        Promise.all([
            loadScript(this, chartjs)
        ]).then(() => {
            const ctx = this.template.querySelector('canvas.linechart').getContext('2d');
            this.chart = new window.Chart(ctx, this.config);
            this.chart.canvas.parentNode.style.height = '100%';
			this.chart.canvas.parentNode.style.width = '100%';
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading ChartJS',
                    message: error.message,
                    variant: 'error',
                }),
            );
        });
    }
}