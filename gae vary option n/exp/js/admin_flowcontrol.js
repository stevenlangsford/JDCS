//exp data
var dataObj = {};
dataObj.startTime = new Date().getTime();
dataObj.stage = "init";

//session data
var IDnumber = Math.round(Math.random()*1000000);
dataObj.IDnumber = IDnumber;

var instructionchapters = ["Please read these instructions carefully, there will be a quiz at the end.","This is part of a study being run by the University of Adelaide. By clicking 'Next', you are agreeing to take part in it. You should know that you're free to withdraw at any time (although you'll only be paid on completion), and that although data gained from this study may be published, you will not be identified and your personal details will not be divulged, nor will anything be linked to your Amazon ID.</p><p style=\"font-size:.8em\">Please direct any questions about this study to the principle investigator, John Dunn (john.dunn@adelaide.edu.au). For any questions regarding the ethics of the study, please contact the convener of the Subcommittee for Human Research in the School of Psychology at the University of Adelaide, Dr. Paul Delfabbro (+61)08 8313 4936.","This study will show you two videos and ask you some questions about them.","Please pay careful attention to the contents of both videos, both are important.","The whole study, including the questions, will take about fifteen minutes."];
var instruction_index = 0;

function instructions(){
    if(instruction_index<instructionchapters.length){
	document.getElementById("uberdiv").innerHTML="<p>"+instructionchapters[instruction_index]+"</p><p><button onclick='instructions()'>Next</button>";
	instruction_index++;
    }
    else quiz();
}

function quiz(){
    dataObj.stage="quiz";
    scroll(0,0);
    document.getElementById("uberdiv").innerHTML="<h3>Are you ready?</h3></br>"+
	"<span style='text-align:left'><p>"+
	"<strong>How many videos will you watch in the first part of the study?</strong></br>"+
	"<input type='radio' name='q1' id='q1a' value='a'>&nbsp One <br/>"+
	"<input type='radio' name='q1' id='q1b' value='b'>&nbsp Two <br/>"+
	"<input type='radio' name='q1' id='q1c' value='c'>&nbsp Three <br/>"+
	"<input type='radio' name='q1' id='q1d' value='d'>&nbsp Four <br/>"+
	"</span>"+
	"<span style='text-align:left'><p>"+
	"<strong>How long is this study expected to take?</strong></br>"+
	"<input type='radio' name='q2' id='q2a' value='a'>&nbsp About five minutes <br/>"+
	"<input type='radio' name='q2' id='q2b' value='b'>&nbsp About ten minutes<br/>"+
	"<input type='radio' name='q2' id='q2c' value='c'>&nbsp About fifteen minutes<br/>"+
	"<input type='radio' name='q2' id='q2d' value='d'>&nbsp About twenty minutes<br/>"+
	"</span>"+
	"<span style='text-align:left'><p>"+
	"<strong>How do we check if you paid attention to the videos?</strong></br>"+
	"<input type='radio' name='q3' id='q3a' value='a'>&nbsp By watching you do the task via the camera on your computer<br/>"+
	"<input type='radio' name='q3' id='q3b' value='b'>&nbsp By asking questions about the videos in the second half of the study<br/>"+
	"<input type='radio' name='q3' id='q3c' value='c'>&nbsp It's a trick question: there's actually no way to check if you paid attention or not.<br/>"+
	"</span></br><button onclick='quizvalidate()'>Continue</button>";
}

function quizvalidate(){
    var valid = document.getElementById("q1b").checked && document.getElementById("q2c").checked && document.getElementById("q3b").checked;
    if(valid){demographics();}
    else{
	alert("You didn't answer all the questions correctly. Please read through the instructions and take the quiz again to continue.");
	instruction_index=0;
	scroll(0,0);
	instructions();
    }
}

function decomma(astring){
    var ret = "";
    for(var i=0;i<astring.length;i++){
	if(astring.charAt(i)!=',')ret+=astring.charAt(i);
    }
    return ret.toLowerCase();
}

function demographics(){
    dataObj.stage="demographics";

    document.getElementById("uberdiv").innerHTML= "<table class='center' style='text-align:left'><tr><td>Please fill out these demographic details. This is just for our records, and it is all kept separate from the study data. As long as you finish the experiment you will get paid no matter what you put here, so please be honest.<br/></td></tr>"+
	"<tr><td>&nbsp</td></tr>"+
	"<tr><td>"+
	"Gender: <input type=\"radio\" name=\"gender\" id=\"male\" value=\"male\">&nbsp Male&nbsp&nbsp"+
	"<input type=\"radio\" name=\"gender\" id=\"fem\" value=\"female\">&nbsp Female&nbsp&nbsp"+
	"<input type=\"radio\" name=\"gender\" id=\"other\" value=\"other\">&nbsp Other"+
	"</td></tr>"+
	"<tr><td>"+
	"Age:<input type=\"text\" id=\"age\">"+
	"</td></tr>"+
	"<tr><td>"+
	"Native Language(s):<input type=\"text\" id=\"language\">"+
	"</td></tr>"+
	"<tr><td>"+
	"Country you currently live in:"+countrypicker()+
	"</td></tr>"+
	"<tr><td>"+
	"<button onclick=demographicsvalidate()>Continue</button>"+
	"</td></tr>"+
	"</table>";
}

function countrypicker(){
    return "<select data-placeholder=\"Choose a Country...\" id=\"countrypicker\">"+
	"  <option value=\"\"></option> "+
	"  <option value=\"United States\">United States</option> "+
	"  <option value=\"United Kingdom\">United Kingdom</option> "+
	"  <option value=\"Afghanistan\">Afghanistan</option> "+
	"  <option value=\"Albania\">Albania</option> "+
	"  <option value=\"Algeria\">Algeria</option> "+
	"  <option value=\"American Samoa\">American Samoa</option> "+
	"  <option value=\"Andorra\">Andorra</option> "+
	"  <option value=\"Angola\">Angola</option> "+
	"  <option value=\"Anguilla\">Anguilla</option> "+
	"  <option value=\"Antarctica\">Antarctica</option> "+
	"  <option value=\"Antigua and Barbuda\">Antigua and Barbuda</option> "+
	"  <option value=\"Argentina\">Argentina</option> "+
	"  <option value=\"Armenia\">Armenia</option> "+
	"  <option value=\"Aruba\">Aruba</option> "+
	"  <option value=\"Australia\">Australia</option> "+
	"  <option value=\"Austria\">Austria</option> "+
	"  <option value=\"Azerbaijan\">Azerbaijan</option> "+
	"  <option value=\"Bahamas\">Bahamas</option> "+
	"  <option value=\"Bahrain\">Bahrain</option> "+
	"  <option value=\"Bangladesh\">Bangladesh</option> "+
	"  <option value=\"Barbados\">Barbados</option> "+
	"  <option value=\"Belarus\">Belarus</option> "+
	"  <option value=\"Belgium\">Belgium</option> "+
	"  <option value=\"Belize\">Belize</option> "+
	"  <option value=\"Benin\">Benin</option> "+
	"  <option value=\"Bermuda\">Bermuda</option> "+
	"  <option value=\"Bhutan\">Bhutan</option> "+
	"  <option value=\"Bolivia\">Bolivia</option> "+
	"  <option value=\"Bosnia and Herzegovina\">Bosnia and Herzegovina</option> "+
	"  <option value=\"Botswana\">Botswana</option> "+
	"  <option value=\"Bouvet Island\">Bouvet Island</option> "+
	"  <option value=\"Brazil\">Brazil</option> "+
	"  <option value=\"British Indian Ocean Territory\">British Indian Ocean Territory</option> "+
	"  <option value=\"Brunei Darussalam\">Brunei Darussalam</option> "+
	"  <option value=\"Bulgaria\">Bulgaria</option> "+
	"  <option value=\"Burkina Faso\">Burkina Faso</option> "+
	"  <option value=\"Burundi\">Burundi</option> "+
	"  <option value=\"Cambodia\">Cambodia</option> "+
	"  <option value=\"Cameroon\">Cameroon</option> "+
	"  <option value=\"Canada\">Canada</option> "+
	"  <option value=\"Cape Verde\">Cape Verde</option> "+
	"  <option value=\"Cayman Islands\">Cayman Islands</option> "+
	"  <option value=\"Central African Republic\">Central African Republic</option> "+
	"  <option value=\"Chad\">Chad</option> "+
	"  <option value=\"Chile\">Chile</option> "+
	"  <option value=\"China\">China</option> "+
	"  <option value=\"Christmas Island\">Christmas Island</option> "+
	"  <option value=\"Cocos (Keeling) Islands\">Cocos (Keeling) Islands</option> "+
	"  <option value=\"Colombia\">Colombia</option> "+
	"  <option value=\"Comoros\">Comoros</option> "+
	"  <option value=\"Congo\">Congo</option> "+
	"  <option value=\"Congo The Democratic Republic of The\">Congo, The Democratic Republic of The</option> "+
	"  <option value=\"Cook Islands\">Cook Islands</option> "+
	"  <option value=\"Costa Rica\">Costa Rica</option> "+
	"  <option value=\"Cote D'ivoire\">Cote D'ivoire</option> "+
	"  <option value=\"Croatia\">Croatia</option> "+
	"  <option value=\"Cuba\">Cuba</option> "+
	"  <option value=\"Cyprus\">Cyprus</option> "+
	"  <option value=\"Czech Republic\">Czech Republic</option> "+
	"  <option value=\"Denmark\">Denmark</option> "+
	"  <option value=\"Djibouti\">Djibouti</option> "+
	"  <option value=\"Dominica\">Dominica</option> "+
	"  <option value=\"Dominican Republic\">Dominican Republic</option> "+
	"  <option value=\"Ecuador\">Ecuador</option> "+
	"  <option value=\"Egypt\">Egypt</option> "+
	"  <option value=\"El Salvador\">El Salvador</option> "+
	"  <option value=\"Equatorial Guinea\">Equatorial Guinea</option> "+
	"  <option value=\"Eritrea\">Eritrea</option> "+
	"  <option value=\"Estonia\">Estonia</option> "+
	"  <option value=\"Ethiopia\">Ethiopia</option> "+
	"  <option value=\"Falkland Islands (Malvinas)\">Falkland Islands (Malvinas)</option> "+
	"  <option value=\"Faroe Islands\">Faroe Islands</option> "+
	"  <option value=\"Fiji\">Fiji</option> "+
	"  <option value=\"Finland\">Finland</option> "+
	"  <option value=\"France\">France</option> "+
	"  <option value=\"French Guiana\">French Guiana</option> "+
	"  <option value=\"French Polynesia\">French Polynesia</option> "+
	"  <option value=\"French Southern Territories\">French Southern Territories</option> "+
	"  <option value=\"Gabon\">Gabon</option> "+
	"  <option value=\"Gambia\">Gambia</option> "+
	"  <option value=\"Georgia\">Georgia</option> "+
	"  <option value=\"Germany\">Germany</option> "+
	"  <option value=\"Ghana\">Ghana</option> "+
	"  <option value=\"Gibraltar\">Gibraltar</option> "+
	"  <option value=\"Greece\">Greece</option> "+
	"  <option value=\"Greenland\">Greenland</option> "+
	"  <option value=\"Grenada\">Grenada</option> "+
	"  <option value=\"Guadeloupe\">Guadeloupe</option> "+
	"  <option value=\"Guam\">Guam</option> "+
	"  <option value=\"Guatemala\">Guatemala</option> "+
	"  <option value=\"Guinea\">Guinea</option> "+
	"  <option value=\"Guinea-bissau\">Guinea-bissau</option> "+
	"  <option value=\"Guyana\">Guyana</option> "+
	"  <option value=\"Haiti\">Haiti</option> "+
	"  <option value=\"Heard Island and Mcdonald Islands\">Heard Island and Mcdonald Islands</option> "+
	"  <option value=\"Holy See (Vatican City State)\">Holy See (Vatican City State)</option> "+
	"  <option value=\"Honduras\">Honduras</option> "+
	"  <option value=\"Hong Kong\">Hong Kong</option> "+
	"  <option value=\"Hungary\">Hungary</option> "+
	"  <option value=\"Iceland\">Iceland</option> "+
	"  <option value=\"India\">India</option> "+
	"  <option value=\"Indonesia\">Indonesia</option> "+
	"  <option value=\"Iran Islamic Republic of\">Iran, Islamic Republic of</option> "+
	"  <option value=\"Iraq\">Iraq</option> "+
	"  <option value=\"Ireland\">Ireland</option> "+
	"  <option value=\"Israel\">Israel</option> "+
	"  <option value=\"Italy\">Italy</option> "+
	"  <option value=\"Jamaica\">Jamaica</option> "+
	"  <option value=\"Japan\">Japan</option> "+
	"  <option value=\"Jordan\">Jordan</option> "+
	"  <option value=\"Kazakhstan\">Kazakhstan</option> "+
	"  <option value=\"Kenya\">Kenya</option> "+
	"  <option value=\"Kiribati\">Kiribati</option> "+
	"  <option value=\"Korea Democratic People's Republic of\">Korea, Democratic People's Republic of</option> "+
	"  <option value=\"Korea Republic of\">Korea, Republic of</option> "+
	"  <option value=\"Kuwait\">Kuwait</option> "+
	"  <option value=\"Kyrgyzstan\">Kyrgyzstan</option> "+
	"  <option value=\"Lao People's Democratic Republic\">Lao People's Democratic Republic</option> "+
	"  <option value=\"Latvia\">Latvia</option> "+
	"  <option value=\"Lebanon\">Lebanon</option> "+
	"  <option value=\"Lesotho\">Lesotho</option> "+
	"  <option value=\"Liberia\">Liberia</option> "+
	"  <option value=\"Libyan Arab Jamahiriya\">Libyan Arab Jamahiriya</option> "+
	"  <option value=\"Liechtenstein\">Liechtenstein</option> "+
	"  <option value=\"Lithuania\">Lithuania</option> "+
	"  <option value=\"Luxembourg\">Luxembourg</option> "+
	"  <option value=\"Macao\">Macao</option> "+
	"  <option value=\"Macedonia The Former Yugoslav Republic of\">Macedonia, The Former Yugoslav Republic of</option> "+
	"  <option value=\"Madagascar\">Madagascar</option> "+
	"  <option value=\"Malawi\">Malawi</option> "+
	"  <option value=\"Malaysia\">Malaysia</option> "+
	"  <option value=\"Maldives\">Maldives</option> "+
	"  <option value=\"Mali\">Mali</option> "+
	"  <option value=\"Malta\">Malta</option> "+
	"  <option value=\"Marshall Islands\">Marshall Islands</option> "+
	"  <option value=\"Martinique\">Martinique</option> "+
	"  <option value=\"Mauritania\">Mauritania</option> "+
	"  <option value=\"Mauritius\">Mauritius</option> "+
	"  <option value=\"Mayotte\">Mayotte</option> "+
	"  <option value=\"Mexico\">Mexico</option> "+
	"  <option value=\"Micronesia Federated States of\">Micronesia, Federated States of</option> "+
	"  <option value=\"Moldova Republic of\">Moldova, Republic of</option> "+
	"  <option value=\"Monaco\">Monaco</option> "+
	"  <option value=\"Mongolia\">Mongolia</option> "+
	"  <option value=\"Montenegro\">Montenegro</option>"+
	"  <option value=\"Montserrat\">Montserrat</option> "+
	"  <option value=\"Morocco\">Morocco</option> "+
	"  <option value=\"Mozambique\">Mozambique</option> "+
	"  <option value=\"Myanmar\">Myanmar</option> "+
	"  <option value=\"Namibia\">Namibia</option> "+
	"  <option value=\"Nauru\">Nauru</option> "+
	"  <option value=\"Nepal\">Nepal</option> "+
	"  <option value=\"Netherlands\">Netherlands</option> "+
	"  <option value=\"Netherlands Antilles\">Netherlands Antilles</option> "+
	"  <option value=\"New Caledonia\">New Caledonia</option> "+
	"  <option value=\"New Zealand\">New Zealand</option> "+
	"  <option value=\"Nicaragua\">Nicaragua</option> "+
	"  <option value=\"Niger\">Niger</option> "+
	"  <option value=\"Nigeria\">Nigeria</option> "+
	"  <option value=\"Niue\">Niue</option> "+
	"  <option value=\"Norfolk Island\">Norfolk Island</option> "+
	"  <option value=\"Northern Mariana Islands\">Northern Mariana Islands</option> "+
	"  <option value=\"Norway\">Norway</option> "+
	"  <option value=\"Oman\">Oman</option> "+
	"  <option value=\"Pakistan\">Pakistan</option> "+
	"  <option value=\"Palau\">Palau</option> "+
	"  <option value=\"Palestinian Territory Occupied\">Palestinian Territory, Occupied</option> "+
	"  <option value=\"Panama\">Panama</option> "+
	"  <option value=\"Papua New Guinea\">Papua New Guinea</option> "+
	"  <option value=\"Paraguay\">Paraguay</option> "+
	"  <option value=\"Peru\">Peru</option> "+
	"  <option value=\"Philippines\">Philippines</option> "+
	"  <option value=\"Pitcairn\">Pitcairn</option> "+
	"  <option value=\"Poland\">Poland</option> "+
	"  <option value=\"Portugal\">Portugal</option> "+
	"  <option value=\"Puerto Rico\">Puerto Rico</option> "+
	"  <option value=\"Qatar\">Qatar</option> "+
	"  <option value=\"Reunion\">Reunion</option> "+
	"  <option value=\"Romania\">Romania</option> "+
	"  <option value=\"Russian Federation\">Russian Federation</option> "+
	"  <option value=\"Rwanda\">Rwanda</option> "+
	"  <option value=\"Saint Helena\">Saint Helena</option> "+
	"  <option value=\"Saint Kitts and Nevis\">Saint Kitts and Nevis</option> "+
	"  <option value=\"Saint Lucia\">Saint Lucia</option> "+
	"  <option value=\"Saint Pierre and Miquelon\">Saint Pierre and Miquelon</option> "+
	"  <option value=\"Saint Vincent and The Grenadines\">Saint Vincent and The Grenadines</option> "+
	"  <option value=\"Samoa\">Samoa</option> "+
	"  <option value=\"San Marino\">San Marino</option> "+
	"  <option value=\"Sao Tome and Principe\">Sao Tome and Principe</option> "+
	"  <option value=\"Saudi Arabia\">Saudi Arabia</option> "+
	"  <option value=\"Senegal\">Senegal</option> "+
	"  <option value=\"Serbia\">Serbia</option> "+
	"  <option value=\"Seychelles\">Seychelles</option> "+
	"  <option value=\"Sierra Leone\">Sierra Leone</option> "+
	"  <option value=\"Singapore\">Singapore</option> "+
	"  <option value=\"Slovakia\">Slovakia</option> "+
	"  <option value=\"Slovenia\">Slovenia</option> "+
	"  <option value=\"Solomon Islands\">Solomon Islands</option> "+
	"  <option value=\"Somalia\">Somalia</option> "+
	"  <option value=\"South Africa\">South Africa</option> "+
	"  <option value=\"South Georgia and The South Sandwich Islands\">South Georgia and The South Sandwich Islands</option> "+
	"  <option value=\"South Sudan\">South Sudan</option> "+
	"  <option value=\"Spain\">Spain</option> "+
	"  <option value=\"Sri Lanka\">Sri Lanka</option> "+
	"  <option value=\"Sudan\">Sudan</option> "+
	"  <option value=\"Suriname\">Suriname</option> "+
	"  <option value=\"Svalbard and Jan Mayen\">Svalbard and Jan Mayen</option> "+
	"  <option value=\"Swaziland\">Swaziland</option> "+
	"  <option value=\"Sweden\">Sweden</option> "+
	"  <option value=\"Switzerland\">Switzerland</option> "+
	"  <option value=\"Syrian Arab Republic\">Syrian Arab Republic</option> "+
	"  <option value=\"Taiwan Republic of China\">Taiwan, Republic of China</option> "+
	"  <option value=\"Tajikistan\">Tajikistan</option> "+
	"  <option value=\"Tanzania United Republic of\">Tanzania, United Republic of</option> "+
	"  <option value=\"Thailand\">Thailand</option> "+
	"  <option value=\"Timorleste\">Timor-leste</option> "+
	"  <option value=\"Togo\">Togo</option> "+
	"  <option value=\"Tokelau\">Tokelau</option> "+
	"  <option value=\"Tonga\">Tonga</option> "+
	"  <option value=\"Trinidad and Tobago\">Trinidad and Tobago</option> "+
	"  <option value=\"Tunisia\">Tunisia</option> "+
	"  <option value=\"Turkey\">Turkey</option> "+
	"  <option value=\"Turkmenistan\">Turkmenistan</option> "+
	"  <option value=\"Turks and Caicos Islands\">Turks and Caicos Islands</option> "+
	"  <option value=\"Tuvalu\">Tuvalu</option> "+
	"  <option value=\"Uganda\">Uganda</option> "+
	"  <option value=\"Ukraine\">Ukraine</option> "+
	"  <option value=\"United Arab Emirates\">United Arab Emirates</option> "+
	"  <option value=\"United Kingdom\">United Kingdom</option> "+
	"  <option value=\"United States\">United States</option> "+
	"  <option value=\"Uruguay\">Uruguay</option> "+
	"  <option value=\"Uzbekistan\">Uzbekistan</option> "+
	"  <option value=\"Vanuatu\">Vanuatu</option> "+
	"  <option value=\"Venezuela\">Venezuela</option> "+
	"  <option value=\"Viet Nam\">Viet Nam</option> "+
	"  <option value=\"Virgin Islands British\">Virgin Islands, British</option> "+
	"  <option value=\"Virgin Islands U.S.\">Virgin Islands, U.S.</option> "+
	"  <option value=\"Wallis and Futuna\">Wallis and Futuna</option> "+
	"  <option value=\"Western Sahara\">Western Sahara</option> "+
	"  <option value=\"Yemen\">Yemen</option> "+
	"  <option value=\"Zambia\">Zambia</option> "+
	"  <option value=\"Zimbabwe\">Zimbabwe</option>"+
	"</select>";
}

function demographicsvalidate(){
    var genderchoice=document.getElementsByName("gender");
    var genderflag = false;
    var demostring = "";
    for(var i=0;i<genderchoice.length;i++){
	if(genderchoice[i].checked){
	    demostring+=genderchoice[i].value+",";
	    dataObj.gender = genderchoice[i].value;
	    genderflag=true;
	}
    }
    var age = document.getElementById("age").value;
    var ageflag=age.length>0;
    demostring+=age+",";
    dataObj.age = age;
    var languagechoice = document.getElementById("language").value;
    var langflag = languagechoice.length>0;
    demostring+=decomma(languagechoice)+",";
    dataObj.language = decomma(languagechoice);
    var country = document.getElementById("countrypicker").value;
    var countryflag = country.length>0;
    demostring+=country;
    dataObj.country = country;
    if(genderflag&&langflag&&ageflag&&countryflag){

	dataObj.screenheight = screen.height;
	dataObj.screenwidth = screen.width;
	//var ppntstring = IDnumber+","+demostring+","+new Date().getTime()+","+screen.height+","+screen.width;
	
	//dataObj.demographics = ppntstring;

	//console.log(ppntstring);
	
	preStudy();
	
    }    
    else alert("Please fill out all the fields.");
}

function preStudy(){
    dataObj.stage="vid1";
    document.getElementById("footerdiv").innerHTML="";
    document.getElementById("uberdiv").innerHTML = "<p>Are you ready? Here's the first video:</p><button onclick='vidone()'>Continue</button>";
}

function finish(){
    dataObj.stage="complete";
    dataObj.finishTime = new Date().getTime();

    saveData(dataObj); console.log(dataObj);

    document.getElementById("footerdiv").innerHTML="";
    document.getElementById("uberdiv").innerHTML="You're done! Thank you so much!";
}

window.onbeforeunload = function(){
//fallible but ernest attempt to catch incomplete sessions:
if(dataObj.stage!="complete"){ //'finish' should save the data, if it has, don't save it twice.
dataObj.finishTime= new Date().getTime();
saveData(dataObj); //stage will have something other than 'complete' indicating where the user quit.
}

}

function saveData(data) {
    (function (d) {
	$.post('submit',  {"content": JSON.stringify(d)});
    })(data);
}

//RUN ME



instructions(); //actual start point.

document.getElementById("footerdiv").innerHTML="Jump to:"+
"<button onclick='vidone()'>First video</button><button onclick='vidtwo()'>Second video</button><button onclick='showLineup()'>Questions</button>";

//vidone();
//vidtwo();
//nextquiz();
//showLineup();
