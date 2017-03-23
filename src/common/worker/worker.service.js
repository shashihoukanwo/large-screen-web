(function(){
	
	onmessage=function(event){

		postMessage({
			msg:event.data+' from worker !!!'
		})
	}
})();