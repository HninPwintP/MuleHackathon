import { LightningElement,track } from 'lwc';
import callDinosaurApi from '@salesforce/apex/fileUpload.callDinosaurApi';
 
export default class FileUpload extends LightningElement {

    @track name;
    @track age;
    @track gender;
    @track fileType;
    @track fileName;
    @track showSpinner = false;
    @track detail = false;
    @track init=true;
    selectedFilesToUpload=[];
    latitude;longitude;
    responseData;
    endpoint;
    fileReader;
    fileContents;
 
    handleClick(){
        this.boolShowSpinner = true;
        this.boolShowImage = false;
    }

    handleSelectedFiles(event) {

        if (event.target.files.length > 0) {
          this.selectedFilesToUpload = event.target.files;
          this.fileType = this.selectedFilesToUpload[0].type;
          this.fileName = this.selectedFilesToUpload[0].name;
          this.fileReader= new FileReader(); 
          this.fileReader.onloadend = (() => {
            this.fileContents = this.fileReader.result;
            let base64 = 'base64,';
            this.content = this.fileContents.indexOf(base64) + base64.length;
            this.fileContents = this.fileContents.substring(this.content); 
            });
            this.fileReader.readAsDataURL(this.selectedFilesToUpload[0]);
          }
        
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
            });
        }
    }

    handleFileUpload() {
        if(this.selectedFilesToUpload.length > 0) {
            this.showSpinner = true;
            this.endpoint = "http://dinosaur-api.us-e2.cloudhub.io/api/fileUpload?name=" + (this.name ?? "") + '&age=' + (this.age ?? "") +'&gender=' + (this.gender ?? "");      
            this.endpoint += '&Long=' + this.longitude + '&Lad=' + this.latitude;
            console.log(this.endpoint);

            callDinosaurApi({endpoint : this.endpoint, fileType: this.fileType, fileName : this.fileName, fileBody: this.fileContents})
            .then(result => {
                console.log('Upload result = ' +result);
                this.responseData = result;
                this.showSpinner = false;
                this.init=false;
                this.detail=true;
            })
            .catch(error => {
                // transit to error page
                this.showSpinner = false;
            });  
                
        }
        else {
            this.fileName = 'Please select a file to upload!';
        }
    }

    // addition by fan 
    gender = 'boy';

    genderList = [
        { label: 'boy', value: 'boy' },
        { label: 'girl', value: 'girl' },
    ];

    get genderOptions() {
        return this.genderList;
    }

    handleAgeChange(event) {
        this.age=event.target.value;
    }

    handleGenderChange(event) {
        this.gender=event.target.value;
    }

    handleNameChange(event) {
        this.name=event.target.value;
    }
}