# This is SFDC code for My Mulesoft Hackathon 2020 commit

There is 3 main component of LWC which are attachmentFileUploader, resultDetail and FriendTile.
There is only one apex class called fileUpload for HTTP callout(May be we can also use Fetch method to do this on the client side).

"attachmentFileUploader" is maily for upload picture draw by child and have a child component "resultDetail" to show the result.
![](images/fileUpload.jpeg)

"resultDetail" component is also with a component "FriendTile" to display friendList.
For radar chart in the middle of the page, we use ChartJs.
![](/images/9D0C5007-1264-4CDF-A7D9-54D5BD4F4469.png)

The data of the resultDetail is from [our Mulesoft API](https://github.com/HninPwintP/mulesoftHackathon2020/tree/master/dinosaur-api2)
For More Detail of this project, Please reference [here](https://dev.to/cutiejbiu/share-your-dinosaurs-4kk9)

