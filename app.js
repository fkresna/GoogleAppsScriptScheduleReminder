const fromNumberTwilio = "123 456 789"
const accountIDTwilio = "Account ID Twilio"
const sidTwilio = "SID Twilio"
const testMode = 0

function myFunction() {
  var now = new Date();
  ss = SpreadsheetApp.getActiveSpreadsheet()
  
  for(var i=254;i<730;i+=4){
    if(ss.getRange('B'+i).getValue() >=now) {
      Logger.log(ss.getRange('B'+i).getValue())
      var data;
      //C = WL
      var timWL = ss.getRange('C'+i).getValue().split(",")
      for (var j = 0;j<timWL.length;j++) {
        sendNotification (getData(timWL[j]), timWL[j], "Song Leader", ss.getRange('B'+i).getValue())
      }
      
      //D = Singer1
      sendNotification (getData(ss.getRange('D'+i).getValue()), ss.getRange('D'+i).getValue(), "Singer", ss.getRange('B'+i).getValue())
      
      //E = Singer 2
      sendNotification (getData(ss.getRange('E'+i).getValue()), ss.getRange('E'+i).getValue(), "Singer", ss.getRange('B'+i).getValue())  
      
      //F = Tim Musik
      var timMusik = ss.getRange('F'+i).getValue().split(",")
      for (var j = 0;j<timMusik.length;j++) {
        sendNotification (getData(timMusik[j]), timMusik[j], "Pemusik", ss.getRange('B'+i).getValue())
      }
      
      //G = Usher
      var timUsher = ss.getRange('G'+i).getValue().split(",")
      for (var j = 0;j<timUsher.length;j++) {
        sendNotification (getData(timUsher[j]), timUsher[j], "Usher", ss.getRange('B'+i).getValue())
      }
      
      //H = Multimedia
      sendNotification (getData(ss.getRange('H'+i).getValue()), ss.getRange('H'+i).getValue(), "Multimedia", ss.getRange('B'+i).getValue())
      
      //I = Sunday School (Big Class)
      sendNotification (getData(ss.getRange('I'+i).getValue()), ss.getRange('I'+i).getValue(), "Sunday School (Big Class)", ss.getRange('B'+i).getValue())
      
      //J = Sunday School (Small Class)
      sendNotification (getData(ss.getRange('J'+i).getValue()), ss.getRange('J'+i).getValue(), "Sunday School (Small Class)", ss.getRange('B'+i).getValue())
      
      //L = Sound System
      sendNotification (getData(ss.getRange('L'+i).getValue()), ss.getRange('L'+i).getValue(), "Sound System", ss.getRange('B'+i).getValue())
      
      break;
    } 
  }
}

function sendNotification(data, name, position, tanggal) {
  var tanggalFormat = Utilities.formatDate(tanggal,"GMT-0400","MM/dd/yyyy")
  if (this.testMode == 1) {
    data['email'] = "test@email.com"
    data['number'] = "123 456 782"
  }
  
  if (data['email'] == '')
    data['email'] = "test@email.com"
  
  if (data['number'] == '')
    data['number'] = "123 456 782"

  sendEmail(data['email'], name, position, tanggalFormat)
  sendSms(data['number'], name, position, tanggalFormat)
}

function sendSms(to, name, position, tanggal) {
  var messages_url = "https://api.twilio.com/2010-04-01/Accounts/" + this.accountIDTwilio + "/Messages.json";
  
  var body = "Shalom " + name + ", \nYou assigned to be " + position + " on " + tanggal + "."
  body += "\nThank You"
  body += "\n\n This text is generated automatically, If there is a mistake please contact the coordinator."
  
  var payload = {
    "To": to,
    "Body" : body,
    "From" : this.fromNumberTwilio
  };

  var options = {
    "method" : "post",
    "payload" : payload
  };

  options.headers = { 
    "Authorization" : "Basic " + Utilities.base64Encode(this.accountIDTwilio + ":" + this.sidTwilio)
  };

  UrlFetchApp.fetch(messages_url, options);
}

function sendEmail(email, name, position, tanggal) {
  var subject = "[REMINDER] Pelayanan " + position + " Minggu " + tanggal;
  var content = "Shalom " + name +", \n";
  content += "You assigned to be " + position + " on " + tanggal + "\n";
  content += "Thank You \n "    
  content += "God Bless \n \n \n" 
  content += "This Email is generated automatically, If there is a mistake please contact the coordinator."
  
  bccEmail = "bccemail@gmail.org";
  
  MailApp.sendEmail({
    to : email,
    bcc : bccEmail,
    subject: subject,
    body: content,
    noReply: true
  });
}

function getData(name) {
  var email = "";
  var number = "";
  
  name = name.toLowerCase();
  name = name.trim();
  
  if (name == "John") {
    email = "john@gmail.com";
    number = "123 456 7890";
  } else if (name == "Watson") {
    email =  "watson@gmail.com";
    number = "123 456 7891"
  } 
  var data = []
  data['email'] = email
  data['number'] = number
  
  return data;
}