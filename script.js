
function reverseInput(str){
return str.split('').reverse().join('');
}
function checkPalindrome(date){
  reverse=reverseInput(date);
  if(date===reverse)
   return true;
}

function convertDatetoStr(date){
  const dateStr={ day: " ", month:" ", year:" "};
  if(date.day<10){
    dateStr.day="0"+date.day;
  }
  else{
    dateStr.day=date.day.toString();
  }
  if(date.month<10){
    dateStr.month="0"+date.month;
  }
  else{
    dateStr.month=date.month.toString();
  }
   
    dateStr.year=date.year.toString();
   return dateStr;
}

const date={
  day:8,
  month:8,
  year:2021
}
console.log(convertDatetoStr(date));

function getAllDateFormats(date){
  dateStr=convertDatetoStr(date);

  var ddmmyyyy= dateStr.day +dateStr.month+dateStr.year;
  var mmddyyyy=dateStr.month+dateStr.day+dateStr.year;
  var yyyymmdd=dateStr.year+dateStr.month+dateStr.day;
  var ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2);
  var mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(-2);
  var yymmdd=dateStr.year.slice(-2)+dateStr.month+dateStr.day;
 
  return[ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];

}

function checkAllDateFormats(date){
  var dateFormats=getAllDateFormats(date);
  let flag=false;
  for(let i=0; i<dateFormats.length; i++){
    if(checkPalindrome(dateFormats[i])) {
      flag=true;
      break;
    }
    
  }
  return flag;
}
function checkLeapYear(year){
  if(year%400===0){
    return true;
  }
  if(year%100===0){
    return false;
  }
  if(year%4===0){
    return true;
  }
  return false;
}

function getNextDate(date){
  let day=(date.day) + 1;
  let month=date.month;
  let year=date.year;

  const daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

  if(day > daysInMonth[month-1]){
    day=1;
    month++;
  }
  if(month>12){
    month=1;
    year++;
  }
  if(month===2){
   if(checkLeapYear(year)){
    if(day > 29){
      day=1;
      month++;
    }
  }
  else{
      if(day>28){
        day=1;
        month++;
      }
    }
  }


  return{
    day:day,
    month:month,
    year:year
  }
}

function getNextPalindromeDate(date){
  let counter=0;
  let nextDate=getNextDate(date);

  while(1){
    counter++;
    isPalindrome=checkAllDateFormats(nextDate);

  if(isPalindrome){
   break;
  }
  nextDate=getNextDate(nextDate);
  }

  return[counter, nextDate];
 
}
function getPreviousDate(date){
}

const birthdateInput = document.querySelector("#birthdate");
const result=document.querySelector("#result");
const checkbtn=document.querySelector("#checkbtn");
const loadingImg=document.querySelector("#loading-img");

loadingImg.style.display="none";
checkbtn.addEventListener("click", clickHandler);

function clickHandler(date){
  dateStr=birthdateInput.value.split("-");
  loadingImg.style.display="block";

  setTimeout(()=>{
  if(birthdateInput.value !== " "){
  const date={
  day:Number(dateStr[2]),
  month:Number(dateStr[1]),
  year:Number(dateStr[0])
  }
  let isPalindrome=checkAllDateFormats(date);
  if(isPalindrome){
    result.innerText="Yay! Your Birthday is Palindrome";
  }
  else{
     const [counter, nextDate]=getNextPalindromeDate(date);
     result.innerText=`Oops! You missed it by ${counter}. Next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}`;
  }
  }
  loadingImg.style.display="none";
  }
  ,2000); 
}

