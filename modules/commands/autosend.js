const moment = require('moment-timezone');
const axios = require('axios');

module.exports.config = {
 name: 'autothoitiet',
 version: '10.02',
 hasPermission: 3,
 credits: 'DongDev',
 description: 'Tự động gửi tin nhắn theo giờ đã cài!',
 commandCategory: 'Admin',
 usages: '[]',
 cooldowns: 3,
 images: [],
};

const weather = require('weather-js');
const findWeather = (city, degreeType = 'C') => {
 return new Promise((resolve, reject) => {
 weather.find({ search: city, degreeType }, (err, result) => {
 if (err) {
 reject(err);
 } else {
 resolve(result);
 }
 });
 });
};

const nam = [
 {
 timer: '00:00:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '00:30:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '02:30:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '03:00:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '05:00:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '06:30:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '07:30:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '08:30:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '09:30:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '10:30:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '11:30:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '12:30:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '12:15:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '13:30:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '14:30:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '15:30:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '16:30:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '17:30:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '18:30:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '19:30:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '20:30:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '21:30:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '22:30:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '23:30:00',
 message: ['\n{thoitiet}']
 },
    {
    timer: '00:00:00',
    message: ['𝐶ℎ𝑢́𝑐 𝑚𝑜̣𝑖 𝑛𝑔𝑢̛𝑜̛̀𝑖 𝑛𝑔𝑢̉ 𝑛𝑔𝑜𝑛 😴', '𝐾ℎ𝑢𝑦𝑎 𝑟𝑢̀𝑖 𝑛𝑔𝑢̉ 𝑛𝑔𝑜𝑛 𝑛ℎ𝑒́ 𝑐𝑎́𝑐 𝑏𝑎̣𝑛 😇']
    },
    {
    timer: '00:30:00',
    message: ['𝑇𝑎 𝑣𝑖̀ 𝑒𝑚 𝑚𝑎̀ 𝑝ℎ𝑖𝑒̂̀𝑛 𝑛𝑎̃𝑜 𝑞𝑢𝑎𝑛ℎ 𝑛𝑎̆𝑚', '𝐸𝑚 𝑛ℎ𝑢̛ 𝑚𝑢̀𝑎 𝑡ℎ𝑢, 𝑑𝑒̣𝑝 𝑛ℎ𝑢̛𝑛𝑔 𝑙𝑎̣𝑛ℎ 𝑙𝑢̀𝑛𝑔']
    },
    {
    timer: '05:00:00',
    message: ['𝐸𝑚 𝑙𝑎̀ 𝑔𝑖𝑎𝑖 𝑑𝑖𝑒̣̂𝑢 𝑛𝑔𝑜̣𝑡 𝑛𝑔𝑎̀𝑜, 𝑙𝑎̀𝑚 𝑥𝑎𝑜 𝑥𝑢𝑦𝑒̂́𝑛 𝑡𝑟𝑎́𝑖 𝑡𝑖𝑚 𝑎𝑛ℎ', '𝑁𝑒̂́𝑢 𝑒𝑚 𝑙𝑎̀ 𝑏𝑎𝑜 𝑙𝑖̀ 𝑥𝑖̀, 𝑡ℎ𝑖̀ 𝑡𝑒̂́𝑡 𝑛𝑎̀𝑦 𝑎𝑛ℎ 𝑐𝑜́ 𝑙𝑎̂́𝑦 𝑘ℎ𝑜̂𝑛𝑔 ?']
    },
    {
    timer: '06:00:00',
    message: ['𝐶ℎ𝑢́𝑐 𝑚𝑜̣𝑖 𝑛𝑔𝑢̛𝑜̛̀𝑖 𝑏𝑢𝑜̂̉𝑖 𝑠𝑎́𝑛𝑔 𝑣𝑢𝑖 𝑣𝑒̉ 😉', '𝐶ℎ𝑢́𝑐 𝑚𝑛 𝑏𝑢𝑜̂̉𝑖 𝑠𝑎́𝑛𝑔 𝑣𝑣 ❤️', '𝐵𝑢𝑜̂̉𝑖 𝑠𝑎́𝑛𝑔 𝑑𝑎̂̀𝑦 𝑛𝑎̆𝑛𝑔 𝑙𝑢̛𝑜̛̣𝑛𝑔 𝑛ℎ𝑎 𝑐𝑎́𝑐 𝑏𝑎̣𝑛 😙']
    },
    {
    timer: '07:00:00',
    message: ['𝑋𝑢𝑎̂𝑛 𝐷𝑖𝑒̣̂𝑢 𝑡ℎ𝑖̀ 𝑏𝑖𝑒̂́𝑡 𝑙𝑎̀𝑚 𝑡ℎ𝑜̛, 𝐶𝑜̀𝑛 𝑎𝑛ℎ 𝑐ℎ𝑖̉ 𝑏𝑖𝑒̂́𝑡 𝑛𝑔𝑎̂̉𝑛 𝑛𝑔𝑜̛ 𝑛ℎ𝑖̀𝑛 𝑛𝑎̀𝑛𝑔', '𝑁𝑔𝑜𝑎̀𝑖 𝑘𝑖𝑎 𝑑𝑎́𝑚 𝑐𝑢̛𝑜̛́𝑖 𝑙𝑖𝑛ℎ đ𝑖̀𝑛ℎ, 𝐵𝑎𝑜 𝑔𝑖𝑜̛̀ 𝑡ℎ𝑖̀ đ𝑒̂́𝑛 𝑙𝑢̛𝑜̛̣𝑡 𝑚𝑖̀𝑛ℎ 𝑒𝑚 𝑜̛𝑖.', '𝐵𝑎 𝑑𝑜̂̀𝑛𝑔 𝑚𝑜̣̂𝑡 𝑚𝑜̛́ 𝑡𝑟𝑎̂̀𝑢 𝑐𝑎𝑢, 𝐸𝑚 𝑐ℎ𝑜 𝑎𝑛ℎ ℎ𝑜̉𝑖 𝑐𝑢̛𝑜̛́𝑖 𝑛ℎ𝑎𝑢 𝑛𝑔𝑎̀𝑦 𝑛𝑎̀𝑜?']
    },
    {
    timer: '08:00:00',
    message: ['𝐶ℎ𝑜 𝑎𝑛ℎ 𝑙𝑖𝑒̂̀𝑢 𝑡ℎ𝑢𝑜̂́𝑐 𝑎𝑛 𝑡ℎ𝑎̂̀𝑛, 𝐷𝑒̂̉ 𝑡𝑖𝑚 𝑜̂̉𝑛 đ𝑖̣𝑛ℎ 𝑘ℎ𝑖 𝑔𝑎̂̀𝑛 𝑏𝑒̂𝑛 𝑒𝑚.', '𝐵𝑎𝑜 𝑛ℎ𝑖𝑒̂𝑢 𝑐𝑎̂𝑛 𝑡ℎ𝑖́𝑛ℎ 𝑐ℎ𝑜 𝑣𝑢̛̀𝑎, 𝐵𝑎𝑜 𝑛ℎ𝑖𝑒̂𝑢 𝑐𝑎̂𝑛 𝑏𝑎̉ 𝑚𝑜̛́𝑖 𝑙𝑢̛̀𝑎 đ𝑢̛𝑜̛̣𝑐 𝑒𝑚. 😙', '𝑇𝑖́𝑛ℎ 𝑎𝑛ℎ 𝑐ℎ𝑎̆̉𝑛𝑔 𝑡ℎ𝑖́𝑐ℎ 𝑙𝑢̛𝑛𝑔 𝑐ℎ𝑢̛̀𝑛𝑔, 𝑌𝑒̂𝑢 𝑎𝑛ℎ 𝑐ℎ𝑎̆̉𝑛𝑔 𝑠𝑜̛̣ 𝑐𝑎̆́𝑚 𝑠𝑢̛̀𝑛𝑔 đ𝑎̂𝑢 𝑒𝑚.']
    },
    {
    timer: '09:00:00',
    message: ['10 𝑛𝑎̆𝑚 𝑐𝑎̆́𝑛 𝑘𝑒̣𝑜 𝑐𝑢̃𝑛𝑔 𝑐ℎ𝑎̆̉𝑛𝑔 𝑡ℎ𝑒̂̉ 𝑏𝑎̆̀𝑛𝑔 𝑚𝑜̣̂𝑡 𝑡𝑒̣𝑜 ℎ𝑢𝑛 𝑒𝑚.', '𝐸𝑚 𝑜̛𝑖 𝑛𝑢̛𝑜̛́𝑐 𝑏𝑖𝑒̂̉𝑛 𝑚𝑎̀𝑢 𝑥𝑎𝑛ℎ, 𝐾ℎ𝑜𝑎𝑖 𝑚𝑜̂𝑛 𝑚𝑎̀𝑢 𝑡𝑖́𝑚, 𝑡𝑖𝑚 𝑒𝑚 𝑚𝑎̀𝑢 𝑔𝑖̀?', '𝐷𝑒̂𝑚 𝑟𝑎̆̀𝑚 𝑐𝑜́ 𝑏𝑎́𝑛ℎ 𝑇𝑟𝑢𝑛𝑔 𝑡ℎ𝑢, 𝑇𝑖𝑒̣̂𝑛 𝑐ℎ𝑜 𝑎𝑛ℎ ℎ𝑜̉𝑖 𝑔𝑢 𝑒𝑚 𝑙𝑎̀ 𝑔𝑖̀?']
    },
    {
    timer: '10:00:00',
    message: ['𝐸𝑚 ℎ𝑜̂𝑚 𝑛𝑎𝑦 𝑣𝑢̛̀𝑎 ℎ𝑎̂𝑚 𝑣𝑢̛̀𝑎 𝑑𝑜̛̉, 𝐴𝑛ℎ 𝑏𝑢̛𝑜̛́𝑐 𝑣𝑎̀𝑜 𝑐ℎ𝑒 𝑐ℎ𝑜̛̉ 𝑐𝑜́ 𝑑𝑢̛𝑜̛̣𝑐 𝑘ℎ𝑜̂𝑛𝑔?', '𝐻𝑜̣ 𝑡ℎ𝑖́𝑐ℎ 𝑛𝑔ℎ𝑒 𝑛ℎ𝑎̣𝑐 𝑐𝑜́ 𝑙𝑜̛̀𝑖, 𝐶𝑜̀𝑛 𝑎𝑛ℎ 𝑙𝑎̣𝑖 𝑡ℎ𝑖́𝑐ℎ 𝑡𝑟𝑜̣𝑛 𝑑𝑜̛̀𝑖 𝑐𝑜́ 𝑒𝑚.', '𝑁𝑔𝑢̛𝑜̛̀𝑖 𝑡𝑎 𝑚𝑒̂ 𝑚𝑎̂̉𝑛 𝑏𝑜́𝑛𝑔 𝑐𝑢̛𝑜̛̀𝑖, 𝐶𝑜̀𝑛 𝑒𝑚 𝑚𝑒̂ 𝑚𝑎̂̉𝑛 𝑏𝑜́𝑛𝑔 𝑛𝑔𝑢̛𝑜̛̀𝑖 𝑒𝑚 𝑡ℎ𝑢̛𝑜̛𝑛𝑔.']
    },
    {
    timer: '11:00:00',
    message: ['𝑀𝑒̣ 𝑠𝑖𝑛ℎ 𝑒𝑚 𝑘ℎ𝑜̂𝑛𝑔 𝑝ℎ𝑎̉𝑖 𝑑𝑒̂̉ 𝑒𝑚 𝑣𝑎̂́𝑡 𝑣𝑎̉, 𝑀𝑎̀ 𝑙𝑎̀ 𝑠𝑎𝑢 𝑛𝑎̀𝑦 đ𝑒̂̉ 𝑔𝑎̉ 𝑐ℎ𝑜 𝑎𝑛ℎ', '𝑀𝑢̛𝑜̛̣𝑛 𝑥𝑒 𝑛ℎ𝑜̛́ 𝑑𝑜̂̉ đ𝑎̂̀𝑦 𝑏𝑖̀𝑛ℎ, 𝑀𝑢̛𝑜̛̣𝑛 𝑡𝑖𝑚 𝑛ℎ𝑜̛́ 𝑑𝑜̂̉ 𝑑𝑎̂̀𝑦 𝑡𝑖̀𝑛ℎ 𝑔𝑖𝑢́𝑝 𝑎𝑛ℎ.', '𝑁𝑢̛𝑜̛́𝑐 𝑛𝑜𝑛 𝑝ℎ𝑜𝑛𝑔 𝑐𝑎̉𝑛ℎ ℎ𝑢̛̃𝑢 𝑡𝑖̀𝑛ℎ, 𝐿𝑖𝑒̣̂𝑢 𝑒𝑚 𝑐𝑜́ 𝑚𝑢𝑜̂́𝑛 𝑐ℎ𝑢́𝑛𝑔 𝑚𝑖̀𝑛ℎ 𝑛𝑒̂𝑛 𝑑𝑢𝑦𝑒̂𝑛?']
    },
    {
    timer: '12:00:00',
    message: ['𝐶ℎ𝑢́𝑐 𝑚𝑜̣𝑖 𝑛𝑔𝑢̛𝑜̛̀𝑖 𝑏𝑢𝑜̂̉𝑖 𝑡𝑟𝑢̛𝑎 𝑣𝑢𝑖 𝑣𝑒̉ 😋', '𝐶ℎ𝑢́𝑐 𝑚𝑜̣𝑖 𝑛𝑔𝑢̛𝑜̛̀𝑖 𝑏𝑢̛̃𝑎 𝑡𝑟𝑢̛𝑎 𝑛𝑔𝑜𝑛 𝑚𝑖𝑒̣̂𝑛𝑔 😋']
    },
    {
    timer: '12:30:00',
    message: ['𝑁𝑔𝑢̛𝑜̛̀𝑖 𝑡𝑎 𝑔𝑜̣𝑖 𝑒𝑚 𝑙𝑎̀ 𝑛𝑔𝑢̛𝑜̛̀𝑖 𝑑𝑒̣𝑝, 𝑎𝑛ℎ 𝑔𝑜̣𝑖 𝑒𝑚 𝑙𝑎̀ 𝑛𝑔𝑢̛𝑜̛̀𝑖 𝑦𝑒̂𝑢', '𝑀𝑜̛̀𝑖 𝑎𝑛ℎ 𝑥𝑜̛𝑖 𝑏𝑎́𝑡 𝑐𝑎𝑛ℎ 𝑔𝑎̀. 𝑁ℎ𝑢̛ 𝑡𝑖̀𝑛ℎ 𝑒𝑚 𝑑𝑜́ 𝑑𝑎̣̂𝑚 𝑑𝑎̀ 𝑦𝑒̂𝑢 𝑡ℎ𝑢̛𝑜̛𝑛𝑔.', '𝐸𝑚 𝑛ℎ𝑢̛ 𝑡𝑟𝑎́𝑖 𝑐ℎ𝑒𝑟𝑟𝑦, 𝑣𝑖̀ 𝑡ℎ𝑖𝑒̂́𝑢 ℎ𝑒𝑟 𝑎𝑛ℎ 𝑐ℎ𝑖̉ 𝑐𝑜́ 𝑐𝑟𝑦']
    },
    {
    timer: '13:00:00',
    message: ['𝐶ℎ𝑢́𝑐 𝑚𝑜̣𝑖 𝑛𝑔𝑢̛𝑜̛̀𝑖 𝑏𝑢𝑜̂̉𝑖 𝑐ℎ𝑖𝑒̂̀𝑢 𝑑𝑎̂̀𝑦 𝑛𝑎̆𝑛𝑔 𝑙𝑢̛𝑜̛̣𝑛𝑔 😼', '𝐶ℎ𝑢́𝑐 𝑚𝑜̣𝑖 𝑛𝑔𝑢̛𝑜̛̀𝑖 𝑏𝑢𝑜̂̉𝑖 𝑐ℎ𝑖𝑒̂̀𝑢 𝑣𝑢𝑖 𝑣𝑒̉ 🙌']
    },
    {
    timer: '14:00:00',
    message: ['𝑇𝑟𝑜̛̀𝑖 𝑏𝑢𝑜̂̀𝑛 𝑡𝑟𝑜̛̀𝑖 𝑑𝑜̂̉ 𝑚𝑢̛𝑎 𝑛𝑔𝑎̂𝑢, 𝑀𝑒̣ 𝑎𝑛ℎ 𝑑𝑎𝑛𝑔 𝑡𝑢𝑦𝑒̂̉𝑛 𝑐𝑜𝑛 𝑑𝑎̂𝑢 𝑟𝑜̂̀𝑖 𝑛𝑒̀.', '𝑀𝑒̣ 𝑚𝑢𝑎 𝑐ℎ𝑜 𝑐𝑜𝑛 ℎ𝑒𝑜 𝑑𝑎̂́𝑡, 𝑇𝑖𝑒̂̀𝑛 𝑎𝑛ℎ 𝑑𝑒𝑚 𝑐𝑎̂́𝑡 𝑠𝑎𝑢 𝑛𝑎̀𝑦 𝑐𝑢̛𝑜̛́𝑖 𝑒𝑚.', '𝐵𝑖̀𝑛ℎ 𝑦𝑒̂𝑛 𝑙𝑎̀ 𝑚𝑜̣̂𝑡 𝑏𝑜̛̀ 𝑣𝑎𝑖, 𝑀𝑖̀𝑛ℎ 𝑑𝑒𝑚 𝑟𝑎 đ𝑜̂̉𝑖 𝑏𝑎̆̀𝑛𝑔 2 𝑛𝑢̣ 𝑐𝑢̛𝑜̛̀𝑖.']
    },
    {
    timer: '15:00:00',
    message: ['𝐴𝑛ℎ 𝑑𝑎̆𝑛𝑔 𝑠𝑡𝑜𝑟𝑦 𝑘ℎ𝑜̂𝑛𝑔 𝑝ℎ𝑎̉𝑖 𝑑𝑒̂̉ 𝑡ℎ𝑎̉ 𝑡ℎ𝑖́𝑛ℎ, 𝑀𝑎̀ 𝑐𝑎́𝑖 𝑐ℎ𝑖́𝑛ℎ 𝑙𝑎̀ đ𝑒̂̉ 𝑒𝑚 𝑥𝑒𝑚.', '𝐻𝑜̂𝑚 𝑛𝑎𝑦 𝑒𝑚 𝑑𝑜́𝑖 𝑐𝑜̂̀𝑛 𝑐𝑎̀𝑜, 𝑆ℎ𝑖𝑝 𝑎𝑛ℎ 𝑚𝑜̣̂𝑡 𝑐ℎ𝑢́𝑡 𝑛𝑔𝑜̣𝑡 𝑛𝑔𝑎̀𝑜 𝑑𝑖 𝑒𝑚.', '𝑂𝑟𝑑𝑒𝑟 𝑔𝑖𝑢̀𝑚 𝑎𝑛ℎ 𝑚𝑜̣̂𝑡 𝑡𝑖̀𝑛ℎ 𝑦𝑒̂𝑢 𝑐ℎ𝑎̆̉𝑛𝑔 𝑝ℎ𝑎𝑖, 𝐺𝑖𝑎́ 𝑝ℎ𝑎̉𝑖 𝑐ℎ𝑎̆𝑛𝑔 𝑛ℎ𝑢̛𝑛𝑔 𝑐ℎ𝑎̆́𝑐 𝑐ℎ𝑎̆̉𝑛𝑔 𝑝ℎ𝑎̉𝑖 𝑒𝑚?']
    },
    {
    timer: '16:00:00',
    message: ['𝑇𝑖𝑚 𝑎𝑛ℎ 𝑑𝑎̃ 𝑏𝑎̣̂𝑡 đ𝑒̀𝑛 𝑥𝑎𝑛ℎ, 𝑀𝑎̀ 𝑠𝑎𝑜 𝑒𝑚 𝑚𝑎̃𝑖 𝑑𝑎̣𝑝 𝑝ℎ𝑎𝑛ℎ 𝑡ℎ𝑒̂́ 𝑛𝑎̀𝑦?', '𝑇𝑟𝑎̆𝑛𝑔 𝑙𝑒̂𝑛 𝑑𝑖̉𝑛ℎ 𝑛𝑢́𝑖 𝑡𝑟𝑎̆𝑛𝑔 𝑡𝑎̀, 𝐸𝑚 𝑦𝑒̂𝑢 𝑎𝑛ℎ 𝑡ℎ𝑎̣̂𝑡 ℎ𝑎𝑦 𝑙𝑎̀ 𝑦𝑒̂𝑢 𝑐ℎ𝑜̛𝑖?', '𝑀𝑜̛̀𝑖 𝑐𝑎̣̂𝑢 𝑎̆𝑛 𝑏𝑎́𝑡 𝑝ℎ𝑜̛̉ 𝑙𝑜̀𝑛𝑔 𝑡𝑎́𝑖, 𝐷𝑒̂̉ 𝑟𝑜̂̀𝑖 𝑚𝑜𝑛𝑔 𝑐𝑎̣̂𝑢 𝑝ℎ𝑎̉𝑖 𝑙𝑜̀𝑛𝑔 𝑡𝑜̛́.']
    },
    {
    timer: '17:00:00',
    message: ['𝑁ℎ𝑎̂𝑛 𝑔𝑖𝑎𝑛 𝑣𝑜̂́𝑛 𝑙𝑎̆́𝑚 𝑏𝑜̣̂𝑛 𝑏𝑒̂̀, 𝑆𝑎𝑜 𝑘ℎ𝑜̂𝑛𝑔 𝑏𝑜̉ ℎ𝑒̂́𝑡 𝑟𝑜̂̀𝑖 𝑣𝑒̂̀ 𝑏𝑒̂𝑛 𝑎𝑛ℎ?', '𝑁𝑒̂́𝑢 𝑒𝑚 𝑡ℎ𝑖́𝑐ℎ 𝑛𝑔𝑢̛𝑜̛̀𝑖 𝑡ℎ𝑢́ 𝑣𝑖̣ 𝑡ℎ𝑖̀ 𝑎𝑛ℎ 𝑑𝑎̂𝑦 𝑐ℎ𝑖́𝑛ℎ 𝑙𝑎̀ 𝑚𝑜̣̂𝑡 𝑣𝑖́ 𝑑𝑢̣.', '𝑇ℎ𝑜̛̀𝑖 𝑡𝑖𝑒̂́𝑡 𝑡𝑟𝑎́𝑖 𝑔𝑖𝑜́ 𝑡𝑟𝑜̛̉ 𝑡𝑟𝑜̛̀𝑖, 𝑇𝑖𝑚 𝑎𝑛ℎ 𝑙𝑜̛̃ 𝑛ℎ𝑖̣𝑝 𝑐𝑎̉ 𝑑𝑜̛̀𝑖 𝑡ℎ𝑢̛𝑜̛𝑛𝑔 𝑒𝑚.']
    },
    {
    timer: '18:00:00',
    message: ['𝐷𝑒̂𝑚 𝐻𝑎̀ 𝑁𝑜̣̂𝑖 𝑠𝑢̛𝑜̛𝑛𝑔 𝑚𝑢̀ 𝑏𝑎𝑜 𝑝ℎ𝑢̉, 𝑁ℎ𝑜̛́ 𝑒𝑚 𝑟𝑜̂̀𝑖 𝑐𝑜́ 𝑛𝑔𝑢̉ đ𝑢̛𝑜̛̣𝑐 𝑑𝑎̂𝑢....', '𝑇𝑎̀𝑖 𝑛𝑎̂́𝑢 𝑎̆𝑛 𝑎𝑛ℎ ℎ𝑜̛𝑖 𝑎̂̉𝑢, 𝐶ℎ𝑎̆̉𝑛𝑔 𝑏𝑖𝑒̂́𝑡 𝑛𝑎̂́𝑢 𝑔𝑖̀ 𝑛𝑔𝑜𝑎̀𝑖 𝑙𝑎̂̉𝑢 𝑡𝑖̀𝑛ℎ 𝑦𝑒̂𝑢', '𝐴̆𝑛 𝑜̛́𝑡 𝑙𝑎̀𝑚 𝑒𝑚 𝑐𝑎𝑦, 𝐶𝑜̀𝑛 𝑎𝑛ℎ 𝑙𝑎̀𝑚 𝑒𝑚 𝑠𝑎𝑦 =))']
    },
    {
    timer: '19:00:00',
    message: ['𝐵𝑎̆́𝑐 𝐷𝑎̂̉𝑢 đ𝑎̃ 𝑐𝑜́ 𝑁𝑎𝑚 𝑇𝑎̀𝑜, 𝐶𝑜̀𝑛 𝑒𝑚 𝑑𝑎̃ 𝑐𝑜́ 𝑛𝑔𝑢̛𝑜̛̀𝑖 𝑛𝑎̀𝑜 ℎ𝑎𝑦 𝑐ℎ𝑢̛𝑎?', '𝑇𝑖𝑚 𝑎𝑛ℎ 𝑑𝑎̃ 𝑏𝑎̣̂𝑡 đ𝑒̀𝑛 𝑥𝑎𝑛ℎ, 𝑌𝑒̂𝑢 𝑎𝑛ℎ 𝑡ℎ𝑖̀ 𝑛𝑜́𝑖 𝑛ℎ𝑎𝑛ℎ 𝑛ℎ𝑎𝑛ℎ 𝑙𝑒̂𝑛 𝑛𝑎̀𝑜.', '𝐺𝑖𝑜̛́𝑖 ℎ𝑎̣𝑛 𝑐𝑢̉𝑎 ℎ𝑎̀𝑚 𝑠𝑜̂́ 𝑙𝑎̀ 𝑙𝑖𝑚, 𝐺𝑖𝑜̛́𝑖 ℎ𝑎̣𝑛 𝑐𝑢̉𝑎 𝑡𝑟𝑎́𝑖 𝑡𝑖𝑚 𝑡𝑜̛́ 𝑐ℎ𝑖́𝑛ℎ 𝑙𝑎̀ 𝑐𝑎̣̂𝑢.']
    },
    {
    timer: '20:00:00',
    message: ['𝐷𝑢̛̀𝑛𝑔 𝑛𝑔ℎ𝑖̃ 𝑎𝑛ℎ 𝑥𝑎̂́𝑢 𝑚𝑎̀ 𝑐ℎ𝑒̂, 𝑌𝑒̂𝑢 𝑎𝑛ℎ 𝑡ℎ𝑖̀ 𝑏𝑖𝑒̂́𝑡 𝑛𝑜́ 𝑝ℎ𝑒̂ 𝑐𝑜̛̃ 𝑛𝑎̀𝑜.', '𝐿𝑢̛̉𝑎 𝑔𝑎̂̀𝑛 𝑟𝑜̛𝑚 𝑙𝑎̂𝑢 𝑛𝑔𝑎̀𝑦 𝑐𝑢̃𝑛𝑔 𝑏𝑒́𝑛, 𝑇ℎ𝑖́𝑐ℎ 𝑙𝑎̂𝑢 𝑟𝑜̂̀𝑖 𝑐ℎ𝑜 𝑐ℎ𝑒́𝑛 𝑑𝑢̛𝑜̛̣𝑐 𝑘ℎ𝑜̂𝑛𝑔 𝑒𝑚?', '𝑁𝑒̂́𝑢 𝑒𝑚 𝑡ℎ𝑎̂́𝑦 𝑡𝑢̛𝑜̛𝑛𝑔 𝑙𝑎𝑖 𝑚𝑢̀ 𝑚𝑖̣𝑡, 𝑁ℎ𝑎̆́𝑚 𝑚𝑎̆́𝑡 𝑣𝑎̀𝑜 đ𝑒̂̉ 𝑎𝑛ℎ 𝑡ℎ𝑖̣𝑡 𝑒𝑚 𝑛ℎ𝑎.']
    },
    {
    timer: '21:00:00',
    message: ['𝑌𝑒̂𝑢 𝑎𝑛ℎ 𝑑𝑖 𝑎𝑛ℎ 𝑐ℎ𝑜 ℎ𝑜̂𝑛 𝑚𝑎́, 𝑁𝑒̂́𝑢 𝑚𝑎̀ 𝑦𝑒̂𝑢 𝑞𝑢𝑎́ 𝑡ℎ𝑖̀ 𝑚𝑖̀𝑛ℎ ℎ𝑜̂𝑛 𝑚𝑜̂𝑖', '𝐿𝑢𝑛𝑔 𝑙𝑖𝑛ℎ 𝑡𝑟𝑜𝑛𝑔 𝑐ℎ𝑢́𝑡 𝑛𝑎̆́𝑛𝑔 𝑐ℎ𝑖𝑒̂̀𝑢, 𝑌𝑒̂𝑢 𝑒𝑚 𝑠𝑎𝑦 𝑑𝑎̆́𝑚, 𝑚𝑢𝑜̂́𝑛 𝑙𝑖𝑒̂̀𝑢 𝐾𝑒̂́𝑡 𝐻𝑜̂𝑛', '𝑁𝑔𝑢𝑦𝑒̂̃𝑛 𝐷𝑢 𝑙𝑢́𝑐 𝑣𝑖𝑒̂́𝑡 𝑇𝑟𝑢𝑦𝑒̣̂𝑛 𝐾𝑖𝑒̂̀𝑢, 𝐻𝑖̀𝑛ℎ 𝑛ℎ𝑢̛ 𝑣𝑖𝑒̂́𝑡 𝑡ℎ𝑖𝑒̂́𝑢 𝑙𝑎̀ 𝐾𝑖𝑒̂̀𝑢 𝑡ℎ𝑢̛ 𝑒𝑚']
    },
    {
    timer: '22:00:00',
    message: ['𝑇ℎ𝑖𝑒̂́𝑢 𝑜𝑥𝑖 𝑡𝑎 𝑘ℎ𝑜̂𝑛𝑔 𝑡ℎ𝑒̂̉ 𝑡ℎ𝑜̛̉, 𝑉𝑒̉ 𝑑𝑒̣𝑝 𝑐𝑢̉𝑎 𝑛𝑎̀𝑛𝑔 𝑡ℎ𝑜̛ 𝑘ℎ𝑜̂𝑛𝑔 𝑡ℎ𝑒̂̉ 𝑡𝑎̉.', '𝑉𝑖̀ 𝑚𝑎̣̂𝑡 𝑚𝑎̀ 𝑜𝑛𝑔 𝑡ℎ𝑎̣̂𝑡 𝑙𝑖𝑒̂̀𝑢, 𝑉𝑖̀ 𝑒𝑚 𝑚𝑎̀ 𝑦𝑒̂𝑢 𝑡ℎ𝑎̣̂𝑡 𝑙𝑜̀𝑛𝑔.', '𝑇𝑟𝑎́𝑖 𝑡𝑖𝑚 𝑎𝑛ℎ 𝑑𝑎𝑛𝑔 𝑑𝑎𝑜 𝑑𝑜̣̂𝑛𝑔 𝑑𝑖𝑒̂̀𝑢 ℎ𝑜𝑎̀, 𝑇𝑢̛̀ 𝑘ℎ𝑖 𝑒𝑚 𝑑𝑒̂́𝑛 𝑏𝑜̂̃𝑛𝑔 𝑙𝑒̣̂𝑐ℎ 𝑝ℎ𝑎.']
    },
    {
    timer: '23:00:00',
    message: ['Thả thính mệt wa rùi thôi để cho các bạn ngủ ngon nè =))']
    }
];

module.exports.onLoad = o => setInterval(async () => {
 const r = a => a[Math.floor(Math.random() * a.length)];
 const currentTime = moment().tz('Asia/Ho_Chi_Minh').format('HH:mm:ss');

 if (á = nam.find(i => i.timer === currentTime)) {
 const gio = moment().tz('Asia/Ho_Chi_Minh').format('HH:mm:ss || DD/MM/YYYY');

var msg = r(á.message);
var tinh = [
"Bắc Ninh", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "Hải Dương", "Hà Nội",
"Quảng Ninh", "Thái Bình", "Nam Định", "Ninh Bình", "Thái Nguyên", "Phú Thọ", "Vĩnh Phúc",
"Bắc Giang", "Lạng Sơn", "Quảng Bình", "Quảng Trị", "Thừa Thiên Huế", "Quảng Nam", "Quảng Ngãi",
"Bình Định", "Phú Yên", "Khánh Hòa", "Ninh Thuận", "Bình Thuận", "Kon Tum", "Gia Lai", "Đắk Lắk",
"Đắk Nông", "Lâm Đồng", "Bình Phước", "Tây Ninh", "Bình Dương", "Đồng Nai", "Long An", "Đồng Tháp",
"Tiền Giang", "An Giang", "Bà Rịa - Vũng Tàu", "Bến Tre", "Bạc Liêu", "Cà Mau", "Hậu Giang",
"Kiên Giang", "Sóc Trăng", "Trà Vinh", "Vĩnh Long", "Thanh Hóa"
];
const city = tinh[Math.floor(Math.random() * tinh.length)];
 const result = await findWeather(city);
 var currentDay = result[0].current.day.replace(/Friday/g, "Thứ 6").replace(/Saturday/g, "Thứ 7").replace(/Sunday/g, "Chủ nhật").replace(/Monday/g, "Thứ 2").replace(/Tuesday/g, "Thứ 3").replace(/Wednesday/g, "Thứ 4").replace(/Thursday/g, "Thứ 5");
 var date = result[0].current.date;
 var dateFormat = `Ngày ${date.split("-")[2]}-${date.split("-")[1]}-${date.split("-")[0]}`;
 var skytext = result[0].current.skytext.toString()
 "Cloudy" == skytext ? skytext = "Mây" : "Sunny" == skytext ? skytext = "Nắng" : "Partly Cloudy" == skytext ? skytext = "Mây một phần" : "Mostly Cloudy" == skytext ? skytext = "Mây rất nhiều" : "Rain" == skytext ? skytext = "Mưa" : "Thunderstorm" == skytext ? skytext = "Bão" : "Snow" == skytext ? skytext = "Tuyết" : "Fog" == skytext || "Haze" == skytext ? skytext = "Sương mù" : "Clear" == skytext ? skytext = "Trời trong" : "Light Rain" == skytext ? skytext = "Mưa nhẹ" : "Mostly Clear" == skytext && (skytext = "Trời trong rất nhiều");
 var winddisplay = result[0].current.winddisplay.toString().split(" ")[2];
 "Northeast" == winddisplay && (winddisplay = "Hướng Đông Bắc"), "Northwest" == winddisplay && (winddisplay = "Hướng Tây Bắc"), "Southeast" == winddisplay && (winddisplay = "Hướng Đông Nam"), "Southwest" == winddisplay && (winddisplay = "Hướng Tây Nam"), "East" == winddisplay && (winddisplay = "Hướng Đông"), "West" == winddisplay && (winddisplay = "Hướng Tây"), "North" == winddisplay && (winddisplay = "Hướng Bắc"), "South" == winddisplay && (winddisplay = "Hướng Nam");
 var thoitiet = `🌠 Uptime: ${gio}\n──────────────────\n🗺️ →⁠ Cập nhật thời tiết tại: ${result[0].location.name}\n🌡 →⁠ Nhiệt độ: ${result[0].current.temperature}°${result[0].location.degreetype}\n🛰 →⁠ Mô tả: ${skytext}\n♒ →⁠ Độ ẩm: ${result[0].current.humidity}%\n💨 →⁠ Hướng gió: ${result[0].current.windspeed} ${winddisplay}\n⏰ →⁠ Ghi nhận vào: ${result[0].current.observationtime}\n🗺️ →⁠ Từ trạm ${result[0].current.observationpoint}\n──────────────────\n🔄 Đây Là Tin Nhắn Tự Động`;

 msg = msg.replace(/{thoitiet}/, thoitiet);

 msg = {
 body: msg,
 };

 global.data.allThreadID.forEach(i => o.api.sendMessage(msg, i));
 }
}, 1000);

module.exports.run = () => {};