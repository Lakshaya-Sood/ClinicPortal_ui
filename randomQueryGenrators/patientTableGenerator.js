//to run do =>npm i fakerator -g
var fakerator = require("fakerator")("en-CA");

var bg = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];
var gn = ['M','F','O'];
var 



for(var i=1;i<=100000000;i++){
  var rr = {};
  var fn,ln;
  rr.gender = gn[Math.floor(Math.random() * 2)]
  switch(rr.gender){
    case 'F':
      fn = fakerator.names.firstNameF();
      ln = fakerator.names.lastNameF();
      break;
    case 'M':
      fn = fakerator.names.firstNameM();
      ln = fakerator.names.lastNameM();
      break;
    case 'O':
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
  rr.blood_group  = bg[Math.floor(Math.random() * 8)]
  rr.address = `'
  {
    "street":"${fakerator.address.street()}",
    "city":"${fakerator.address.city()}",
    "country":"${fakerator.address.country()}",
  }
  '`
  rr.username = `'${fakerator.internet.userName()}'`
  rr.password = `'${fakerator.internet.password(8)}'`
  rr.email = `'${fakerator.internet.email()}'`
  rr.mobile_no = fakerator.random.number(1111111111, 9999999999);
  rr.name = `'
  {
    "first_name":"${fn}",
    "last_name":"${ln}",
  }
  '`

}
