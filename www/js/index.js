/*EXPERIENCESAMPLER LICENSE

The MIT License (MIT)

Copyright (c) 2014-2020 Sabrina Thai & Elizabeth Page-Gould
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/* activate localStorage */
var localStore = window.localStorage;

/* surveyQuestion Model (This time, written in "JSON" format to interface more cleanly with Mustache) */
/* This is used to input the questions you would like to ask in your experience sampling questionnaire*/
var surveyQuestions = [
/*number each question in this variable starting from 0, so it is easy to reference question items when setting up question logic*/
                       /*0*/
					   /*survey initializer, to welcome participants back to the survey*/
					   {
						"type":"instructions",
						"variableName": "welcomeback",
						"questionPrompt": "Welcome back to the study! <br/><br/> You have completed<b> SURVEYCOUNT </b>out of 42 surveys so far during this phase of the study. <br/><br/>Please proceed to the survey if that looks correct. Otherwise, please contact us at parenthood.identity.study@gmail.com."
					   },
					   /*1*/
                       /*snooze question, where selecting "No" snoozes the app for a predetermined amount of time*/
                       /*this is a multiple choice question*/
                       {
                       "type":"mult1",
                       "variableName": "snooze",
                       "questionPrompt": "Are you able to take the survey now?",
                       "minResponse": 0,
                       "maxResponse": 1,
                       "labels": [
                                {"label": "No"},
                                {"label": "Yes"},
                                ],
                       },
                       /*2*/
					   //Rating Self Questions - Instructions
					   {
					   "type":"instructions",
					   "variableName": "traitinstructions",
					   "questionPrompt": "Thinking about your thoughts, feelings, and behavior <u>in the past 30 minutes</u>, please do your best to honestly evaluate yourself on the following traits.",
					   },
					   /*3*/
                       //Rating Self Questions (10 - randomize within this set)
                       {
                       "type":"mult1",
                       "variableName": "trait1",
                       "questionPrompt": "<b>How competent are you?</b> <br/><b>That is, how capable are you at doing things in general?</b>",
                       "minResponse": 1,
                       "maxResponse": 8,
                       "labels": [
                                {"label": "1 - Not at all competent"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4 - Neutral"},
                                {"label": "5"},
                                {"label": "6"},
                                {"label": "7 - Very competent"},
                                {"label": "I don't know how to answer this question"},
                                ]
                       },
                       /*4*/
                       /*a "mult1" question is for multiple choice questions and for Likert-scale items that only contain 
                       positive values (including 0). Below is what a multiple choice question would look like*/
                       {
                       "type":"mult1",
                       "variableName": "trait2",
                       "questionPrompt": "<b>How intelligent are you?</b> <br/><b>That is, how easily do you learn or understand new things or problems in general?</b>",
                       "minResponse": 1,
                       "maxResponse": 8,
                       "labels": [
                                {"label": "1 - Not at all intelligent"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4 - Neutral"},
                                {"label": "5"},
                                {"label": "6"},
                                {"label": "7 - Very intelligent"},
                                {"label": "I don't know how to answer this question"},
                                ]
                       },
                       /*5*/
                       /*this is what a "mult1" for a regular rating scale with only positive values (including 0) looks like*/                       
                       {
                       "type":"mult1",
                       "variableName": "trait3",
                       "questionPrompt": "<b>How warm are you?</b> <br/><b>That is, how kind and loving are you in general?</b>",
                       "minResponse": 1,
                       "maxResponse": 8,
                       "labels": [
                                {"label": "1 - Not at all warm"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4 - Neutral"},
                                {"label": "5"},
                                {"label": "6"},
                                {"label": "7 - Very warm"},
                                {"label": "I don't know how to answer this question"},
                                ]
                       },
                       /*6*/
                       /*a "checklist" question looks exactly the same as a multiple choice option in terms of what properties
                       you need to specify. The different in formatting will appear when ExperiencesSampler renders it. */
                       {
                       "type":"mult1",
                       "variableName": "trait4",
                       "questionPrompt": "<b>How friendly are you?</b> <br/><b>That is, how sociable and pleasant are you in general?</b>",
                       "minResponse": 1,
                       "maxResponse": 8,
                       "labels": [
                                {"label": "1 - Not at all friendly"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4 - Neutral"},
                                {"label": "5"},
                                {"label": "6"},
                                {"label": "7 - Very friendly"},
                                {"label": "I don't know how to answer this question"},
                                ]
                       },
                       /*7*/
                       /*a "slider" item using a sliding rating scale. It only needs your question prompt and the minimum and
                       maximum values of your sliding scale. ExperienceSampler will set the default value to be the midpoint*/
                       {
                       "type":"mult1",
                       "variableName": "trait5",
                       "questionPrompt": "<b>How honest are you?</b> <br/><b>That is, how sincere and truthful are you in general?</b>",
                       "minResponse": 1,
                       "maxResponse": 8,
                       "labels": [
                                {"label": "1 - Not at all honest"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4 - Neutral"},
                                {"label": "5"},
                                {"label": "6"},
                                {"label": "7 - Very honest"},
                                {"label": "I don't know how to answer this question"},
                                ]
                       },
                       /*8*/
                       /*mult2 is a question where the scale values are reversed (i.e., max response value is assigned to the 
                       first label and the min value is assigned to the last label). This question format is useful
                       if you have a scale that ranges from a negative value to a positive value. Existing research (e.g., Schwarz & Keus, 2004)
                       suggests mental numbers with both positive numbers and negative numbers have positive numbers on top 
                       and negative numbers towards the bottom */
                       {
                       "type":"mult1",
                       "variableName": "trait6",
                       "questionPrompt": "<b>How trustworthy are you?</b> <br/><b>That is, how much can you be relied upon as honest and truthful in general?</b>",
                       "minResponse": 1,
                       "maxResponse": 8,
                       "labels": [
                                {"label": "1 - Not at all trustworthy"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4 - Neutral"},
                                {"label": "5"},
                                {"label": "6"},
                                {"label": "7 - Very trustworthy"},
                                {"label": "I don't know how to answer this question"},
                                ]
                       },
                       /*9*/
                       /*a "text" question is an open-ended question in which participants can enter values*/
                       {
                       "type":"mult1",
                       "variableName": "trait7",
                       "questionPrompt": "<b>How healthy are you?</b> <br/><b>That is, how is your physical and mental condition in general?</b>",
                       "minResponse": 1,
                       "maxResponse": 8,
                       "labels": [
                                {"label": "1 - Not at all healthy"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4 - Neutral"},
                                {"label": "5"},
                                {"label": "6"},
                                {"label": "7 - Very healthy"},
                                {"label": "I don't know how to answer this question"},
                                ]
                       },
                       /*10*/
                       {
                       "type":"mult1",
                       "variableName": "trait8",
                       "questionPrompt": "<b>How attractive are you?</b> <br/><b>That is, how physically appealing do you look to people in general?</b>",
                       "minResponse": 1,
                       "maxResponse": 8,
                       "labels": [
                                {"label": "1 - Not at all attractive"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4 - Neutral"},
                                {"label": "5"},
                                {"label": "6"},
                                {"label": "7 - Very attractive"},
                                {"label": "I don't know how to answer this question"},
                                ]
                       },
                       /*11*/
                       {
                       "type":"mult1",
                       "variableName": "trait9",
                       "questionPrompt": "<b>How dominant are you?</b> <br/><b>That is, how powerful, controlling, or commanding are you in general?</b>",
                       "minResponse": 1,
                       "maxResponse": 8,
                       "labels": [
                                {"label": "1 - Not at all dominant"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4 - Neutral"},
                                {"label": "5"},
                                {"label": "6"},
                                {"label": "7 - Very dominant"},
                                {"label": "I don't know how to answer this question"},
                                ]
                       },
                       /*12*/
                       {
                       "type":"mult1",
                       "variableName": "trait10",
                       "questionPrompt": "<b>How physically strong are you?</b> <br/><b>That is, how capable are you of doing physically demanding tasks in general?</b>",
                       "minResponse": 1,
                       "maxResponse": 8,
                       "labels": [
                                {"label": "1 - Not at all strong"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4 - Neutral"},
                                {"label": "5"},
                                {"label": "6"},
                                {"label": "7 - Very strong"},
                                {"label": "I don't know how to answer this question"},
                                ]
                       },
                       /*13*/
                       // ask about whether alone or with others 
                       // then have display logic questions show 13,14 only if selected with others
                       {
                       "type":"mult1",
                       "variableName": "socialSituation1",
                       "questionPrompt": "Are you currently alone or with other people?",
                       "minResponse": 1,
                       "maxResponse": 2,
                       "labels": [
                                {"label": "I am alone"},
                                {"label": "I with with other people"},
                                ]
                       },
                       /*14*/
                       {
                       "type":"checklist",
                       "variableName": "socialSituation2",
                       "questionPrompt": "Please select all those that apply. ",
                       "minResponse": 1,
                       "maxResponse": 8,
                       "labels": [
                                {"label": "I am with my child"},
                                {"label": "I am with my family member"},
                                {"label": "I am with my friend"},
                                {"label": "I am with my romantic partner or significant other"},
								{"label": "I am with my roommate"},
                                {"label": "I am with my coworker or classmate"},
								{"label": "I am with my boss or teacher"},
                                {"label": "I am with a stranger"},
                                ]
                       },
                       /*15*/
                       {
                       "type":"mult1",
                       "variableName": "socialSituation3",
                       "questionPrompt": "Are you currently in a social situation where other people <u>primarily see you as a parent</u>?",
                       "minResponse": 1,
                       "maxResponse": 8,
                       "labels": [
                                {"label": "1 - Other people do not see me as a parent at all in my current situation"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4 - Neutral"},
                                {"label": "5"},
                                {"label": "6"},
                                {"label": "7 - Other people only see me as a parent in my current situation"},
                                {"label": "I don't know how to answer this question"},

                                ]
                       },
                       /*16*/
					   // randomize within here up to 18
                       {
                       "type":"mult1",
                       "variableName": "mood1",
                       "questionPrompt": "Thinking about your energy level in the <u>past hour</u>, how do you feel?",
                       "minResponse": 1,
                       "maxResponse": 8,
                       "labels": [
                                {"label": "1 - Very sleepy"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4 - Neutral"},
                                {"label": "5"},
                                {"label": "6"},
                                {"label": "7 - Very alert"},
                                {"label": "I don't know how to answer this question"},
                                ]
                       },
                       /*17*/
                       {
                       "type":"mult1",
                       "variableName": "mood2",
                       "questionPrompt": "Thinking about your mood in the <u>past hour</u>, how do you feel?",
                       "minResponse": 1,
                       "maxResponse": 8,
                       "labels": [
                                {"label": "1 - Very negative"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4 - Neutral"},
                                {"label": "5"},
                                {"label": "6"},
                                {"label": "7 - Very positive"},
                                {"label": "I don't know how to answer this question"},
                                ]
                       },
                       /*18*/
                       {
                       "type":"mult1",
                       "variableName": "wellbeing",
                       "questionPrompt": "Taking everything into consideration, how well have you been doing in the <u>past hour</u>?",
                       "minResponse": 1,
                       "maxResponse": 8,
                       "labels": [
                                {"label": "Terrible"},
                                {"label": "Very poor"},
                                {"label": "Poor"},
                                {"label": "Fair"},
                                {"label": "Good"},
                                {"label": "Very good"},
                                {"label": "Excellent"},
								{"label": "I don't know how to answer this question"},
                                ]
                       },
                       /*19*/
                       {
                       "type":"mult1",
                       "variableName": "selfesteem",
                       "questionPrompt": "Thinking about yourself in the <u>past hour</u>, to what extent do you agree with this statement? <br/><br/><b>I have high self-esteem.</b>",
                       "minResponse": 1,
                       "maxResponse": 8,
                       "labels": [
                                {"label": "1 - Not very true of me"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4 - Neither true nor untrue of me"},
                                {"label": "5"},
                                {"label": "6"},
                                {"label": "7 - Very true of me"},
								{"label": "I don't know how to answer this question"},
                                ]
                       },
                       /*20*/
                       // Randomize within this set
                       {
                       "type":"mult1",
                       "variableName": "identityStatus1",
                       "questionPrompt": "Thinking about yourself in the <u>past hour</u>, please select the option that matches your recent thoughts, feelings, and ideas about parenthood and your child. If you are currently expecting, think about your future child. If you have more than one child, think about the oldest. <br/><br/><b>In the past hour, I felt confident about myself because of parenthood.</b>",
                       "minResponse": 1,
                       "maxResponse": 6,
                       "labels": [
                                {"label": "1 - Completely untrue"},
                                {"label": "2 - Untrue"},
                                {"label": "3 - Sometimes true/Sometimes not"},
                                {"label": "4 - True"},
                                {"label": "5 - Completely true"},
                                {"label": "I don’t know how to answer this question"},
                                ]
                       },
                       /*21*/
                       {
                       "type":"mult1",
                       "variableName": "identityStatus2",
                       "questionPrompt": "Thinking about yourself in the <u>past hour</u>, please select the option that matches your recent thoughts, feelings, and ideas about parenthood and your child. If you are currently expecting, think about your future child. If you have more than one child, think about the oldest. <br/><br/><b>In the past hour, I thought a lot about being a parent.</b>",
                       "minResponse": 1,
                       "maxResponse": 6,
                       "labels": [
                                {"label": "1 - Completely untrue"},
                                {"label": "2 - Untrue"},
                                {"label": "3 - Sometimes true/Sometimes not"},
                                {"label": "4 - True"},
                                {"label": "5 - Completely true"},
                                {"label": "I don’t know how to answer this question"},
                                ]
                       },
                       /*22*/
                       {
                       "type":"mult1",
                       "variableName": "identityStatus3",
                       "questionPrompt": "Thinking about yourself in the <u>past hour</u>, please select the option that matches your recent thoughts, feelings, and ideas about parenthood and your child. If you are currently expecting, think about your future child. If you have more than one child, think about the oldest. <br/><br/><b>In the past hour, I felt that not having a child/children would make my life more interesting.</b>",
                       "minResponse": 1,
                       "maxResponse": 6,
                       "labels": [
                                {"label": "1 - Completely untrue"},
                                {"label": "2 - Untrue"},
                                {"label": "3 - Sometimes true/Sometimes not"},
                                {"label": "4 - True"},
                                {"label": "5 - Completely true"},
                                {"label": "I don’t know how to answer this question"},
                                ]
                       },  
                       
                       // lockout messages 
                       // 23
                       {
					   "type":"instructions",
					   "variableName": "studyHasntStarted",
					   "questionPrompt": "This study has not started yet. Please wait until you receive a notification before launching the app. ",
					   },  
					   // 24 
					   {
					   "type":"instructions",
					   "variableName": "studyEnded",
					   "questionPrompt": "The study has now finished. You can now delete the app, but we would advise you to keep it until you have received your payment. ",
					   },					   
					   // 25
					   {
					   "type":"instructions",
					   "variableName": "noSurveyAvailable",
					   "questionPrompt": "It is not time for you to complete a survey now. Please wait until your next notification.",
					   },					                       
                       ];

/*These are the messages that are displayed at the end of the questionnaire*/
var lastPage = [
				/*0*/
                {
                "message": "Saving data..."
                },
                /*1*/
                {
                "message": "Snoozed! We will ask again later."
                },
                // 2
                {
                "message": "Thank you for your interest in our study. Unfortunately, our app is incompatible with your phone, so you CANNOT participate in our study. We apologize for the inconvenience. "
                },
                /*3*/
                {
                "message": "Please check back later. "                
                },
                /*4*/
                {
                "message": "The study has finished. "              
                },
                ];

/*Questions to set up participant notifications so that notifications are customized to participant's schedule*/                
var participantSetup = [
                        // -12
                        // created a new type of question so can validate the length of the survey. 
                        // one for inputting only 3 values
                        {
						"type":"idText3",
						"variableName": "id1",
						"minLength": 3, 
						"maxLength": 3,
						"questionPrompt": "Survey Matcher - Enter your anonymous participant ID <br/><br/> This section allows us to match you with other data you provide us, while still making sure your responses remain completely anonymous and confidential. <br/><br/>Please write the <u>first three letters</u> of the first street you ever lived on (e.g., the first street I lived on was Essex Street, so I would enter 'ESS'):"
                        },
                        // -11
                        // make another new type of question so can validate length of response
                        // one of inputting 2 values
                        {
						"type":"idText2",
						"variableName": "id2",
						"minLength": 2, 
						"maxLength": 2,
						"questionPrompt": "Survey Matcher - Enter your anonymous participant ID <br/><br/> This section allows us to match you with other data you provide us, while still making sure your responses remain completely anonymous and confidential. <br/><br/>Please enter the <u>2-digit</u> calendar day of your birthday (e.g., I was born on December 1st, so I would enter '01'):"
                        },
                        // -10
                        {
						"type":"idText2",
						"variableName": "id3",
						"minLength": 2, 
						"maxLength": 2,
						"questionPrompt": "Survey Matcher - Enter your anonymous participant ID <br/><br/> This section allows us to match you with other data you provide us, while still making sure your responses remain completely anonymous and confidential. <br/><br/>Please enter the <u>last two letters</u> of your mother's maiden name (e.g., My mother's maiden name is Rose, so I would enter 'SE'):"
                        },
                        // -9
                        {
						"type":"mult1",
						"variableName": "idConfirm",
						"questionPrompt": "Your ID is <br/><br/><b> PID </b> <br/><br/>Is this correct?",
						"minResponse":0,
                       	"maxResponse":1,
                       	"labels": [
                       		{"label":"No"},
                       		{"label":"Yes"}
                       	]
                        },
                        
                        // -8
                        {
                        "type":"mult1",
                       	"variableName":"osType",
                       	"questionPrompt":"What type of device do you have?",
                       	"minResponse":0,
                       	"maxResponse":1,
                       	"labels": [
                       		{"label":"iPhone or Other Apple Device"},
                       		{"label":"Android Phone or Android Device"}
                       	]
                        },
                        // -7
                        {
                        "type":"mult1",
						"variableName": "testNotification",
						"questionPrompt": "Next, we will test whether the notification system is working on your phone. Please click the button below to test the notification system. <br/><br/> <u>You will receive a notification in <b>10 seconds.</b></u> If you see the notification, DO <b>NOT</b> CLICK ON IT. Clicking on it will interrupt your app setup. <br/><br/>If you have an Apple device, please go to your home screen after you click the button below, so you can see the notification. If you stay in the app, you will NOT see the notification. <br/><br/> Please return to the app after you have seen the notification or 10 seconds have passed. ",
						"minResponse": 1,
                       	"maxResponse": 1,
                       	"labels": [
                                {"label": "Test notification now - it should fire within 10 seconds"},
                        ]
                        },
                        // -6
                        {
                        "type":"mult1",
                       	"variableName":"notificationWorked",
                       	"questionPrompt":"Did you receive the test notification?",
                       	"minResponse":0,
                       	"maxResponse":1,
                       	"labels": [
                       		{"label":"No"},
                       		{"label":"Yes"}
                       	]
                        },
                       // -5
                        {
                        "type":"instructions",
                       	"variableName":"notificationFail",
                       	"questionPrompt":"It looks like your notification system is not working. You are ineligible to participate in our study. <br/><br/> If you think that an error has occurred, please restart the setup process by clearing the cache for this app on your phone, or by reinstalling the app. <br/><br/> For assistance, contact us at <u>parenthood.identity.study@gmail.com</u>.",
                        },
                        // -4
						{
						"type":"timePicker",
						"variableName": "survey1Start",
						"questionPrompt": "We will now ask you to indicate during what times you are able to complete your survey. We will ask you for two blocks of time when you are free to complete the survey. Please allow <u>at least 2 hours</u> for each block of time. <br/><br/>When does your <b>FIRST</b> block of time <b>START</b>?"
                        },
                        // -3
						{
						"type":"timePicker",
						"variableName": "survey1End",
						"questionPrompt": "We will now ask you to indicate during what times you are able to complete your survey. We will ask you for two blocks of time when you are free to complete the survey. Please allow <u>at least 2 hours</u> for each block of time. <br/><br/>When does your <b>FIRST</b> block of time <b>END</b>? <u>This should be at least 2 hours after the previous start time that you indicated.</u>"
                        },
                        // -2
                        {
						"type":"timePicker",
						"variableName": "survey2Start",
						"questionPrompt": "We will now ask you to indicate during what times you are able to complete your survey. We will ask you for two blocks of time when you are free to complete the survey. Please allow <u>at least 2 hours</u> for each block of time. <br/><br/>When does your <b>SECOND</b> block of time <b>START</b>?"
                        },
                        // -1
						{
						"type":"timePicker",
						"variableName": "survey2End",
						"questionPrompt": "We will now ask you to indicate during what times you are able to complete your survey. We will ask you for two blocks of time when you are free to complete the survey. Please allow <u>at least 2 hours</u> for each block of time. <br/><br/>When does your <b>SECOND</b> block of time <b>END</b>? <u>This should be at least 2 hours after the previous start time that you indicated.</u>"
                        },
           
                    ];

/*Populate the view with data from surveyQuestion model*/
// Making mustache templates
//This line determines the number of questions in your participant setup
//Shout-out to Rebecca Grunberg for this great feature!
var NUMSETUPQS = participantSetup.length;
//This line tells ExperienceSampler which question in surveyQuestions is the snooze question
//If you choose not to use the snooze option, just comment it out
var SNOOZEQ = 1;
//This section of code creates the templates for all the question formats
var questionTmpl = "<p>{{{questionText}}}</p><ul>{{{buttons}}}</ul>";
var questionTextTmpl = "{{{questionPrompt}}}";
var buttonTmpl = "<li><button id='{{id}}' value='{{value}}'>{{label}}</button></li>";
var textTmpl="<li><textarea cols=50 rows=5 id='{{id}}'></textarea></li><li><button type='submit' value='Enter'>Enter</button></li>";
var numberTmpl = "<li><input type='number' id='{{id}}'></input></li><br/><br/><li></li><li><button type='submit' value='Enter'>Enter</button></li>";
// Make a new template for participant id
var idText3Tmpl="<li><input type='text' id='{{id}}' required minlength='3' maxlength='3' size='24'></input></li><br/><br/><li></li><li><button type='submit' value='Enter'>Enter</button></li>";
var idText2Tmpl="<li><input type='text' id='{{id}}' required minlength='2' maxlength='2' size='24'></input></li><br/><br/><li></li><li><button type='submit' value='Enter'>Enter</button></li>";
var checkListTmpl="<li><input type='checkbox' id='{{id}}' value='{{value}}'>{{label}}</input></li>";
var instructionTmpl = "<li><button id='{{id}}' value = 'Next'>Next</button></li>";
var linkTmpl = "<li><button id='{{id}}' value = 'Next'>Click here AFTER finishing the survey in the link above</button></li>";
var sliderTmpl = "<li><input type='range' min='{{min}}' max='{{max}}' value='{{value}}' orient=vertical id='{{id}}' oninput='outputUpdate(value)'></input><output for='{{id}}' id='slider'>50</output><script>function outputUpdate(slidervalue){document.querySelector('#slider').value=slidervalue;}</script></li><li><button type='submit' value='Enter'>Enter</button></li>";
var datePickerTmpl = '<li><input id="{{id}}" data-format="DD-MM-YYYY" data-template="D MMM YYYY" name="date"><br /><br /></li><li><button type="submit" value="Enter">Enter</button></li><script>$(function(){$("input").combodate({firstItem: "name",minYear:2015, maxYear:2016});});</script>';
var dateAndTimePickerTmpl = '<li><input id="{{id}}" data-format="DD-MM-YYYY-HH-mm" data-template="D MMM YYYY  HH:mm" name="datetime24"><br /><br /></li><li><button type="submit" value="Enter">Enter</button></li><script>$(function(){$("input").combodate({firstItem: "name",minYear:2015, maxYear:2016});});</script>';
var timePickerTmpl = "<li><input id ='{{id}}' type='time'></input><br /><br /></li><li><button type='submit' value='Enter'>Enter</button></li>";
var lastPageTmpl = "<h3>{{message}}</h3>";
//This line generates the unique key variable. You will not assign the value here, because you want it the value to change
//with each new questionnaire
var uniqueKey;
// declare participant_id as a variable
var participant_id; 
// declare parts of the id as variables so you can join them together to form the participant_id
var id1, id2, id3; 
// indicate which questions need to be randomized in the rating about self block
var selfQs = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// indicate which questions need to be randomized in the block of various other questionnaires
var socialSitQs = [16, 17, 18, 19];
// indicate which questions need to be randomized in the parent identity block
var parentidQs = [20, 21, 22];
// make a variable for each rating about self question to randomize
var self1, self2, self3, self4, self5, self6, self7, self8, self8, self9, self10; 
// make a variable for mood, well-being, identity questions to randomize
var socialSit1, socialSit2, socialSit3, socialSit4, parentid1, parentid2, parentid3;
// declare values to store the start and end of the data collection period
var surveyStart, surveyEnd;
// create an array to store all the survey notifications
// we will use this check whether participants should be allowed to access the survey or not
var notifs = []; 
// declare how large the survey window is 
// this is 3 hours in milliseconds
// we'll use this to determine whether the participant should have access to the survey or not. 
var surveyWindow = 10800000;
// declare server variable
var server; 
//If you need to declare any other global variables (i.e., variables to be used in more than one function of ExperienceSampler)
//you should declare them here. 
//For example, you might declare your piped text variable or your question branch response variable
//var name /*sample piped text variable*/

var app = {
    // Application Constructor
initialize: function() {
    this.bindEvents();
},
    // Bind Event Listeners
bindEvents: function() {
    document.addEventListener("deviceready", this.onDeviceReady, false);
    document.addEventListener("resume", this.onResume, false);
    document.addEventListener("pause", this.onPause, false);
},
//these functions tell the app what to do at different stages of running
onDeviceReady: function() {
    app.init();
},

onResume: function() {app.sampleParticipant();},

onPause: function() {app.pauseEvents();},

//Beginning our app functions
/* The first function is used to specify how the app should display the various questions. You should note which questions 
should be displayed using which formats before customizing this function*/
renderQuestion: function(question_index) {
    //First load the correct question from the JSON database
	var question;
	if (question_index <= -1) {question = participantSetup[question_index + NUMSETUPQS];}
	else {
		question = surveyQuestions[question_index];
	}
    var questionPrompt = question.questionPrompt; 
    //If you want to include piped text in your question wording, you would implement it in this section. 
    //Below is an example of how you would look for the NAME placeholder in your surveyQuestion questionPrompts 
    //and replace it with the response value that you assign to the name variable
    //See our example app to see how you can implement this
	if (questionPrompt.indexOf('PID') >= 0) {
		questionPrompt = questionPrompt.replace("PID", function replacer() {return localStore.participant_id;});
	}
	if (questionPrompt.indexOf('SURVEYCOUNT') >= 0) {
		questionPrompt = questionPrompt.replace("SURVEYCOUNT", function replacer() {return localStore.surveyCount;});
	}
	alert("Mustache should be rendering questiontext as: "+ question.questionText);
	alert("question type is: "+question.type)
	Mustache.parse(questionTextTmpl);
	Mustache.compile(questionTextTmpl);
	question.questionText = Mustache.render(questionTextTmpl, {questionPrompt: questionPrompt}); 

    //Now populate the view for this question, depending on what the question type is
    //This part of the function will render different question formats depending on the type specified
    //Another shout-out to Rebecca Grunberg for this amazing improvement to ExperienceSampler
    switch (question.type) {
    	case 'mult1': // Rating scales (i.e., small numbers at the top of the screen and larger numbers at the bottom of the screen).
    		question.buttons = "";
        	var label_count = 0;
        	for (var i = question.minResponse; i <= question.maxResponse; i++) {
            	var label = question.labels[label_count++].label;
            	//If you want to implement piped text in your wording choice, you would place it here
    			//Below is an example of how you would look for the NAME placeholder in your surveyQuestion labels 
    			//and replace it with 
//                 if (label.indexOf('NAME') >= 0){
//             		label = label.replace("NAME", function replacer() {return name;});
//             		}            	
            	question.buttons += Mustache.render(buttonTmpl, {
                                                id: question.variableName+i,
                                                value: i,
                                                label: label
                                                });
        	}
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click(function(){
        		app.recordResponse(this, question_index, question.type);
        	});
        	break;
        case 'mult2': // Rating scales (i.e., positive numbers at the top of the screen and negative numbers at the bottom of the screen).
    		question.buttons = "";
            var label_count = 0;
            for (var j = question.maxResponse; j >= question.minResponse; j--) {
                var label = question.labels[label_count++].label;
//                if (label.indexOf('NAME') >= 0){
//            		label = label.replace("NAME", function replacer() {return name;});
//           		}
                question.buttons += Mustache.render(buttonTmpl, {
                                                    id: question.variableName+j,
                                                    value: j,
                                                    label: label
                                                    });
            }
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click(function(){
        		app.recordResponse(this, question_index, question.type);
        	});
        	break;		
        case 'checklist':  
        	question.buttons = "";
        	var label_count = 0;
        	var checkboxArray = [];
        	for (var i = question.minResponse; i <= question.maxResponse; i++) {
            	var label = question.labels[label_count++].label;
//            	if (label.indexOf('NAME') >= 0){
//            		label = label.replace("NAME", function replacer() {return name;});
//            		}
            	question.buttons += Mustache.render(checkListTmpl, {
                                                	id: question.variableName+i,
                                                	value: i,
                                                	label: label
                                                	});
        	}
        	question.buttons += "<li><button type='submit' value='Enter'>Enter</button></li>";
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click( function(){
                                          checkboxArray.push(question.variableName);
                                          $.each($("input[type=checkbox]:checked"), function(){checkboxArray.push($(this).val());});
                                          app.recordResponse(String(checkboxArray), question_index, question.type);
            });
            break;
        case 'slider':
        	question.buttons = Mustache.render(sliderTmpl, {id: question.variableName+"1"}, {min: question.minResponse}, {max: question.maxResponse}, {value: (question.maxResponse)/2});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var slider = [];
        	$("#question ul li button").click(function(){
        			slider.push(question.variableName);
        			slider.push($("input[type=range]").val());
        			app.recordResponse(String(slider), question_index, question.type);
        	});
        	break;
        case 'instructions':
			Mustache.parse(instructionTmpl);
			Mustache.compile(instructionTmpl);
        	question.buttons = Mustache.render(instructionTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var instruction = [];
        	$("#question ul li button").click(function(){ 
        		instruction.push(question.variableName);
        		instruction.push($(this).val());
        		app.recordResponse(String(instruction), question_index, question.type);
        	});
        	break;
        case 'link':
        	question.buttons = Mustache.render(linkTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var instruction = [];
        	$("#question ul li button").click(function(){ 
        		instruction.push(question.variableName);
        		instruction.push($(this).val());
        		app.recordResponse(String(instruction), question_index, question.type);
        	});
        	break; 
	case 'text': //default to open-ended text
        	question.buttons = Mustache.render(textTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click(function(){
				//If you want to force a response from your participants for 
				//open-ended questions, you should uncomment this portion of the code
// 				if (app.validateResponse($("textarea"))){
        		 	app.recordResponse($("textarea"), question_index, question.type);
//                 } 
//                 else {
//                     alert("Please enter something.");
//                 }
            });
            break;
        // add a new question type for participant id
		// this one is for 3 characters    
        case 'idText3': //default to open-ended text
        	question.buttons = Mustache.render(idText3Tmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click(function(){
				//If you want to force a response from your participants for 
				//open-ended questions, you should uncomment this portion of the code
				if (app.validateId($("input"))){
        		 	app.recordResponse($("input"), question_index, question.type);
                } 
                else {
                    alert("You have entered your id incorrectly.");
                }
            });
            break;  
    	// add a new question for participant id 
    	// this one is for 2 characters  
        case 'idText2': //default to open-ended text
        	question.buttons = Mustache.render(idText2Tmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click(function(){
				//If you want to force a response from your participants for 
				//open-ended questions, you should uncomment this portion of the code
				// this function makes sure it is only 2 characters
				if (app.validateId2($("input"))){
        		 	app.recordResponse($("input"), question_index, question.type);
                } 
                else {
                    alert("You have entered your id incorrectly.");
                }
            });
            break;    

        case 'number': //default to open-ended text
        	question.buttons = Mustache.render(numberTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click(function(){
				//If you want to force a response from your participants for 
				//open-ended questions, you should uncomment this portion of the code
				if (app.validateNumber($("input"))){
        		 	app.recordResponse($("input"), question_index, question.type);
                } 
                else {
                    alert("Please enter a number.");
                }
            });
            break;  		    
        case 'datePicker':
        	question.buttons = Mustache.render(datePickerTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var date, dateSplit, variableName = [], dateArray = [];
        	$("#question ul li button").click(function(){
        		date = $("input").combodate('getValue');
        		dateArray.push(question.variableName);
        		dateArray.push(date);
        		app.recordResponse(String(dateArray), question_index, question.type);
        	});
        	break;    
        case 'dateAndTimePicker':
        	question.buttons = Mustache.render(dateAndTimePickerTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var date, dateSplit, variableName = [], dateArray = [];
        	$("#question ul li button").click(function(){
        		date = $("input").combodate('getValue');
        		dateArray.push(question.variableName);
        		dateArray.push(date);
        		app.recordResponse(String(dateArray), question_index, question.type);
        	});
        	break;
        case 'timePicker':
        	question.buttons = Mustache.render(timePickerTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var time, timeSplit, variableName = [], timeArray = [];
        	$("#question ul li button").click(function(){
				if (app.validateTime($("input"))){
        		 	app.recordResponse($("input"), question_index, question.type);
                } 
                else {
                    alert("Please enter a time.");
                }
        	});
        	break;	        		                 
        }
    },
    
renderLastPage: function(pageData, question_index) {
	console.log("renderLastPage fired");
    $("#question").html(Mustache.render(lastPageTmpl, pageData));
	//This section should be implemented if you choose to use a snooze feature
	//It tells ExperienceSampler that if the participant has chosen to snooze the app,
	//the app should save a snooze value of 1 (this value will be used to reset the unique key, so that
	//this data is does not have the same unique key as the subsequent questionnaire)
    if ( question_index == SNOOZEQ ) {
		alert("renderlastpage snooze fired");
        app.snoozeNotif();
        localStore.snoozed = 1;
        app.saveData();        
    }
    //If you choose to implement the snooze function, uncomment the else in the statement below
    else if ( question_index == -1) {alert("question_index == -1 and savedatainstallation done");
    	app.saveDataInstallation();
    }
    else if ( question_index == 23 || question_index == 24 || question_index == 25) {
		alert("question_index is either 23, 24, or 25 and save data and clear");
    	app.saveDataAndClear();   
    }
    //This part of the code says that if the participant has completed the entire questionnaire,
    //ExperienceSampler should create a completed tag for it.
    //This tag will be used to count the number of completed questionnaires participants have completed
    //at the end of each day
    //The time stamp created here will also be used to create an end time for your restructured data
    else {
    	var datestamp = new Date();
    	var year = datestamp.getFullYear(), month = datestamp.getMonth(), day=datestamp.getDate(), hours=datestamp.getHours(), minutes=datestamp.getMinutes(), seconds=datestamp.getSeconds(), milliseconds=datestamp.getMilliseconds();
    	localStore[uniqueKey + '.' + "completed" + "_" + "completedSurvey"  + "_" + year + "_" + month + "_" + day + "_" + hours + "_" + minutes + "_" + seconds + "_" + milliseconds] = 1;	
		localStore[uniqueKey + "_" + "endTime"  + "_" + year + "_" + month + "_" + day + "_" + hours + "_" + minutes + "_" + seconds + "_" + milliseconds] = datestamp;	
		localStore.surveyCount++;
    	app.saveDataLastPage();
    }
},

/* Initialize the whole thing */
init: function() {
	//First, we assign a value to the unique key when we initialize ExperienceSampler
// 	uniqueKey = new Date().getTime();
	var now = new Date().getTime(); 
	//The statement below states that if there is no participant id or if the participant id is left blank,
	//ExperienceSampler would present the participant set up questions
	if (localStore.participant_id === " " || !localStore.participant_id || localStore.participant_id == "undefined") {app.renderQuestion(-NUMSETUPQS);}  
	//otherwise ExperienceSampler should just save the unique key and display the first question in survey questions  
	// 	create a new variable for survey count if this variable does not have a value assigned to it 
	if (localStore.surveyCount === "" || !localStore.surveyCount || localStore.surveyCount == "undefined" || isNaN(localStore.surveyCount)==true){
		localStore.surveyCount = 0;
	}
	// the study has not started yet logic
	if (now < localStore.surveyStart){
		uniqueKey = new Date().getTime();
		localStore.uniqueKey = uniqueKey;
		app.renderQuestion(23);

	}
	else if (now > localStore.surveyEnd){
		uniqueKey = new Date().getTime();
		localStore.uniqueKey = uniqueKey;
		app.renderQuestion(24);
	}
	else {
		for (var j = 0; j < 42; j++){
			console.log("the j=0 thing fired");
			var notifArray = localStore.notifs.split(","); 
			console.log("printing notifArray now");
			console.log(notifArray);
			var start = parseInt(notifArray[j]); 
			console.log("printing start now");
			console.log(start);
			var end = parseInt(notifArray[j]) + parseInt(surveyWindow); //*CHANGEME ADDED PARSEINT TO THIS SURVEYWINDOW*//
			console.log("printing end now");
			console.log(end);
			console.log("printing now now");
			console.log(now);
			if (now > start && now < end){
				    alert("I'm supposed to show the survey now!");
					console.log("condition logic works");
					// set the survey id; this is the time they start the survey in epoch time
					// you can convert it into regular time by searching for the epoch converter on google (first hit)
					uniqueKey = new Date().getTime();
					console.log("printing uniqueKey:");
					console.log(uniqueKey);
					// store the survey id so that all the responses get the same unique key in case participant leaves the app
					// in the middle of survey
					localStore.uniqueKey = uniqueKey;
					console.log("storing uniqueKey locally");
					console.log(localStore.uniqueKey);
					// also store this as the start time for the dataset
					var startTime = new Date(uniqueKey);
					console.log("printing startTime for this dataset:");
					console.log(startTime);
					// make a date stamp for the start time Response
					var syear = startTime.getFullYear(), smonth = startTime.getMonth(), sday=startTime.getDate(), shours=startTime.getHours(), sminutes=startTime.getMinutes(), sseconds=startTime.getSeconds(), smilliseconds=startTime.getMilliseconds();
					console.log("printing syear");
					console.log(syear);
					// write the start time to the local store and will be sent to the server later on to be written into the dataset
					localStore[uniqueKey + "_" + "startTime"  + "_" + syear + "_" + smonth + "_" + sday + "_" + shours + "_" + sminutes + "_" + sseconds + "_" + smilliseconds] = startTime;
					console.log("start time successfully written to local store");	   		
	
					// set the randomized order of the self rating Qs
					console.log("randomizing");
					self1 = app.randomSelectQs(selfQs); 
					console.log("randomization self1 successful");
					self2 = app.randomSelectQs(selfQs); 
					console.log("randomization self2 successful");
					self3 = app.randomSelectQs(selfQs); 
					console.log("randomization self3 successful");
					self4 = app.randomSelectQs(selfQs); 
					console.log("randomization self4 successful");
					self5 = app.randomSelectQs(selfQs);
					console.log("randomization self5 successful");
					self6 = app.randomSelectQs(selfQs); 
					console.log("randomization self6 successful");
					self7 = app.randomSelectQs(selfQs); 
					console.log("randomization self7 successful");
					self8 = app.randomSelectQs(selfQs);
					console.log("randomization self8 successful");
					self9 = app.randomSelectQs(selfQs); 
					console.log("randomization self9 successful");
					self10 = app.randomSelectQs(selfQs); 
					console.log("randomization self10 successful");
					// set the randomized order of the social situation Qs
					socialSit1 = app.randomSelectQs(socialSitQs); 
					console.log("randomization socialSit1 successful");
					socialSit2 = app.randomSelectQs(socialSitQs); 
					console.log("randomization socialSit2 successful");
					socialSit3 = app.randomSelectQs(socialSitQs); 
					console.log("randomization socialSit3 successful");
					socialSit4 = app.randomSelectQs(socialSitQs); 
					console.log("randomization socialSit4 successful");
					// set the randomized order of the parent identity Qs
					parentid1 = app.randomSelectQs(parentidQs);
					console.log("randomization parentid1 successful");
					parentid2 = app.randomSelectQs(parentidQs); 
					console.log("randomization parentid2 successful");
					parentid3 = app.randomSelectQs(parentidQs); 
					console.log("randomization parentid3 successful");
					// then show the snooze question to initiate the survey
					alert("first question index that should fire is self1 =" + self1);
					app.renderQuestion(1);
					alert("app.renderQuestion(1) fired successfully");
			} 
			// no survey available logic
			else {
				alert("skipping to no survey available logic");
				console.log("SKIPPED TO NO SURVEY AVAILABLE LOGIC");
				uniqueKey = new Date().getTime();
				localStore.uniqueKey = uniqueKey;
				app.renderQuestion(25);
			}	
		}
    }
   
    localStore.snoozed = 0;
},
  
/* Record User Responses */  
recordResponse: function(button, count, type) {
		//uncomment up to "localStore[uniqueRecord] = response;" to test whether app is recording and sending data correctly (Stage 2 of Customization)
		//This tells ExperienceSampler how to save data from the various formats
    //Record date (create new date object)
    var datestamp = new Date();
    var year = datestamp.getFullYear(), month = datestamp.getMonth(), day=datestamp.getDate(), hours=datestamp.getHours(), minutes=datestamp.getMinutes(), seconds=datestamp.getSeconds(), milliseconds=datestamp.getMilliseconds();
    //Record value of text field
    var response, currentQuestion, uniqueRecord;
    if (type == 'text') {
        response = button.val();
        // remove newlines from user input
        response = response.replace(/(\r\n|\n|\r)/g, ""); //encodeURIComponent(); decodeURIComponent()
        currentQuestion = button.attr('id').slice(0,-1);
    }
    else if (type == 'number') {
        response = button.val();
        // remove newlines from user input
        response = response.replace(/(\r\n|\n|\r)/g, ""); //encodeURIComponent(); decodeURIComponent()
        currentQuestion = button.attr('id').slice(0,-1);
    }        	
    // add this to tell the app what to record for these new id question types
	else if (type == 'idText3') {
        response = button.val();
        // remove newlines from user input
        response = response.replace(/(\r\n|\n|\r)/g, ""); //encodeURIComponent(); decodeURIComponent()
        currentQuestion = button.attr('id').slice(0,-1);
    }  
    // add this to tell the app what to record for these new id question types  	
	else if (type == 'idText2') {
        response = button.val();
        // remove newlines from user input
        response = response.replace(/(\r\n|\n|\r)/g, ""); //encodeURIComponent(); decodeURIComponent()
        currentQuestion = button.attr('id').slice(0,-1);
    }        	

    else if (type == 'slider') {
    	response = button.split(/,(.+)/)[1];
        currentQuestion = button.split(",",1);
    }
    //Record the array
    else if (type == 'checklist') {
        response = button.split(/,(.+)/)[1];
        currentQuestion = button.split(",",1);
    }
    else if (type == 'instructions') {
    	response = button.split(/,(.+)/)[1];
        currentQuestion = button.split(",",1);
    }
    //Record value of clicked button
    else if (type == 'mult1') {
        response = button.value;
        //Create a unique identifier for this response
        currentQuestion = button.id.slice(0,-1);
    }
    //Record value of clicked button
    else if (type == 'mult2') {
        response = button.value;
        //Create a unique identifier for this response
        currentQuestion = button.id.slice(0,-1);
    }
    else if (type == 'datePicker') {
		response = button.split(/,(.+)/)[1];
     	currentQuestion = button.split(",",1);
    }
    else if (type == 'dateAndTimePicker') {
		response = button.split(/,(.+)/)[1];
     	currentQuestion = button.split(",",1);
    }
    else if (type == 'timePicker') {
    	response = button.val();
        currentQuestion = button.attr('id').slice(0,-1);
    }
    if (count <= -1) {uniqueRecord = currentQuestion}
    else {uniqueRecord = uniqueKey + "_" + currentQuestion + "_" + year + "_" + month + "_" + day + "_" + hours + "_" + minutes + "_" + seconds + "_" + milliseconds;}
    //Save this to local storage
    localStore[uniqueRecord] = response;
	


	/*Question Logic Statements*/
// 		Stage 3 of Customization
		//if your questionnaire has two branches based on the absence or presence of a phenomenon, you will need the next statement
		//this statement allows you to record whether the phenomenon was absent or present so you can specify which branch the participant should complete when
		//the questionnaire splits into the two branches
		//if not then you do not need the next statement and should leave it commented out
    if (count == -12) {id1 = response;}
    if (count == -11) {id2 = response;}
    if (count == -10) {
    	id3 = response; 
    	participant_id = String(id1);
    	participant_id += String(id2);
    	participant_id += String(id3);
    	localStore.participant_id = participant_id; 
    }
    
	//The line below states that if the app is on the last question of participant setup, it should schedule all the notifications
	//then display the default end of survey message, and then record which notifications have been scheduled.
	//You will test local notifications in Stage 4 of customizing the app
// 	********IF YOU HAVE NO QUESTION LOGIC BUT HAVE SCHEDULED NOTIFICATIONS, YOU NEED TO UNCOMMENT THE FOLLOWING LINE
// 	TO EXECUTE THE  () FUNCTION********
	// ask them to confirm if ID is correct. If ID is not correct, go back to the beginning
    if (count == -9 && response == 0){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(-12);});}
    // if ID is correct, keep going up with setup
    else if (count == -9 && response == 1){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(-8);});}
    // on the test notification question, need to schedule the test notification to fire and then proceed to the next question
	else if (count == -7){app.testNotif(); $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(-6);});}
	// if the test notification did not fire, then show them question about how it did not fire (-5)
	else if (count == -6 && response == 0){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(-5);});}
	// if the test notification did fire, go to the survey time questions
	else if (count == -6 && response == 1){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(-4);});}
    // if notification failed, then show them last page message related to app being incompatible with phone
    else if (count == -5) {app.renderLastPage(lastPage[2], count);}
    // on the last survey question, schedule the notifications and then show them the last page
    else if (count == -1){
    	// randomly assign the server number at the end of setup
    	localStore.server = Math.floor(Math.random()*4)+1;
    	server = localStore.server; 
    	// schedule the notifications
    	app.scheduleNotifs();
    	// show the end of page message for set up
    	app.renderLastPage(lastPage[0], count);
	}
    // go to snooze last page message if they say not available to do survey now
    else if (count == SNOOZEQ && response == 0) {app.renderLastPage(lastPage[1], count);}

    // show self ratings questions in randomized order
    // because it's randomized we have to tell it to show the next question in the random order 
    // instead of relying on the second last line in this function to just show the next question
    else if (count == SNOOZEQ && response == 1){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(2);});}
	else if (count == 2){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(self1);});}
    else if (count == self1){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(self2);});}
    else if (count == self2){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(self3);});}
    else if (count == self3){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(self4);});}
    else if (count == self4){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(self5);});}
    else if (count == self5){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(self6);});}
    else if (count == self6){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(self7);});}
    else if (count == self7){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(self8);});}
    else if (count == self8){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(self9);});}
    else if (count == self9){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(self10);});}
    // last question in self ratings set should go to question 12
    else if (count == self10){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(12);});}

	// logic for social situation
	// if participant says they are alone, go to next social situation question
	else if (count == 12 && response == 1){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(socialSit1);});}
	// if participant says they are with other people, ask them to specify who they are with in question 12 
	else if (count == 12 && response == 2){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(13);});}
	else if (count == 13){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(socialSit1);});}

	// show social situation questions in a randomized order
	// because it's randomized we have to tell it to show the next question in the random order
	// instead of relying on the second last line in this function to just show the next question
	else if (count == socialSit1){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(socialSit2);});}
	else if (count == socialSit2){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(socialSit3);});}
	else if (count == socialSit3){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(socialSit4);});}
	else if (count == socialSit4){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(parentid1);});}
	else if (count == parentid1){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(parentid2);});}
	else if (count == parentid2){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(parentid3);});}
	else if (count == parentid3){app.renderLastPage(lastPage[0], count);}

	// show lockout messages
	// the study hasn't started yet
	else if (count == 23){app.renderLastPage(lastPage[3], count);}
	// the study is over
	else if (count == 24){app.renderLastPage(lastPage[4], count);}
	// there is no survey currently available
	else if (count == 25){alert("count is 25 and skip to no survey currently available message");
		app.renderLastPage(lastPage[3], count);}


	//Uncomment the "/*else*/" below only when customizing question logic (Stage 3), so that the app will just proceed to the next question in the JSON database
	//DO NOT uncomment the "/*else*/" below when testing whether questions are being displayed in the right format (Stage 1) OR if you have no question logic 
	//in your questionnaire **CHECKTHIS**
   else if (count < surveyQuestions.length-1) {
	$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(count+1);});}
   else {
	app.renderLastPage(lastPage[0], count);}; //**CHANGEME** TRIED TO COMMENT THIS OUT */
},
    
/* Prepare for Resume and Store Data */
/* Time stamps the current moment to determine how to resume */
pauseEvents: function() {
    localStore.pause_time = new Date().getTime();
    localStore.uniqueKey = uniqueKey;	
    app.saveData();
},
      
sampleParticipant: function() {
	var now = new Date().getTime(); 
    var current_moment = new Date();
    var current_time = current_moment.getTime();
    //change X to the amount of time the participant is locked out of the app for in milliseconds
    //e.g., if you want to lock the participant out of the app for 10 minutes, replace X with 600000
    //If you don't have a snooze feature, remove the "|| localStore.snoozed == 1"
    if ((current_time - localStore.pause_time) > 600000 || localStore.snoozed == 1) {
        // the study has not started yet logic
		if (now < localStore.surveyStart){
			uniqueKey = new Date().getTime();
			localStore.uniqueKey = uniqueKey;
			app.renderQuestion(23);

		}
		else if (now > localStore.surveyEnd){
			uniqueKey = new Date().getTime();
			localStore.uniqueKey = uniqueKey;
			app.renderQuestion(24);
		}
		else {
			for (var j = 0; j < 42; j++){
				var notifArray = localStore.notifs.split(","); 
				console.log(notifArray);
				var start = parseInt(notifArray[j]); 
				var end = parseInt(notifArray[j]) + parseInt(surveyWindow); //*CHANGEME ADDED PARSEINT TO THIS SURVEYWINDOW*//
				if (now > start && now < end){
					// set the survey id; this is the time they start the survey in epoch time
					// you can convert it into regular time by searching for the epoch converter on google (first hit)
					uniqueKey = new Date().getTime();
					// store the survey id so that all the responses get the same unique key in case participant leaves the app
					// in the middle of survey
					localStore.uniqueKey = uniqueKey;
					// also store this as the start time for the dataset
					var startTime = new Date(uniqueKey);
					// make a date stamp for the start time Response
					var syear = startTime.getFullYear(), smonth = startTime.getMonth(), sday=startTime.getDate(), shours=startTime.getHours(), sminutes=startTime.getMinutes(), sseconds=startTime.getSeconds(), smilliseconds=startTime.getMilliseconds();
					// write the start time to the local store and will be sent to the server later on to be written into the dataset
					localStore[uniqueKey + "_" + "startTime"  + "_" + syear + "_" + smonth + "_" + sday + "_" + shours + "_" + sminutes + "_" + sseconds + "_" + smilliseconds] = startTime; 		
	
					// set the randomized order of the self rating Qs
					self1 = app.randomSelectQs(selfQs); 
					self2 = app.randomSelectQs(selfQs); 
					self3 = app.randomSelectQs(selfQs); 
					self4 = app.randomSelectQs(selfQs); 
					self5 = app.randomSelectQs(selfQs);
					self6 = app.randomSelectQs(selfQs); 
					self7 = app.randomSelectQs(selfQs); 
					self8 = app.randomSelectQs(selfQs);
					self9 = app.randomSelectQs(selfQs); 
					self10 = app.randomSelectQs(selfQs); 
					alert("randomized order of self rating questions = "+self1+" "+self2+" "+self3+" "+self4+" "+self5+" "+self6+" "+self7+" "+self8+" "+self9+" "+self10)
					// set the randomized order of the social situation Qs
					socialSit1 = app.randomSelectQs(socialSitQs); 
					socialSit2 = app.randomSelectQs(socialSitQs); 
					socialSit3 = app.randomSelectQs(socialSitQs); 
					socialSit4 = app.randomSelectQs(socialSitQs); 
					alert("randomized order of social situation questions = "+socialSit1+" "+socialSit2+" "+socialSit3+" "+socialSit4)
					// set the randomized order of the parent identity Qs
					parentid1 = app.randomSelectQs(parentidQs);
					parentid2 = app.randomSelectQs(parentidQs); 
					parentid3 = app.randomSelectQs(parentidQs); 
					alert("randomized order of parent identity Qs = "+parentid1+" "+parentid2+" "+parentid3)
					// then show the snooze question to initiate the survey      
					app.renderQuestion(1);
					console.log("show snooze successful");
				} 
				// no survey available logic
				else {
					console.log("SKIP TO NO SURVEY AVAILABLE SAMPLE PARTICIPANT VERSION");
					alert("no survey availalbe login fired for the sampleparticipant version");
					uniqueKey = new Date().getTime();
					localStore.uniqueKey = uniqueKey;
					app.renderQuestion(25);
				}	
			}
		}
    }
    
    else {
    	uniqueKey = localStore.uniqueKey;
    }
    app.saveData();
},

//uncomment this function to test data saving function (Stage 2 of Customization)
saveDataInstallation:function() {
//	server 1 - https://script.google.com/macros/s/AKfycbw-cGfhqS1S_Yq7gpbr878DPYshK7O9NbIv4F3eykaqHOoaf2wQ95IwZDbbvrxYo54/exec
//	server 2 - https://script.google.com/macros/s/AKfycbwgfLnwow1vES-l08KtGMaHDfWfHA9iO5vFZ2IRmnI2IioLog62JV9SaoXSzVhuoLsWsw/exec
// 	server 3 - https://script.google.com/macros/s/AKfycbykr4v3WI1Y3OeaDrS0X3g3zUlAzHHvzS-FnXBclRH0BhnOBalyluqltxpZzo6CceMO/exec
//	server 4 - https://script.google.com/macros/s/AKfycbzvQpRf5jViJyUCxKK1moavYmRbL_p6uwk4gIFuFc15tRYRtdRS3oK5V_FZANRTmZ0s/exec
	var storage = JSON.stringify(localStore);
	var storage_save=JSON.parse(storage);
	if (localStore.server == 1){
	    $.ajax({
           type: 'post',
           url: 'https://script.google.com/macros/s/AKfycbw-cGfhqS1S_Yq7gpbr878DPYshK7O9NbIv4F3eykaqHOoaf2wQ95IwZDbbvrxYo54/exec',
           data: storage_save,
           crossDomain: true,
           success: function (result) {
			var pid = localStore.participant_id; 
			var snoozed = localStore.snoozed; 
			var uniqueKey = localStore.uniqueKey; 
			var pause_time=localStore.pause_time;
			var notifs = localStore.notifs; 
			var surveyStart = localStore.surveyStart;
			var surveyEnd = localStore.surveyEnd;
			var server = localStore.server; 
	        localStore.clear();
	        localStore.participant_id = pid;
	        localStore.snoozed = snoozed;
			localStore.uniqueKey = uniqueKey;
			localStore.pause_time = pause_time;
			localStore.notifs = notifs;
			localStore.surveyStart = surveyStart; 
			localStore.surveyEnd = surveyEnd; 
			localStore.server = server; 
           	$("#question").html("<h3>Your responses have been recorded. Thank you for completing this survey. <br/><br/>Your surveys will start TOMORROW. <br /><br /> Please make sure notifications for the app are turned on. <br /><br/> Please close the app completely to ensure you will receive your next notifications (Swipe the app up). <br /><br />You can now close the app. </h3>");
           },
           complete: function(data){
           	console.log("completed");
           	},
           	error: function (request, textStatus, errorThrown) {
           		if (textStatus === "timeout"){
					$("#question").html("<h3>It looks like the server is currently overloaded. Please try resending your data later. Click on the button below, and we'll remind you in 30 minutes to try sending your data again. If problems persist, please contact the researchers.</h3><br><button>Set Data Sending Reminder</button>");
					$("#question button").click(function () {app.dataSendingNotif();localStore.snoozed=2;console.log("localStore.snoozed is " + localStore.snoozed);});
				}
				else {
					var response = JSON.stringify(request);
					console.log("request is " + response);
					$("#question").html("<h3>Please try resending data. If problems persist, please contact the researchers.</h3><br><button>Resend data</button>");
					$("#question button").click(function () {app.saveDataLastPage();});
				}
			}
     	});
	}
	if (localStore.server == 2){
	    $.ajax({
           type: 'post',
           url: 'https://script.google.com/macros/s/AKfycbwgfLnwow1vES-l08KtGMaHDfWfHA9iO5vFZ2IRmnI2IioLog62JV9SaoXSzVhuoLsWsw/exec',
           data: storage_save,
           crossDomain: true,
           success: function (result) {
			var pid = localStore.participant_id; 
			var snoozed = localStore.snoozed; 
			var uniqueKey = localStore.uniqueKey; 
			var pause_time=localStore.pause_time;
			var notifs = localStore.notifs; 
			var surveyStart = localStore.surveyStart;
			var surveyEnd = localStore.surveyEnd;
			var server = localStore.server; 
	        localStore.clear();
	        localStore.participant_id = pid;
	        localStore.snoozed = snoozed;
			localStore.uniqueKey = uniqueKey;
			localStore.pause_time = pause_time;
			localStore.notifs = notifs;
			localStore.surveyStart = surveyStart; 
			localStore.surveyEnd = surveyEnd; 
			localStore.server = server; 
           	$("#question").html("<h3>Your responses have been recorded. Thank you for completing this survey. <br/><br/>Your surveys will start TOMORROW. <br /><br /> Please make sure notifications for the app are turned on. <br /><br/> Please close the app completely to ensure you will receive your next notifications (Swipe the app up). <br /><br />You can now close the app. </h3>");
           },
           complete: function(data){
           	console.log("completed");
           	},
           	error: function (request, textStatus, errorThrown) {
           		if (textStatus === "timeout"){
					$("#question").html("<h3>It looks like the server is currently overloaded. Please try resending your data later. Click on the button below, and we'll remind you in 30 minutes to try sending your data again. If problems persist, please contact the researchers.</h3><br><button>Set Data Sending Reminder</button>");
					$("#question button").click(function () {app.dataSendingNotif();localStore.snoozed=2;console.log("localStore.snoozed is " + localStore.snoozed);});
				}
				else {
					var response = JSON.stringify(request);
					console.log("request is " + response);
					$("#question").html("<h3>Please try resending data. If problems persist, please contact the researchers.</h3><br><button>Resend data</button>");
					$("#question button").click(function () {app.saveDataLastPage();});
				}
			}
     	});
	}
	if (localStore.server == 3){
	    $.ajax({
           type: 'post',
           url: 'https://script.google.com/macros/s/AKfycbykr4v3WI1Y3OeaDrS0X3g3zUlAzHHvzS-FnXBclRH0BhnOBalyluqltxpZzo6CceMO/exec',
           data: storage_save,
           crossDomain: true,
           success: function (result) {
			var pid = localStore.participant_id; 
			var snoozed = localStore.snoozed; 
			var uniqueKey = localStore.uniqueKey; 
			var pause_time=localStore.pause_time;
			var notifs = localStore.notifs; 
			var surveyStart = localStore.surveyStart;
			var surveyEnd = localStore.surveyEnd;
			var server = localStore.server; 
	        localStore.clear();
	        localStore.participant_id = pid;
	        localStore.snoozed = snoozed;
			localStore.uniqueKey = uniqueKey;
			localStore.pause_time = pause_time;
			localStore.notifs = notifs;
			localStore.surveyStart = surveyStart; 
			localStore.surveyEnd = surveyEnd; 
			localStore.server = server; 
           	$("#question").html("<h3>Your responses have been recorded. Thank you for completing this survey. <br/><br/>Your surveys will start TOMORROW. <br /><br /> Please make sure notifications for the app are turned on. <br /><br/> Please close the app completely to ensure you will receive your next notifications (Swipe the app up). <br /><br />You can now close the app. </h3>");
           },
           complete: function(data){
           	console.log("completed");
           	},
           	error: function (request, textStatus, errorThrown) {
           		if (textStatus === "timeout"){
					$("#question").html("<h3>It looks like the server is currently overloaded. Please try resending your data later. Click on the button below, and we'll remind you in 30 minutes to try sending your data again. If problems persist, please contact the researchers.</h3><br><button>Set Data Sending Reminder</button>");
					$("#question button").click(function () {app.dataSendingNotif();localStore.snoozed=2;console.log("localStore.snoozed is " + localStore.snoozed);});
				}
				else {
					var response = JSON.stringify(request);
					console.log("request is " + response);
					$("#question").html("<h3>Please try resending data. If problems persist, please contact the researchers.</h3><br><button>Resend data</button>");
					$("#question button").click(function () {app.saveDataLastPage();});
				}
			}
     	});
	}
	if (localStore.server == 4){
	    $.ajax({
           type: 'post',
           url: 'https://script.google.com/macros/s/AKfycbzvQpRf5jViJyUCxKK1moavYmRbL_p6uwk4gIFuFc15tRYRtdRS3oK5V_FZANRTmZ0s/exec',
           data: storage_save,
           crossDomain: true,
           success: function (result) {
			var pid = localStore.participant_id; 
			var snoozed = localStore.snoozed; 
			var uniqueKey = localStore.uniqueKey; 
			var pause_time=localStore.pause_time;
			var notifs = localStore.notifs; 
			var surveyStart = localStore.surveyStart;
			var surveyEnd = localStore.surveyEnd;
			var server = localStore.server; 
	        localStore.clear();
	        localStore.participant_id = pid;
	        localStore.snoozed = snoozed;
			localStore.uniqueKey = uniqueKey;
			localStore.pause_time = pause_time;
			localStore.notifs = notifs;
			localStore.surveyStart = surveyStart; 
			localStore.surveyEnd = surveyEnd; 
			localStore.server = server; 
           	$("#question").html("<h3>Your responses have been recorded. Thank you for completing this survey. <br/><br/>Your surveys will start TOMORROW. <br /><br /> Please make sure notifications for the app are turned on. <br /><br/> Please close the app completely to ensure you will receive your next notifications (Swipe the app up). <br /><br />You can now close the app. </h3>");
           },
           complete: function(data){
           	console.log("completed");
           	},
           	error: function (request, textStatus, errorThrown) {
           		if (textStatus === "timeout"){
					$("#question").html("<h3>It looks like the server is currently overloaded. Please try resending your data later. Click on the button below, and we'll remind you in 30 minutes to try sending your data again. If problems persist, please contact the researchers.</h3><br><button>Set Data Sending Reminder</button>");
					$("#question button").click(function () {app.dataSendingNotif();localStore.snoozed=2;console.log("localStore.snoozed is " + localStore.snoozed);});
				}
				else {
					var response = JSON.stringify(request);
					console.log("request is " + response);
					$("#question").html("<h3>Please try resending data. If problems persist, please contact the researchers.</h3><br><button>Resend data</button>");
					$("#question button").click(function () {app.saveDataLastPage();});
				}
			}
     	});
	}
},

saveDataLastPage:function() {
//	server 1 - https://script.google.com/macros/s/AKfycbw-cGfhqS1S_Yq7gpbr878DPYshK7O9NbIv4F3eykaqHOoaf2wQ95IwZDbbvrxYo54/exec
//	server 2 - https://script.google.com/macros/s/AKfycbwgfLnwow1vES-l08KtGMaHDfWfHA9iO5vFZ2IRmnI2IioLog62JV9SaoXSzVhuoLsWsw/exec
// 	server 3 - https://script.google.com/macros/s/AKfycbykr4v3WI1Y3OeaDrS0X3g3zUlAzHHvzS-FnXBclRH0BhnOBalyluqltxpZzo6CceMO/exec
//	server 4 - https://script.google.com/macros/s/AKfycbzvQpRf5jViJyUCxKK1moavYmRbL_p6uwk4gIFuFc15tRYRtdRS3oK5V_FZANRTmZ0s/exec

	var storage = JSON.stringify(localStore);
	var storage_save=JSON.parse(storage);
	if (localStore.server == 1){
	    $.ajax({
           	type: 'post',
           	url: 'https://script.google.com/macros/s/AKfycbw-cGfhqS1S_Yq7gpbr878DPYshK7O9NbIv4F3eykaqHOoaf2wQ95IwZDbbvrxYo54/exec',
           	data: storage_save,
           	crossDomain: true,
           	success: function (result) {
	         	var pid = localStore.participant_id; 
				var snoozed = localStore.snoozed; 
				var uniqueKey = localStore.uniqueKey; 
				var pause_time=localStore.pause_time;
				var notifs = localStore.notifs; 
				var surveyStart = localStore.surveyStart;
				var surveyEnd = localStore.surveyEnd; 
				var server = localStore.server; 
	         	localStore.clear();
	         	localStore.participant_id = pid;
	         	localStore.snoozed = snoozed;
				localStore.uniqueKey = uniqueKey;
				localStore.pause_time = pause_time;
				localStore.notifs = notifs;
				localStore.surveyStart = surveyStart; 
				localStore.surveyEnd = surveyEnd; 
				localStore.server = server; 
           		$("#question").html("<h3>Your responses have been recorded. Thank you for completing this survey. <br/><br/> Please close the app completely to ensure you will receive your next notifications (Swipe the app up).</h3>");
         	},
			complete: function(data){
            	console.log("completed");
         	},
			error: function (request, textStatus, errorThrown) {
				if (textStatus === "timeout"){
					$("#question").html("<h3>It looks like the server is currently overloaded. Please try resending your data later. Click on the button below, and we'll remind you in 30 minutes to try sending your data again. If problems persist, please contact the researchers.</h3><br><button>Set Data Sending Reminder</button>");
					$("#question button").click(function () {app.dataSendingNotif();localStore.snoozed=2;console.log("localStore.snoozed is " + localStore.snoozed);});

				}
				else {
					var response = JSON.stringify(request);
					console.log("request is " + response);
					$("#question").html("<h3>Please try resending data. If problems persist, please contact the researchers.</h3><br><button>Resend data</button>");
					$("#question button").click(function () {app.saveDataLastPage();});
				}
			}
        });
	}
	if (localStore.server == 2){
	    $.ajax({
           	type: 'post',
           	url: 'https://script.google.com/macros/s/AKfycbwgfLnwow1vES-l08KtGMaHDfWfHA9iO5vFZ2IRmnI2IioLog62JV9SaoXSzVhuoLsWsw/exec',
           	data: storage_save,
           	crossDomain: true,
           	success: function (result) {
	         	var pid = localStore.participant_id; 
				var snoozed = localStore.snoozed; 
				var uniqueKey = localStore.uniqueKey; 
				var pause_time=localStore.pause_time;
				var notifs = localStore.notifs; 
				var surveyStart = localStore.surveyStart;
				var surveyEnd = localStore.surveyEnd; 
				var server = localStore.server; 
	         	localStore.clear();
	         	localStore.participant_id = pid;
	         	localStore.snoozed = snoozed;
				localStore.uniqueKey = uniqueKey;
				localStore.pause_time = pause_time;
				localStore.notifs = notifs;
				localStore.surveyStart = surveyStart; 
				localStore.surveyEnd = surveyEnd; 
				localStore.server = server; 
           		$("#question").html("<h3>Your responses have been recorded. Thank you for completing this survey. <br/><br/> Please close the app completely to ensure you will receive your next notifications (Swipe the app up).</h3>");
         	},
			complete: function(data){
            	console.log("completed");
         	},
			error: function (request, textStatus, errorThrown) {
				if (textStatus === "timeout"){
					$("#question").html("<h3>It looks like the server is currently overloaded. Please try resending your data later. Click on the button below, and we'll remind you in 30 minutes to try sending your data again. If problems persist, please contact the researchers.</h3><br><button>Set Data Sending Reminder</button>");
					$("#question button").click(function () {app.dataSendingNotif();localStore.snoozed=2;console.log("localStore.snoozed is " + localStore.snoozed);});

				}
				else {
					var response = JSON.stringify(request);
					console.log("request is " + response);
					$("#question").html("<h3>Please try resending data. If problems persist, please contact the researchers.</h3><br><button>Resend data</button>");
					$("#question button").click(function () {app.saveDataLastPage();});
				}
			}
        });
	}
	if (localStore.server == 3){
	    $.ajax({
           	type: 'post',
           	url: 'https://script.google.com/macros/s/AKfycbykr4v3WI1Y3OeaDrS0X3g3zUlAzHHvzS-FnXBclRH0BhnOBalyluqltxpZzo6CceMO/exec',
           	data: storage_save,
           	crossDomain: true,
           	success: function (result) {
	         	var pid = localStore.participant_id; 
				var snoozed = localStore.snoozed; 
				var uniqueKey = localStore.uniqueKey; 
				var pause_time=localStore.pause_time;
				var notifs = localStore.notifs; 
				var surveyStart = localStore.surveyStart;
				var surveyEnd = localStore.surveyEnd; 
				var server = localStore.server; 
	         	localStore.clear();
	         	localStore.participant_id = pid;
	         	localStore.snoozed = snoozed;
				localStore.uniqueKey = uniqueKey;
				localStore.pause_time = pause_time;
				localStore.notifs = notifs;
				localStore.surveyStart = surveyStart; 
				localStore.surveyEnd = surveyEnd; 
				localStore.server = server; 
           		$("#question").html("<h3>Your responses have been recorded. Thank you for completing this survey. <br/><br/> Please close the app completely to ensure you will receive your next notifications (Swipe the app up).</h3>");
         	},
			complete: function(data){
            	console.log("completed");
         	},
			error: function (request, textStatus, errorThrown) {
				if (textStatus === "timeout"){
					$("#question").html("<h3>It looks like the server is currently overloaded. Please try resending your data later. Click on the button below, and we'll remind you in 30 minutes to try sending your data again. If problems persist, please contact the researchers.</h3><br><button>Set Data Sending Reminder</button>");
					$("#question button").click(function () {app.dataSendingNotif();localStore.snoozed=2;console.log("localStore.snoozed is " + localStore.snoozed);});

				}
				else {
					var response = JSON.stringify(request);
					console.log("request is " + response);
					$("#question").html("<h3>Please try resending data. If problems persist, please contact the researchers.</h3><br><button>Resend data</button>");
					$("#question button").click(function () {app.saveDataLastPage();});
				}
			}
        });
	}
	if (localStore.server == 4){
	    $.ajax({
           	type: 'post',
           	url: 'https://script.google.com/macros/s/AKfycbzvQpRf5jViJyUCxKK1moavYmRbL_p6uwk4gIFuFc15tRYRtdRS3oK5V_FZANRTmZ0s/exec',
           	data: storage_save,
           	crossDomain: true,
           	success: function (result) {
	         	var pid = localStore.participant_id; 
				var snoozed = localStore.snoozed; 
				var uniqueKey = localStore.uniqueKey; 
				var pause_time=localStore.pause_time;
				var notifs = localStore.notifs; 
				var surveyStart = localStore.surveyStart;
				var surveyEnd = localStore.surveyEnd; 
				var server = localStore.server; 
	         	localStore.clear();
	         	localStore.participant_id = pid;
	         	localStore.snoozed = snoozed;
				localStore.uniqueKey = uniqueKey;
				localStore.pause_time = pause_time;
				localStore.notifs = notifs;
				localStore.surveyStart = surveyStart; 
				localStore.surveyEnd = surveyEnd; 
				localStore.server = server; 
           		$("#question").html("<h3>Your responses have been recorded. Thank you for completing this survey. <br/><br/> Please close the app completely to ensure you will receive your next notifications (Swipe the app up).</h3>");
         	},
			complete: function(data){
            	console.log("completed");
         	},
			error: function (request, textStatus, errorThrown) {
				if (textStatus === "timeout"){
					$("#question").html("<h3>It looks like the server is currently overloaded. Please try resending your data later. Click on the button below, and we'll remind you in 30 minutes to try sending your data again. If problems persist, please contact the researchers.</h3><br><button>Set Data Sending Reminder</button>");
					$("#question button").click(function () {app.dataSendingNotif();localStore.snoozed=2;console.log("localStore.snoozed is " + localStore.snoozed);});

				}
				else {
					var response = JSON.stringify(request);
					console.log("request is " + response);
					$("#question").html("<h3>Please try resending data. If problems persist, please contact the researchers.</h3><br><button>Resend data</button>");
					$("#question button").click(function () {app.saveDataLastPage();});
				}
			}
        });
	}
},

saveDataAndClear:function() {
//	server 1 - https://script.google.com/macros/s/AKfycbw-cGfhqS1S_Yq7gpbr878DPYshK7O9NbIv4F3eykaqHOoaf2wQ95IwZDbbvrxYo54/exec
//	server 2 - https://script.google.com/macros/s/AKfycbwgfLnwow1vES-l08KtGMaHDfWfHA9iO5vFZ2IRmnI2IioLog62JV9SaoXSzVhuoLsWsw/exec
// 	server 3 - https://script.google.com/macros/s/AKfycbykr4v3WI1Y3OeaDrS0X3g3zUlAzHHvzS-FnXBclRH0BhnOBalyluqltxpZzo6CceMO/exec
//	server 4 - https://script.google.com/macros/s/AKfycbzvQpRf5jViJyUCxKK1moavYmRbL_p6uwk4gIFuFc15tRYRtdRS3oK5V_FZANRTmZ0s/exec

	var storage = JSON.stringify(localStore);
	var storage_save=JSON.parse(storage);
	if (localStore.server == 1){
		$.ajax({
				 type: 'post',
				 url: 'https://script.google.com/macros/s/AKfycbw-cGfhqS1S_Yq7gpbr878DPYshK7O9NbIv4F3eykaqHOoaf2wQ95IwZDbbvrxYo54/exec',
				 data: storage_save,
				 crossDomain: true,
				 success: function (result) {
				 var pid = localStore.participant_id; 
				 var snoozed = localStore.snoozed; 
				 var uniqueKey = localStore.uniqueKey; 
				 var pause_time=localStore.pause_time;
				 var notifs = localStore.notifs; 
				 var surveyStart = localStore.surveyStart;
				 var surveyEnd = localStore.surveyEnd; 
				 var server = localStore.server; 
				 localStore.clear();
				 localStore.participant_id = pid;
				 localStore.snoozed = snoozed;
				 localStore.uniqueKey = uniqueKey;
				 localStore.pause_time = pause_time;
				 localStore.notifs = notifs;
				 localStore.surveyStart = surveyStart; 
				 localStore.surveyEnd = surveyEnd; 
				 localStore.server = server; 
			 },
			 complete: function(data){
				console.log("completed");
			 },
			 error: function (request, error) {
				console.log(error);
				var response = JSON.stringify(request);
				console.log("request is " + response);
				}
			});	
		}
	if (localStore.server == 2){
		$.ajax({
				 type: 'post',
				 url: 'https://script.google.com/macros/s/AKfycbwgfLnwow1vES-l08KtGMaHDfWfHA9iO5vFZ2IRmnI2IioLog62JV9SaoXSzVhuoLsWsw/exec',
				 data: storage_save,
				 crossDomain: true,
				 success: function (result) {
				 var pid = localStore.participant_id; 
				 var snoozed = localStore.snoozed; 
				 var uniqueKey = localStore.uniqueKey; 
				 var pause_time=localStore.pause_time;
				 var notifs = localStore.notifs; 
				 var surveyStart = localStore.surveyStart;
				 var surveyEnd = localStore.surveyEnd; 
				 var server = localStore.server; 
				 localStore.clear();
				 localStore.participant_id = pid;
				 localStore.snoozed = snoozed;
				 localStore.uniqueKey = uniqueKey;
				 localStore.pause_time = pause_time;
				 localStore.notifs = notifs;
				 localStore.surveyStart = surveyStart; 
				 localStore.surveyEnd = surveyEnd; 
				 localStore.server = server; 
			 },
			 complete: function(data){
				console.log("completed");
			 },
			 error: function (request, error) {
				console.log(error);
				var response = JSON.stringify(request);
				console.log("request is " + response);
			}
		});	
	}
	if (localStore.server == 3){
		$.ajax({
				 type: 'post',
				 url: 'https://script.google.com/macros/s/AKfycbykr4v3WI1Y3OeaDrS0X3g3zUlAzHHvzS-FnXBclRH0BhnOBalyluqltxpZzo6CceMO/exec',
				 data: storage_save,
				 crossDomain: true,
				 success: function (result) {
				 var pid = localStore.participant_id; 
				 var snoozed = localStore.snoozed; 
				 var uniqueKey = localStore.uniqueKey; 
				 var pause_time=localStore.pause_time;
				 var notifs = localStore.notifs; 
				 var surveyStart = localStore.surveyStart;
				 var surveyEnd = localStore.surveyEnd; 
				 var server = localStore.server; 
				 localStore.clear();
				 localStore.participant_id = pid;
				 localStore.snoozed = snoozed;
				 localStore.uniqueKey = uniqueKey;
				 localStore.pause_time = pause_time;
				 localStore.notifs = notifs;
				 localStore.surveyStart = surveyStart; 
				 localStore.surveyEnd = surveyEnd; 
				 localStore.server = server; 
			 },
			 complete: function(data){
				console.log("completed");
			 },
			 error: function (request, error) {
				console.log(error);
				var response = JSON.stringify(request);
				console.log("request is " + response);
			}
		});	
	}
	if (localStore.server == 4){
		$.ajax({
				 type: 'post',
				 url: 'https://script.google.com/macros/s/AKfycbzvQpRf5jViJyUCxKK1moavYmRbL_p6uwk4gIFuFc15tRYRtdRS3oK5V_FZANRTmZ0s/exec',
				 data: storage_save,
				 crossDomain: true,
				 success: function (result) {
				 var pid = localStore.participant_id; 
				 var snoozed = localStore.snoozed; 
				 var uniqueKey = localStore.uniqueKey; 
				 var pause_time=localStore.pause_time;
				 var notifs = localStore.notifs; 
				 var surveyStart = localStore.surveyStart;
				 var surveyEnd = localStore.surveyEnd; 
				 var server = localStore.server; 
				 localStore.clear();
				 localStore.participant_id = pid;
				 localStore.snoozed = snoozed;
				 localStore.uniqueKey = uniqueKey;
				 localStore.pause_time = pause_time;
				 localStore.notifs = notifs;
				 localStore.surveyStart = surveyStart; 
				 localStore.surveyEnd = surveyEnd; 
				 localStore.server = server; 
			 },
			 complete: function(data){
				console.log("completed");
			 },
			 error: function (request, error) {
				console.log(error);
				var response = JSON.stringify(request);
				console.log("request is " + response);
			}
		});	
	}
},

//uncomment this function to test data saving function (Stage 2 of Customization)
saveData:function() {
//	server 1 - https://script.google.com/macros/s/AKfycbw-cGfhqS1S_Yq7gpbr878DPYshK7O9NbIv4F3eykaqHOoaf2wQ95IwZDbbvrxYo54/exec
//	server 2 - https://script.google.com/macros/s/AKfycbwgfLnwow1vES-l08KtGMaHDfWfHA9iO5vFZ2IRmnI2IioLog62JV9SaoXSzVhuoLsWsw/exec
// 	server 3 - https://script.google.com/macros/s/AKfycbykr4v3WI1Y3OeaDrS0X3g3zUlAzHHvzS-FnXBclRH0BhnOBalyluqltxpZzo6CceMO/exec
//	server 4 - https://script.google.com/macros/s/AKfycbzvQpRf5jViJyUCxKK1moavYmRbL_p6uwk4gIFuFc15tRYRtdRS3oK5V_FZANRTmZ0s/exec

	var storage = JSON.stringify(localStore);
	var storage_save=JSON.parse(storage);	
	if (localStore.server == 1){
		$.ajax({
			type: 'post',
			url: 'https://script.google.com/macros/s/AKfycbw-cGfhqS1S_Yq7gpbr878DPYshK7O9NbIv4F3eykaqHOoaf2wQ95IwZDbbvrxYo54/exec',
		   	data: storage_save,
		   	crossDomain: true,
		   	success: function (result) {
		   		var pid = localStore.participant_id; 
		   		var snoozed = localStore.snoozed; 
				var uniqueKey = localStore.uniqueKey; 
				var pause_time=localStore.pause_time;
				var notifs = localStore.notifs; 
				var surveyStart = localStore.surveyStart;
				var surveyEnd = localStore.surveyEnd; 
				var server = localStore.server
			 	localStore.participant_id = pid;
			 	localStore.snoozed = snoozed;
				localStore.uniqueKey = uniqueKey;
				localStore.pause_time = pause_time;
				localStore.notifs = notifs;
				localStore.surveyStart = surveyStart; 
				localStore.surveyEnd = surveyEnd;
				localStore.server = server; 
		   	},
		   	complete: function(data){
				console.log("completed");
			},
			error: function (request, error) {
				console.log(error);
				var response = JSON.stringify(request);
				console.log("request is " + response);
			}
		});
	}
	if (localStore.server == 2){
		$.ajax({
			type: 'post',
			url: 'https://script.google.com/macros/s/AKfycbwgfLnwow1vES-l08KtGMaHDfWfHA9iO5vFZ2IRmnI2IioLog62JV9SaoXSzVhuoLsWsw/exec',
		   	data: storage_save,
		   	crossDomain: true,
		   	success: function (result) {
		   		var pid = localStore.participant_id; 
		   		var snoozed = localStore.snoozed; 
				var uniqueKey = localStore.uniqueKey; 
				var pause_time=localStore.pause_time;
				var notifs = localStore.notifs; 
				var surveyStart = localStore.surveyStart;
				var surveyEnd = localStore.surveyEnd; 
				var server = localStore.server
			 	localStore.participant_id = pid;
			 	localStore.snoozed = snoozed;
				localStore.uniqueKey = uniqueKey;
				localStore.pause_time = pause_time;
				localStore.notifs = notifs;
				localStore.surveyStart = surveyStart; 
				localStore.surveyEnd = surveyEnd;
				localStore.server = server; 
		   	},
		   	complete: function(data){
				console.log("completed");
			},
			error: function (request, error) {
				console.log(error);
				var response = JSON.stringify(request);
				console.log("request is " + response);
			}
		});
	}
	if (localStore.server == 3){
		$.ajax({
			type: 'post',
			url: 'https://script.google.com/macros/s/AKfycbykr4v3WI1Y3OeaDrS0X3g3zUlAzHHvzS-FnXBclRH0BhnOBalyluqltxpZzo6CceMO/exec',
		   	data: storage_save,
		   	crossDomain: true,
		   	success: function (result) {
		   		var pid = localStore.participant_id; 
		   		var snoozed = localStore.snoozed; 
				var uniqueKey = localStore.uniqueKey; 
				var pause_time=localStore.pause_time;
				var notifs = localStore.notifs; 
				var surveyStart = localStore.surveyStart;
				var surveyEnd = localStore.surveyEnd; 
				var server = localStore.server
			 	localStore.participant_id = pid;
			 	localStore.snoozed = snoozed;
				localStore.uniqueKey = uniqueKey;
				localStore.pause_time = pause_time;
				localStore.notifs = notifs;
				localStore.surveyStart = surveyStart; 
				localStore.surveyEnd = surveyEnd;
				localStore.server = server; 
		   	},
		   	complete: function(data){
				console.log("completed");
			},
			error: function (request, error) {
				console.log(error);
				var response = JSON.stringify(request);
				console.log("request is " + response);
			}
		});
	}
	if (localStore.server == 4){
		$.ajax({
			type: 'post',
			url: 'https://script.google.com/macros/s/AKfycbzvQpRf5jViJyUCxKK1moavYmRbL_p6uwk4gIFuFc15tRYRtdRS3oK5V_FZANRTmZ0s/exec',
		   	data: storage_save,
		   	crossDomain: true,
		   	success: function (result) {
		   		var pid = localStore.participant_id; 
		   		var snoozed = localStore.snoozed; 
				var uniqueKey = localStore.uniqueKey; 
				var pause_time=localStore.pause_time;
				var notifs = localStore.notifs; 
				var surveyStart = localStore.surveyStart;
				var surveyEnd = localStore.surveyEnd; 
				var server = localStore.server
			 	localStore.participant_id = pid;
			 	localStore.snoozed = snoozed;
				localStore.uniqueKey = uniqueKey;
				localStore.pause_time = pause_time;
				localStore.notifs = notifs;
				localStore.surveyStart = surveyStart; 
				localStore.surveyEnd = surveyEnd;
				localStore.server = server; 
		   	},
		   	complete: function(data){
				console.log("completed");
			},
			error: function (request, error) {
				console.log(error);
				var response = JSON.stringify(request);
				console.log("request is " + response);
			}
		});
	}
},
    
// Local Notifications Javascript
// Stage 5 of Customization
// This code is for signal-contingent designs with varying time intervals between notifications
// i.e., customized to each participant's schedule
scheduleNotifs:function() {
	//Section 1 - Declaring necessary variables
		//Declares the number of intervals between the notifications for each day (i.e., if beeping participants 6 times, declare 6 intervals)
    var interval1, interval2;

		//Declares a variable to represent the id of each notification for the day
		//Declare as many letters as you have intervals (i.e., 6 intervals, declare 6 ids)
    var a, b;

		//Declare a variable to represent new date to be calculated for each beep
		//That is, if there are 6 intervals, declare 6 new dates
    var date1, date2;

		//The statement below declares the start and end time of the daily data collection period
		//These variables are not necessary if the start and end time of the daily data collection period do not vary across the experience
		//sampling data collection period
		// declare start and end of each survey block
    var survey1Start, survey1End, survey2Start, survey2End;

		//The next three lines create variables for the present time when the notifications are being scheduled
    var dateObject = new Date();
    var now = dateObject.getTime();
    var dayOfWeek = dateObject.getDay(), currentHour = dateObject.getHours(), currentMinute = dateObject.getMinutes();

		//The next variables represent the amount of time between the end of the data collection to the start of the next one (nightlyLag), 
		//the interval between the scheduling time and the start of the first data collection period (currentLag), the maximum amount of time
		//in the data collection period (maxInterval), and the time between until the end of the next data collection period (in our case 
		//dinner time; dinnerInterval)
    var currentLag, maxInterval, dinnerInterval;

		//These represent the participant's time values 
		survey1Start = localStore.survey1Start.split(":");
		survey1End = localStore.survey1End.split(":");
		survey2Start = localStore.survey2Start.split(":");
		survey2End = localStore.survey2End.split(":");
		
// 		alert("survey1Start is " + survey1Start); 
// 		alert("survey1End is " + survey1End); 
// 		alert("survey2Start is " + survey2Start); 
// 		alert("survey2End is " + survey2End); 

	//Then you can declare any values that you might use more than once such as the number of milliseconds in a day
   	var day = 86400000; 

		//This is a loop that repeats this block of codes for the number of days there are in the experience sampling period
		//Replace X with the number of days in the experience sampling period (e.g., collecting data for 7 days, replace X with 7)
		//Note that iOS apps can only have 64 unique notifications, so you should keep that in mind if you are collecting data 
		//for more than longer periods of time
		var time1 = new Date(); 
		var time2 = new Date(); 
		var time3 = new Date();
		var time4 = new Date(); 
		
		// add one day to each of these new date objects so the surveys start tomorrow
		// **CHANGEME** to test, I removed the +1--> to changeback, do 	var day1 = time1.getDate() + 1;
		var day1 = time1.getDate(); 
		var day2 = time2.getDate(); 
		var day3 = time3.getDate(); 
		var day4 = time4.getDate(); 
		
		// now set the survey start and end times 
		var survey1StartTime = time1.setDate(day1); 
		survey1StartTime = time1.setHours(parseInt(survey1Start[0]), parseInt(survey1Start[1]), 0, 0); 
		var survey1EndTime = time2.setDate(day2); 
		survey1EndTime = time2.setHours(parseInt(survey1End[0]), parseInt(survey1End[1]), 0, 0); 

		var survey2StartTime = time3.setDate(day3); 
		survey2StartTime = time3.setHours(parseInt(survey2Start[0]), parseInt(survey2Start[1]), 0, 0); 
		var survey2EndTime = time4.setDate(day4); 
		survey2EndTime = time4.setHours(parseInt(survey2End[0]), parseInt(survey2End[1]), 0, 0); 


// 		alert("survey1StartTime is " + survey1StartTime); 
// 		alert("survey1EndTime is " + survey1EndTime); 
// 		alert("survey2StartTime is " + survey2StartTime); 
// 		alert("survey2EndTime is " + survey2EndTime); 

    for (i = 0; i < 21; i++) {
    	var survey1Min  = survey1StartTime + day*i; 
    	var survey1Max  = survey1EndTime + day*i; 

    	var survey2Min  = survey2StartTime + day*i; 
    	var survey2Max  = survey2EndTime + day*i; 

		// randomly select survey time
    	interval1 = app.selectSurveyTime(survey1Min, survey1Max); 
    	interval2 = app.selectSurveyTime(survey2Min, survey2Max); 

		// set a unique id number for each notification    	
        a = 101+(parseInt(i)*100);
        b = 102+(parseInt(i)*100);
// 
// 			//This part of the code calculates the time when the notification should be sent by adding the time interval to the current date and time        
        date1 = new Date(interval1); 
        date2 = new Date(interval2);
        
    	epoch1 = date1.getTime();
		epoch2 = date2.getTime();

		cordova.plugins.notification.local.schedule([
			{id: a, trigger: {at: new Date(epoch1)}, text: 'Time for your first survey for the day! You have 2 hours to do it!', title: 'Daily Parenting Identity Study', priority:2, vibrate:true},
			{id: b, trigger: {at: new Date(epoch2)}, text: "Time for your second survey for the day! You have 2 hours to do it!", title: 'Daily Parenting Identity Study', priority:2, vibrate:true},
		]);

		//This part of the code records when the notifications are scheduled for and sends it to the server
		localStore['notification_' + i + '_1'] = localStore.participant_id + "_" + a + "_" + date1;
		localStore['notification_' + i + '_2'] = localStore.participant_id + "_" + b + "_" + date2;
		
		notifs.push(interval1, interval2);
    }
    surveyStart = parseInt(notifs[0]); //**CHANGEME ADDED PARSEINT TO THIS */
    surveyEnd = parseInt(notifs[41]) + parseInt(surveyWindow); 
    localStore.surveyStart = surveyStart; 
    localStore.surveyEnd = surveyEnd;
    localStore.notifs = notifs; 
},

//Stage 4 of Customization
//Uncomment lines inside the snoozeNotif function to test the snooze scheduling notification function
//Replace X with the number of seconds you want the app to snooze for (e.g., 10 minutes is 600 seconds)
//You can also customize the Title of the message, the snooze message that appears in the notification
snoozeNotif:function() {
    var now = new Date().getTime(), snoozeDate = new Date(now + 600*1000);
    var id = '99';
    cordova.plugins.notification.local.schedule({
                                         id: id,
                                         title: 'Diary Survey',
                                         text: 'Are you able to take the survey now?',
                                         at: snoozeDate,
                                         });
},
// function to schedule the test notification
testNotif:function() {
    var id = '9999';
    cordova.plugins.notification.local.schedule({
                                         icon: 'ic_launcher',
                                         id: id,
                                         title: 'Daily Surveys',
                                         text: 'Your test notification has fired!',
                                         trigger: {in: 3, unit: 'second'},
                                         });
},

// function to schedule data resent reminder
dataSendingNotif:function() {
    var now = new Date().getTime();
    var id = '98';
    cordova.plugins.notification.local.schedule({id: id, title: 'Diary Surveys', text: 'Please try resending your data now!', trigger: {in: 30, unit: 'minute'}, icon: 'ic_launcher'});
},

//This function forces participants to respond to an open-ended question if they have left it blank
validateResponse: function(data){
        var text = data.val();
//         console.log(text);
        if (text === ""){
        	return false;
        } else { 
        	return true;
        }
    },
validateNumber: function(data){
        var num = data.val();
//         console.log(text);
		if (num === "") {
			return false
		}
        else if (isNaN(num)){
        	return false;
        } 
        else { 
        	return true;
        }
    },  
validateTime: function(data){
	var time = data.val();
	if (time=== ""){
		return false	
	}
	else {
		return true
	}
}, 
validateId: function(data){
	var id = data.val();
	var length = id.length;
	if (id === ""){
		return false	
	}
	else if (id.length != 3){
		return false
	}
	else {
		return true
	}
}, 

// function to randomly pick one question from the array
randomSelectQs: function(array){
	// this function will randomly select one of the questions in the array of questions that need to be randomized
	var randomIndex = Math.floor(Math.random()*array.length);
	// it will then return the item it has selected and remove it from the array so no question is shown twice
	return array.splice(randomIndex, 1)[0]; 
}, 

selectSurveyTime: function(min, max){
	// this function will randomly select a time between the start and end time of the survey block set by participants. 
	return Math.floor(Math.random()*(max-min + 1) + min)
},

validateId2: function(data){
	var id = data.val();
	var length = id.length;
	if (id === ""){
		return false	
	}
	else if (id.length != 2){
		return false
	}
	else {
		return true
	}
},
 	
};
