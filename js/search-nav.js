//搜索导航
var oSearch = document.querySelector('#search');
oSearch.onkeyup = function(event) {
  if(event.keyCode === 13) {
    location.href = 'search.html?search_text=' + this.value;
  }
  localStorage.searchTxt = this.value;
}
/*var oSearchText = document.querySelector(".search-text-img");
oSearchText.onclick = function(event) {
location.href = 'search.html?search_text=' + localStorage.searchTxt;
}*/
$(function(){
	document.addEventListener("touchstart", _touch, false);
})
function _touch(event){
	var oSearchText = document.querySelector(".search-text-img");
  oSearchText.href = 'search.html?search_text=' + localStorage.searchTxt;
}