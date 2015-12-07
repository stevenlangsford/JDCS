var condition = shuffle([2,4,6,8,10,12])[0];

var canvasscale=.5;
var canvasheight = Math.round(500*canvasscale); //sizes are expressed in this way because 500x400 seems to get the proportions right, then .5 is a scaling factor, tinker at will.
var canvaswidth = Math.round(400*canvasscale);

function vidoneEnds(){
document.getElementById("uberdiv").innerHTML="Click to continue to video two <br/> <button onclick='vidtwo()'>Continue</button><br/>Please remember you're going to be asked questions about both videos!";
}
function vidtwoEnds(){
document.getElementById("uberdiv").innerHTML="The following questions will test your memory of the two videos you've just seen.<br/><button onclick='showLineup()'>Continue</button>";
//showLineup();
}

function vidone(){
  document.getElementById("uberdiv").innerHTML="</br></br><video width=500 id='myvid'> <source src='img/Burg02.webm' type='video/webm'></video>";
    document.getElementById("footerdiv").innerHTML="";
    var video = document.getElementById("myvid");
    video.addEventListener('ended',vidoneEnds,false);
    video.play();
}

function vidtwo(){
    document.getElementById("footerdiv").innerHTML="";
  document.getElementById("uberdiv").innerHTML="</br></br><video width=500 id='myvid'> <source src='img/carbear.webm' type='video/webm'></video>";
    var video = document.getElementById("myvid");
    video.addEventListener('ended',vidtwoEnds,false);
    video.play();
}

//populate lineup
var suspects = shuffle(["M.hs.yg.md.br.bn.ngl.sd.jpg","m.wt.yg.st.bk.bn.ngl.sh8.jpg","M.wt.yg.st.br.bn.ngl.sh8.jpg","M.hs.yg.st.bk.bn.ngl.sdCopy.jpg","M.wt.yg.st.br.bn.ngl.sh16.jpg","m.wt.yg.st.br.bu.ngl.sh16.jpg","M.wt.yg.st.br.bn.ngl.sh2.jpg","M.wt.yg.st.br.bu.ngl.sh7.jpg","m.wt.ma.st.br.bn.ngl.sh2.jpg", "M.wt.yg.st.br.bn.ngl.sh6.jpg","M.wt.yg.st.br.hz.ngl.sh3.jpg"]);
var suscounter = 0;

var lineup = ["burg_00.jpg"];

while(lineup.length<condition){
    lineup.push(suspects[suscounter]); 
    suscounter++;
//    console.log(lineup.length+":"+condition+":"+(lineup.length<condition));
}
shuffle(lineup);

var lineupimg = [];
for(var i=0;i<lineup.length;i++){
    lineupimg.push(new Image());
    lineupimg[i].onload = function(){startflag();}
    lineupimg[i].src="img/"+lineup[i];
}

var loadcounter = 0;
function startflag(){
    loadcounter++;
}//end startflag

//lineupimg is populated on page load

function lineupresponse(whichpos){
console.log(whichpos);//Save this data!
nextquiz();
}


function showLineup(){
    document.getElementById("footerdiv").innerHTML="";
var drawstring = "<h1>Which of these people entered the house in the first video?</h1><div id='faceholder' style='width:"+(canvaswidth*condition/2)+"px;margin:auto;border:4px solid white;overflow:hidden'>";
for(var i=0;i<condition;i++){
    drawstring+="<div class='canvasholder' style='float:left;width:"+(canvaswidth)+"px'><canvas id='canvas"+i+"' width='"+canvaswidth+"' height='"+canvasheight+"'></canvas><button class='lineupbutton' onclick='lineupresponse(\""+i+"\")'>&#8593;</button></div>"
}

drawstring+="</div>";
document.getElementById("uberdiv").innerHTML=drawstring;

    setTimeout(function(){ //imgs should load as you read the instructions in real life, but this little load-delay is handy for the dev version.
	for(var i=0;i<condition;i++){
	    var canvas = document.getElementById("canvas"+i);
	    var context = canvas.getContext('2d');
	    context.drawImage(lineupimg[i],0,0,canvaswidth,canvasheight);
	}
    },500);

}

function quizresponse(response){
console.log(response);
nextquiz();
}

var quizitems = [
	"<span style='text-align:left'><p>"+
	"<strong>Which of the following colours appear on the man's shirt in the first video?</strong></br>"+
	"<input type='radio' name='q1' id='q1a' value='a' onclick='quizresponse(\"black\")'>&nbsp Black <br/>"+
	"<input type='radio' name='q1' id='q1b' value='b' onclick='quizresponse(\"blue\")'>&nbsp Blue <br/>"+
	"<input type='radio' name='q1' id='q1c' value='c' onclick='quizresponse(\"green\")'>&nbsp Green <br/>"+
	"<input type='radio' name='q1' id='q1d' value='d' onclick='quizresponse(\"yellow\")'>&nbsp Yellow <br/>"+
	"</span>",
	"<span style='text-align:left'><p>"+
	"<strong>What type of animal is the main character in the second video?</strong></br>"+
	"<input type='radio' name='q1' id='q1a' value='a' onclick='quizresponse(\"anteater\")'>&nbsp Anteater <br/>"+
	"<input type='radio' name='q1' id='q1b' value='b' onclick='quizresponse(\"bear\")'>&nbsp Bear <br/>"+
	"<input type='radio' name='q1' id='q1c' value='c' onclick='quizresponse(\"cat\")'>&nbsp Cat <br/>"+
	"<input type='radio' name='q1' id='q1d' value='d' onclick='quizresponse(\"Dog\")'>&nbsp Dog <br/>"+
	"</span>"
];
var quizindex = 0;

function nextquiz(){
if(quizindex>=quizitems.length)finish()
else{
    document.getElementById("uberdiv").innerHTML=quizitems[quizindex];
    quizindex++;
}
}
