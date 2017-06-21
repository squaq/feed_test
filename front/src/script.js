/**
*Trigger the XML load
*@animal: kind of an animal that the function will call
*/

function loadAnimal(animal){
    var rec = new XMLHttpRequest();
    var method = "GET";
    var url = 'https://api.flickr.com/services/feeds/photos_public.gne?per_page=5&tags='+animal
    
    //ajax events
    rec.addEventListener("load", success);
    rec.addEventListener("error", error);
    rec.addEventListener("abort", aborted);        

    rec.open(method, url, true);
    rec.send();
    //removing preloaders
    addOrRemoveAllLoaders('remove');
    //removing error texts  
    document.getElementsByClassName('error-box')[0].innerHTML = '';

}

/**
*Remove or add all preloaders into the frames
*@act:String: Default value is 'add' if want remove only set 'remove' 
*/
function addOrRemoveAllLoaders(act='add'){
    let obs = document.getElementsByTagName('span')
    for(let i = 0; i < obs.length; i++){
        (act == 'remove') ? obs[i].classList.remove('hide') : obs[i].classList.add('hide');
    }
}
/**
*Error callback
*/
function error(e) {
    addOrRemoveAllLoaders();
    document.getElementsByClassName('error-box')[0].innerHTML = "<p>An error occurred while downloading the file.</p>";
}

/**
*Abort callback
*/
function aborted(e) {
    addOrRemoveAllLoaders();
    document.getElementsByClassName('error-box')[0].innerHTML = "<p>The transfer has been canceled.</p>";
}

/**
*Success callback
*/
function success(){
    //getting xml data
    let xml = this.responseXML;
    let arr = xml.getElementsByTagName('entry');
    
    //getting all frames and setting their images and hiding  preloader
    for(let i in arr){
        let im = document.getElementById('im'+i);
        let ld = im.getElementsByTagName('span')[0].classList;
        
        let img = new Image();
        let url = arr[i].querySelector('link[rel="enclosure"]').attributes.href.textContent;
        
        img.onload = function(){
            ld.add('hide');
            im.style.backgroundImage = "url('"+url+"')"; 
        }
        img.src = im.style.backgroundImage = url;
        if(i >=4  ) return;

    }
    //cleaning error box
    document.getElementsByClassName('error-box').html('');
}