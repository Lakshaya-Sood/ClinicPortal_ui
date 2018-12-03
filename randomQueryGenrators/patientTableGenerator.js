//to run do =>npm i fakerator -g
var fakerator = require("fakerator")("en-CA");

var bg = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];
var gn = ['M','F','O'];
var cronic_disease = ['Hepatitis','Asthma','Diabetes','Thyroid'];

function randomDate(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  return date;
}
let startdob = new Date(1960, 1, 1);
let enddob = new Date(2000, 12, 31);
let startDate = new Date(2009, 1, 1);
let endDate = new Date(2018, 12, 31);
/**
 * You first need to create a formatting function to pad numbers to two digits…
 **/
function twoDigits(d) {
  if(0 <= d && d < 10) return "0" + d.toString();
  if(-10 < d && d < 0) return "-0" + (-1*d).toString();
  return d.toString();
}

/**
* …and then create the method to output the date string as desired.
* Some people hate using prototypes this way, but if you are going
* to apply this to more than one Date object, having it as a prototype
* makes sense.
**/
Date.prototype.toMysqlFormat = function() {
  return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

for(var i=1;i<=10;i++){
  var rr = {};
  var fn,ln;
  rr.gender =  `'${gn[Math.floor(Math.random() * 2)]}'`
  switch(rr.gender){
    case "'F'":
      fn = fakerator.names.firstNameF();
      ln = fakerator.names.lastNameF();
      break;
    case "'M'":
      fn = fakerator.names.firstNameM();
      ln = fakerator.names.lastNameM();
      break;
    case "'O'":
      if(i%2){
        fn = fakerator.names.firstNameM();
        ln = fakerator.names.lastNameF();
      } else {
        fn = fakerator.names.firstNameF();
        ln = fakerator.names.lastNameM();
      }
      break;
    default:
      break;
  }
  rr.blood_group  = `'${bg[Math.floor(Math.random() * 8)]}'`
  rr.address = `'
  {
    "street":"${fakerator.address.street()}",
    "city":"${fakerator.address.city()}",
    "country":"${fakerator.address.country()}"
  }
  '`
  rr.username = `'${fakerator.internet.userName()}'`
  rr.password = `'${fakerator.internet.password(8)}'`
  rr.email = `'${fakerator.internet.email()}'`;
  rr.mobile_no = `'${fakerator.phone.number()}'`;
  rr.name = `'
  {
    "first_name":"${fn}",
    "last_name":"${ln}"
  }
  '`
  var createdDate = randomDate(startDate, endDate, 1, 11)
  rr.created_at = `'${createdDate.toMysqlFormat()}'`
  rr.changed_at = `'${randomDate(createdDate, endDate, 1, 11).toMysqlFormat()}'`

  var DOB = randomDate(startdob, enddob, 1, 11)
  var date = DOB.getDate();
  var month = DOB.getMonth(); 
  var year = DOB.getFullYear();

  rr.dob = `'${year}-${month}-${date}'`;
  rr.past_medical_input = `'{}'`;
  rr.patient_hierarchy = `''`;

  // var temp = [],
  // if(!(i%5)){
  //   temp.push(cronic_disease[Math.floor(Math.random() * 4)])
  //   temp.push(cronic_disease[Math.floor(Math.random() * 4)])
  // }
  // if(!(i%7)){
  //   temp.push(cronic_disease[Math.floor(Math.random() * 4)])
  // }

  console.log(`INSERT INTO PatientMD VALUES (
    DEFAULT,
    ${rr.name},
    ${rr.username },
    crypt(${rr.password}, gen_salt('bf')),
    ${rr.address},
    ${rr.dob},
    ${rr.blood_group},
    ${rr.gender},
    ${rr.past_medical_input},
    ${rr.mobile_no},
    ${rr.email},
    ${rr.patient_hierarchy},
    ${rr.created_at},
    ${rr.changed_at}
    );\n`)
}
