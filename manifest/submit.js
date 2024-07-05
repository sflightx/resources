function writeNewPost() {
    var missionName = document.getElementById('mission-name').value;
    var missionKey = missionName.toLowerCase().replace(/-/g, '_').replace(/ /g, '-');
    var thumbnailUrl = document.getElementById('img-url').value;
    var companyId = document.getElementById("company-id").value;
    // Create a new post key
    var postKey = firebase.database().ref().push().key;
      
    // Write the new post's data
    var postData = {
      name: missionName,
      key: missionKey,
      thumbnail: thumbnailUrl,
      postKey: postKey,
      companyId: companyId
    };
  
    // Update the database
    var updates = {};
    updates['/launch_manifest/launches/' + postKey] = postData;
    missionName.text = '';
    missionKey.text = '';
    thumbnailUrl.text = '';
    
    return firebase.database().ref().update(updates);
}
  
// Add event listener to your submit button
document.getElementById("submit-post").addEventListener("click", writeNewPost);