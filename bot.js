var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require("fs");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
//**************************Wrting and reading Arduino Serial Communications************************************


const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM4', { baudRate: 9600 });
const parser = port.pipe(new Readline());
// Read the port data
port.on("open", () => {
   console.log('serial port open');
});



//***************************************************************************************************************

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with !

    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

          //console.log(args[i]);
          cmd = args[0];

          //args = args.splice(1);
          switch(cmd) {
              // !ping
              case 'ping':
                  bot.sendMessage({
                      to: channelID,
                      message: 'Pong!'
                  });
              break;

              //case '':

              //break;

              case 'listen':
              var HumidTemp = global.setInterval(recordTempHumid, 10000);

              function recordTempHumid() {
                port.write('temp', (err) => {
                    if (err) {
                      return console.log('Error on write: ', err.message);
                    }
                    console.log('message written');
                });
                var line = "";
                const fs = require('fs');
                port.on('readable', function () {
                    var p = port.read();
                    if(p != null){
                      line = line.concat(p.toString());
                       if(line.length > 1){
                        console.log(line);
                        bot.sendMessage({
                          to: channelID,
                          message: line
                      });
                        fs.appendFile('humidity.txt', line, function (err) {
                          if (err) throw err;
                          console.log('Saved!');
                        });
                      }
                      if(p.toString().includes("\n")){
                        line = "";
                      }
                    }
                })

              }

              break;

              case '0':  //WRITING TO ARDUINO SERIAL PORT
                  port.write('0', (err) => {
                      if (err) {
                        return console.log('Error on write: ', err.message);
                      }
                      console.log('message written');
                      });
              break;

              case  '1':  //WRITING TO ARDUINO SERIAL PORT
                  port.write('1', (err) => {
                      if (err) {
                        return console.log('Error on write: ', err.message);
                      }
                      console.log('message written');
                      });
              break;

              case 'humid':  //WRITING TO ARDUINO SERIAL PORT
                  port.write('temp', (err) => {
                      if (err) {
                        return console.log('Error on write: ', err.message);
                      }
                      console.log('message written');
                  });
                  var line = "";
                  const fs = require('fs');
                  port.on('readable', function () {
                      var p = port.read();
                      if(p != null){
                        line = line.concat(p.toString());
                         if(line.length > 1){
                          console.log(line);
                          bot.sendMessage({
                            to: channelID,
                            message: line
                        });
                          fs.appendFile('humidity.txt', line, function (err) {
                            if (err) throw err;
                            console.log('Saved!');
                          });
                        }
                        if(p.toString().includes("\n")){
                          line = "";
                        }
                      }
                  })
                  fs.readFile('humidity.txt', function(err, data) {
                    console.log(data + "hi");
                  });
              break;



              case 'graph':
                bot.uploadFile({
                  to: channelID,
                  file: 'humidity.png'
                });
                bot.uploadFile({
                  to: channelID,
                  file: 'MeanSD.txt'
                });
              break;
              // Just add any case commands if you want to..

      // !creator
              case 'NewHacks':
                  bot.sendMessage({
                      to: channelID,
                      message: 'NewHacks is Cool'
                  });
              break;
           }



     }
});
